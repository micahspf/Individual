import type Stripe from "stripe";
import { notifyFounder } from "@/lib/email";
import {
  getOrderBySessionId,
  upsertOrder,
  updateOrderStatus,
  type ServerOrder,
  type ServerOrderItem,
} from "@/lib/orders/server-store";
import { getStripe } from "@/lib/stripe";

function moneyFromSession(session: Stripe.Checkout.Session): number {
  if (typeof session.amount_total === "number") {
    return session.amount_total / 100;
  }
  return 0;
}

async function lineItemsFromSession(
  session: Stripe.Checkout.Session
): Promise<ServerOrderItem[]> {
  const stripe = getStripe();
  const lines = await stripe.checkout.sessions.listLineItems(session.id, {
    limit: 50,
  });

  return lines.data.map((li, idx) => ({
    id: li.price?.product?.toString() || `line-${idx}`,
    name: li.description || "Item",
    price: (li.amount_total || 0) / 100 / (li.quantity || 1),
    quantity: li.quantity || 1,
  }));
}

/**
 * Idempotent fulfillment keyed on Stripe Checkout Session ID.
 * Replaying the same session is a no-op and returns the existing order.
 */
export async function fulfillOrder(
  session: Stripe.Checkout.Session
): Promise<{ order: ServerOrder; created: boolean }> {
  const existing = getOrderBySessionId(session.id);
  if (existing) {
    return { order: existing, created: false };
  }

  const meta = session.metadata || {};
  const orderId =
    meta.order_ref || `IND-${session.id.slice(-10).toUpperCase()}`;
  const email =
    session.customer_details?.email ||
    session.customer_email ||
    "unknown@unknown";
  const name =
    meta.customer_name ||
    session.customer_details?.name ||
    "Customer";

  const ship =
    session.collected_information?.shipping_details?.address ||
    session.customer_details?.address ||
    null;
  const address =
    meta.ship_address ||
    [ship?.line1, ship?.line2].filter(Boolean).join(", ") ||
    "";
  const city = meta.ship_city || ship?.city || "";
  const state = meta.ship_state || ship?.state || "";
  const zip = meta.ship_zip || ship?.postal_code || "";

  let items: ServerOrderItem[] = [];
  try {
    items = await lineItemsFromSession(session);
  } catch (err) {
    console.error("Could not load line items:", err);
  }

  const now = new Date().toISOString();
  const order: ServerOrder = {
    id: orderId,
    stripeSessionId: session.id,
    stripePaymentIntentId:
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id || null,
    email,
    name,
    address,
    city,
    state,
    zip,
    items,
    total: moneyFromSession(session),
    currency: (session.currency || "usd").toUpperCase(),
    status: "paid",
    createdAt: now,
    updatedAt: now,
  };

  // Race guard: if another concurrent webhook wrote first, keep the first
  const raced = getOrderBySessionId(session.id);
  if (raced) {
    return { order: raced, created: false };
  }

  upsertOrder(order);

  const personalization = meta.personalization || "";
  const itemLines = order.items
    .map((i) => `  - ${i.name} × ${i.quantity} ($${i.price.toFixed(2)})`)
    .join("\n");

  const bodyText = [
    `Order: ${order.id}`,
    `Stripe session: ${order.stripeSessionId}`,
    `Email: ${order.email}`,
    `Name: ${order.name}`,
    `Ship: ${order.address}, ${order.city}, ${order.state} ${order.zip}`,
    `Total: $${order.total.toFixed(2)} ${order.currency}`,
    `Items:`,
    itemLines || "  (see Stripe Dashboard)",
    personalization
      ? `\nENGRAVING (verify spelling — this is what gets engraved):\n${personalization}`
      : "",
    `Status: paid`,
    `At: ${order.createdAt}`,
  ]
    .filter(Boolean)
    .join("\n");

  await notifyFounder(`Paid order ${order.id}`, bodyText);

  // Customer confirmation (when Resend is configured)
  const { sendEmail } = await import("@/lib/email");
  const engravingBlock = personalization
    ? `<p style="margin:16px 0;padding:12px 16px;background:#1a1a1a;border:1px solid #333;border-radius:8px;"><strong>Engraving:</strong><br/>${personalization
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")}<br/><em style="color:#facc15;">Check the spelling now — this is what gets engraved.</em></p>`
    : "";

  await sendEmail({
    to: order.email,
    subject: `Order confirmed — ${order.id} · Individual`,
    html: `
      <div style="font-family:system-ui,sans-serif;color:#f4f4f5;background:#0a0a12;padding:24px;">
        <h1 style="font-size:20px;">Payment received</h1>
        <p>Thanks, ${order.name}. Your order <strong>${order.id}</strong> is confirmed.</p>
        <p>Total: <strong>$${order.total.toFixed(2)} ${order.currency}</strong></p>
        ${engravingBlock}
        <p style="color:#a1a1aa;font-size:14px;">Standard turnaround is 7–10 days. Local Cullman pickup available by arrangement.</p>
        <p style="color:#a1a1aa;font-size:13px;">Questions: madebyindividual@gmail.com</p>
      </div>
    `,
  });

  return { order, created: true };
}

export async function markPaymentFailed(
  sessionId: string | null | undefined,
  detail: string
): Promise<void> {
  if (sessionId) {
    updateOrderStatus(sessionId, "payment_failed");
  }
  await notifyFounder(
    "Payment failed",
    `Session: ${sessionId || "n/a"}\n${detail}`
  );
}

export async function markRefunded(
  paymentIntentId: string | null | undefined,
  detail: string
): Promise<void> {
  // Find by payment intent if we have it
  // (Map scan is fine at this volume)
  await notifyFounder(
    "Charge refunded",
    `PaymentIntent: ${paymentIntentId || "n/a"}\n${detail}`
  );
}

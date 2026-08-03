import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import {
  isEventProcessed,
  markEventProcessed,
} from "@/lib/orders/server-store";
import {
  fulfillOrder,
  markPaymentFailed,
  markRefunded,
} from "@/lib/orders/fulfill";

export const runtime = "nodejs";
export const maxDuration = 15;

/**
 * Stripe webhook — raw body only (signature verification).
 * POST /api/webhooks/stripe
 */
export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not set");
    return new Response("Webhook secret not configured", { status: 500 });
  }

  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return new Response("Missing stripe-signature header", { status: 400 });
  }

  const stripe = getStripe();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    console.error("Webhook signature error:", message);
    return new Response(`Webhook Error: ${message}`, { status: 400 });
  }

  // Idempotency: Stripe retries for up to 3 days
  if (isEventProcessed(event.id)) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.payment_status === "paid" || session.status === "complete") {
          const result = await fulfillOrder(session);
          console.log(
            result.created
              ? `Fulfilled order ${result.order.id}`
              : `Idempotent skip for session ${session.id}`
          );
        }
        break;
      }
      case "payment_intent.payment_failed": {
        const pi = event.data.object as Stripe.PaymentIntent;
        await markPaymentFailed(
          null,
          `PaymentIntent ${pi.id} failed: ${pi.last_payment_error?.message || "unknown"} · order_ref=${pi.metadata?.order_ref || "n/a"}`
        );
        break;
      }
      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        const pi =
          typeof charge.payment_intent === "string"
            ? charge.payment_intent
            : charge.payment_intent?.id;
        await markRefunded(
          pi,
          `Charge ${charge.id} refunded amount ${(charge.amount_refunded || 0) / 100}`
        );
        break;
      }
      default:
        // Acknowledge unhandled types so Stripe does not retry forever
        break;
    }

    markEventProcessed(event.id);
    return NextResponse.json({ received: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Handler failed";
    console.error("Webhook handler error:", message);
    // 500 so Stripe retries; do NOT mark processed
    return new Response(`Webhook handler error: ${message}`, { status: 500 });
  }
}

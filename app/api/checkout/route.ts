import { NextRequest, NextResponse } from "next/server";
import { getStripe, stripeEnabled } from "@/lib/stripe";

export const runtime = "nodejs";

type CheckoutItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type Body = {
  email: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  items: CheckoutItem[];
};

export async function POST(req: NextRequest) {
  try {
    if (!stripeEnabled()) {
      return NextResponse.json(
        { error: "Stripe is not configured", demo: true },
        { status: 503 }
      );
    }

    const body = (await req.json()) as Body;
    const { email, name, address, city, state, zip, items } = body;

    if (!email || !name || !items?.length) {
      return NextResponse.json(
        { error: "Email, name, and cart items are required" },
        { status: 400 }
      );
    }

    const lineItems = items
      .filter((i) => i.price > 0 && i.quantity > 0)
      .map((i) => ({
        quantity: i.quantity,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(i.price * 100),
          product_data: {
            name: i.name,
            metadata: { product_id: i.id },
          },
        },
      }));

    if (lineItems.length === 0) {
      return NextResponse.json(
        { error: "No payable items in cart" },
        { status: 400 }
      );
    }

    const origin =
      process.env.NEXT_PUBLIC_APP_URL ||
      req.headers.get("origin") ||
      "http://localhost:3000";

    const orderRef = `IND-${Date.now().toString(36).toUpperCase()}`;

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: lineItems,
      success_url: `${origin}/checkout/success?order=${encodeURIComponent(orderRef)}&email=${encodeURIComponent(email)}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?canceled=1`,
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      metadata: {
        order_ref: orderRef,
        customer_name: name,
        ship_address: address || "",
        ship_city: city || "",
        ship_state: state || "",
        ship_zip: zip || "",
      },
      payment_intent_data: {
        metadata: {
          order_ref: orderRef,
          customer_name: name,
        },
      },
    });

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
      orderRef,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    console.error("Stripe checkout error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

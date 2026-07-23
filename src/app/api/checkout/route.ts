import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripe, stripeEnabled } from "@/lib/stripe";
import { generateOrderNumber } from "@/lib/utils";

const itemSchema = z.object({
  productId: z.string(),
  name: z.string(),
  image: z.string().optional(),
  unitPrice: z.number().positive(),
  quantity: z.number().int().positive(),
  variants: z.record(z.string(), z.string()).optional(),
  customization: z
    .object({
      text: z.string().optional(),
      color: z.string().optional(),
      notes: z.string().optional(),
      hasImage: z.boolean().optional(),
    })
    .optional(),
});

const schema = z.object({
  items: z.array(itemSchema).min(1),
  shipping: z.object({
    email: z.string().email(),
    fullName: z.string().min(1),
    line1: z.string().min(1),
    line2: z.string().optional(),
    city: z.string().min(1),
    state: z.string().min(1),
    postalCode: z.string().min(1),
    country: z.string().default("US"),
    phone: z.string().optional(),
  }),
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid checkout data" }, { status: 400 });
    }

    const { items, shipping } = parsed.data;
    const subtotal = items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
    const shippingCost = subtotal >= 75 ? 0 : 8;
    const tax = Math.round(subtotal * 0.08 * 100) / 100;
    const total = subtotal + shippingCost + tax;
    const orderNumber = generateOrderNumber();

    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: session?.user?.id,
        email: shipping.email.toLowerCase(),
        status: "PENDING",
        paymentStatus: "PENDING",
        subtotal,
        shipping: shippingCost,
        tax,
        total,
        shippingName: shipping.fullName,
        shippingLine1: shipping.line1,
        shippingLine2: shipping.line2,
        shippingCity: shipping.city,
        shippingState: shipping.state,
        shippingPostal: shipping.postalCode,
        shippingCountry: shipping.country,
        shippingPhone: shipping.phone,
        items: {
          create: items.map((i) => ({
            productId: i.productId,
            productName: i.name,
            productImage: i.image,
            unitPrice: i.unitPrice,
            quantity: i.quantity,
            variants: JSON.stringify(i.variants ?? {}),
            customization: JSON.stringify(i.customization ?? {}),
          })),
        },
      },
    });

    // Decrement inventory (best-effort)
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { inventory: { decrement: item.quantity } },
      }).catch(() => null);
    }

    if (stripeEnabled && stripe) {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      const checkoutSession = await stripe.checkout.sessions.create({
        mode: "payment",
        customer_email: shipping.email,
        line_items: items.map((i) => ({
          quantity: i.quantity,
          price_data: {
            currency: "usd",
            unit_amount: Math.round(i.unitPrice * 100),
            product_data: {
              name: i.name,
              images: i.image ? [i.image] : undefined,
            },
          },
        })),
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: { amount: Math.round(shippingCost * 100), currency: "usd" },
              display_name: shippingCost === 0 ? "Free shipping" : "Standard shipping",
            },
          },
        ],
        success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${appUrl}/checkout`,
        metadata: { orderId: order.id, orderNumber: order.orderNumber },
      });

      await prisma.order.update({
        where: { id: order.id },
        data: { stripeSessionId: checkoutSession.id },
      });

      return NextResponse.json({ url: checkoutSession.url, orderNumber: order.orderNumber });
    }

    // Demo mode — mark paid immediately
    await prisma.order.update({
      where: { id: order.id },
      data: { status: "PAID", paymentStatus: "PAID" },
    });

    return NextResponse.json({ orderNumber: order.orderNumber, orderId: order.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}

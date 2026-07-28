"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/store/cart";
import { formatMoney } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const items = useCart((s) => s.items);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const subtotal = items.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
  const shipping = subtotal >= 75 || subtotal === 0 ? 0 : 8;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-display text-3xl font-semibold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Browse the shop and add personalized products.</p>
        <Link href="/shop" className="mt-6 inline-block">
          <Button>Continue shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="mb-8 font-display text-3xl font-semibold">Cart</h1>
      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="grid gap-4 rounded-2xl border border-border bg-card p-4 sm:grid-cols-[96px_1fr_auto]"
            >
              <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-muted">
                {item.image && (
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
                )}
              </div>
              <div>
                <Link href={`/products/${item.slug}`} className="font-semibold hover:text-accent">
                  {item.name}
                </Link>
                <p className="mt-1 text-sm text-muted-foreground">
                  {Object.entries(item.variants)
                    .map(([k, v]) => `${k}: ${v}`)
                    .join(" · ")}
                </p>
                {item.customization.text && (
                  <p className="text-sm text-muted-foreground">Text: “{item.customization.text}”</p>
                )}
                {item.customization.color && (
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    Color:
                    <span
                      className="inline-block h-3.5 w-3.5 rounded-full border border-border"
                      style={{ background: item.customization.color }}
                    />
                  </p>
                )}
                <div className="mt-3 flex items-center gap-3">
                  <div className="inline-flex items-center rounded-full border border-border">
                    <button
                      type="button"
                      className="h-9 w-9"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      type="button"
                      className="h-9 w-9"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-red-600 underline"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="font-semibold sm:text-right">
                {formatMoney(item.unitPrice * item.quantity)}
              </div>
            </article>
          ))}
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">Order summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{formatMoney(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd>{shipping === 0 ? "Free" : formatMoney(shipping)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Est. tax</dt>
              <dd>{formatMoney(tax)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
              <dt>Total</dt>
              <dd>{formatMoney(total)}</dd>
            </div>
          </dl>
          <Link href="/checkout" className="mt-6 block">
            <Button className="w-full" size="lg">
              Checkout
            </Button>
          </Link>
          <p className="mt-3 text-xs text-muted-foreground">
            Free shipping on orders $75+. Stripe checkout when configured; demo mode otherwise.
          </p>
        </aside>
      </div>
    </div>
  );
}

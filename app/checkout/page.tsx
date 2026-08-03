'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { getCart, clearCart, type CartItem } from '@/lib/cart/store';
import { createOrder } from '@/lib/orders/store';

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [items, setItems] = useState<CartItem[]>([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('AL');
  const [zip, setZip] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const canceled = searchParams.get('canceled') === '1';

  useEffect(() => {
    setItems(getCart());
  }, []);

  const total = items.reduce(
    (s, i) => s + (i.isTokenOnly ? 0 : i.price) * i.quantity,
    0
  );

  async function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (items.length === 0) {
      setError('Your cart is empty');
      return;
    }
    setLoading(true);

    const payload = {
      email,
      name,
      address,
      city,
      state,
      zip,
      items: items
        .filter((i) => !i.isTokenOnly)
        .map((i) => ({
          id: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
        })),
    };

    try {
      // Prefer Stripe Checkout when configured
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.url) {
        // Save a local order stub for track page before redirect
        createOrder({
          email,
          name,
          address,
          city,
          state,
          zip,
          items: payload.items,
          total,
        });
        clearCart();
        window.location.href = data.url;
        return;
      }

      // Fallback: demo order if Stripe unavailable
      if (res.status === 503 || data.demo) {
        const order = createOrder({
          email,
          name,
          address,
          city,
          state,
          zip,
          items: payload.items,
          total,
        });
        clearCart();
        router.push(
          `/checkout/success?order=${order.id}&email=${encodeURIComponent(email)}`
        );
        return;
      }

      throw new Error(data.error || 'Checkout failed');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Checkout failed');
      setLoading(false);
    }
  }

  if (items.length === 0 && !loading) {
    return (
      <main className="max-w-lg mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Cart is empty</h1>
        <Link href="/shop" className="text-pink-400">
          Continue shopping →
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <nav className="text-sm text-zinc-500 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-pink-300">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-pink-300">
          Shop
        </Link>
        <span>/</span>
        <span className="text-zinc-300">Checkout</span>
      </nav>

      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <p className="text-zinc-400 text-sm mb-8">
        Guest checkout — secure payment via Stripe (test mode)
      </p>

      {canceled && (
        <div className="glass-pink mb-6 p-4 text-sm text-zinc-200">
          Payment canceled. Your cart is still here when you are ready.
        </div>
      )}

      <div className="grid lg:grid-cols-5 gap-10">
        <form onSubmit={placeOrder} className="lg:col-span-3 space-y-5">
          <div>
            <label className="block text-sm text-zinc-400 mb-1.5">Email *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-glass"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1.5">Full name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-glass"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1.5">
              Address * <span className="text-zinc-500">(also collected by Stripe)</span>
            </label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="input-glass"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1">
              <label className="block text-sm text-zinc-400 mb-1.5">City *</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="input-glass"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">State *</label>
              <input
                type="text"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="input-glass"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">ZIP *</label>
              <input
                type="text"
                required
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className="input-glass"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn-pill-pink w-full py-3.5 disabled:opacity-60"
          >
            {loading ? 'Redirecting to Stripe…' : `Pay with Stripe · $${total.toFixed(2)}`}
          </button>

          <p className="text-[11px] text-zinc-500 text-center">
            Test mode — use card 4242 4242 4242 4242, any future expiry, any CVC
          </p>
        </form>

        <div className="lg:col-span-2">
          <div className="glass sticky top-24 p-5">
            <h2 className="font-medium mb-4">Order summary</h2>
            <ul className="space-y-3 mb-4">
              {items.map((i) => (
                <li key={i.id} className="flex justify-between text-sm">
                  <span className="text-zinc-300">
                    {i.name} × {i.quantity}
                  </span>
                  <span className="text-yellow-300">
                    ${(i.price * i.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="border-t border-white/10 pt-3 flex justify-between font-medium">
              <span>Total</span>
              <span className="text-yellow-300">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center text-zinc-500">Loading checkout…</div>}>
      <CheckoutContent />
    </Suspense>
  );
}

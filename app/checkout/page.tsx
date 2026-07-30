'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCart, clearCart, type CartItem } from '@/lib/cart/store';
import { createOrder } from '@/lib/orders/store';

export default function CheckoutPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('AL');
  const [zip, setZip] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

    const order = createOrder({
      email,
      name,
      address,
      city,
      state,
      zip,
      items: items.map((i) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
      })),
      total,
    });

    clearCart();
    router.push(`/checkout/success?order=${order.id}&email=${encodeURIComponent(email)}`);
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
      <nav className="text-sm text-neutral-500 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-pink-300">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-pink-300">Shop</Link>
        <span>/</span>
        <span className="text-neutral-300">Checkout</span>
      </nav>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <p className="text-neutral-500 text-sm mb-8">
        Guest checkout — no account required
      </p>

      <div className="grid lg:grid-cols-5 gap-10">
        <form onSubmit={placeOrder} className="lg:col-span-3 space-y-5">
          <div>
            <label className="block text-sm text-neutral-400 mb-1.5">Email *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500/50"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-400 mb-1.5">Full name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500/50"
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-400 mb-1.5">Address *</label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500/50"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1">
              <label className="block text-sm text-neutral-400 mb-1.5">City *</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1.5">State *</label>
              <input
                type="text"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500/50"
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1.5">ZIP *</label>
              <input
                type="text"
                required
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500/50"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-pink-500 text-white font-medium hover:bg-pink-400 transition disabled:opacity-60 shadow-[0_0_25px_rgba(236,72,153,0.3)]"
          >
            {loading ? 'Placing order…' : `Place order · $${total.toFixed(2)}`}
          </button>

          <p className="text-[11px] text-neutral-600 text-center">
            Demo checkout — no real payment charged
          </p>
        </form>

        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5 sticky top-24">
            <h2 className="font-medium mb-4">Order summary</h2>
            <ul className="space-y-3 mb-4">
              {items.map((i) => (
                <li key={i.id} className="flex justify-between text-sm">
                  <span className="text-neutral-300">
                    {i.name} × {i.quantity}
                  </span>
                  <span className="text-yellow-300">
                    ${(i.price * i.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="border-t border-neutral-800 pt-3 flex justify-between font-medium">
              <span>Total</span>
              <span className="text-yellow-300">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

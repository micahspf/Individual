'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { findOrder, type Order, type OrderStatus } from '@/lib/orders/store';

const STEPS: { key: OrderStatus; label: string }[] = [
  { key: 'received', label: 'Received' },
  { key: 'in_production', label: 'In production' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'delivered', label: 'Delivered' },
];

function TrackForm() {
  const params = useSearchParams();
  const [email, setEmail] = useState(params.get('email') || '');
  const [orderId, setOrderId] = useState(params.get('order') || '');
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  function lookup(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSearched(true);
    const found = findOrder(orderId, email);
    if (!found) {
      setOrder(null);
      setError('No order found with that email and order ID.');
      return;
    }
    setOrder(found);
  }

  const stepIndex = order
    ? STEPS.findIndex((s) => s.key === order.status)
    : -1;

  return (
    <main className="max-w-lg mx-auto px-6 py-16">
      <p className="text-pink-400 text-sm font-medium mb-2">ORDERS</p>
      <h1 className="text-3xl font-bold mb-2">Track your order</h1>
      <p className="text-neutral-500 text-sm mb-8">
        Enter the email and order ID from your confirmation.
      </p>

      <form onSubmit={lookup} className="space-y-4 mb-10">
        <div>
          <label className="block text-sm text-neutral-400 mb-1.5">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500/50"
          />
        </div>
        <div>
          <label className="block text-sm text-neutral-400 mb-1.5">Order ID</label>
          <input
            type="text"
            required
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="IND-…"
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500/50 font-mono"
          />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          className="w-full py-3 rounded-full bg-pink-500 text-white font-medium hover:bg-pink-400 transition"
        >
          Track order
        </button>
      </form>

      {order && (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="font-mono text-yellow-300">{order.id}</div>
              <div className="text-sm text-neutral-500 mt-1">
                Placed {new Date(order.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div className="text-right text-sm text-neutral-400">
              ${order.total.toFixed(2)}
            </div>
          </div>

          {/* Status steps */}
          <div className="flex justify-between mb-8">
            {STEPS.map((step, i) => (
              <div key={step.key} className="flex-1 text-center">
                <div
                  className={`mx-auto w-3 h-3 rounded-full mb-2 ${
                    i <= stepIndex
                      ? 'bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.6)]'
                      : 'bg-neutral-700'
                  }`}
                />
                <div
                  className={`text-[10px] ${
                    i <= stepIndex ? 'text-pink-300' : 'text-neutral-600'
                  }`}
                >
                  {step.label}
                </div>
              </div>
            ))}
          </div>

          <ul className="space-y-2 text-sm text-neutral-400 border-t border-neutral-800 pt-4">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {searched && !order && !error && (
        <p className="text-neutral-500 text-sm text-center">No order found.</p>
      )}

      <p className="text-center text-sm text-neutral-600 mt-10">
        <Link href="/contact" className="text-pink-400 hover:text-pink-300">
          Need help?
        </Link>
      </p>
    </main>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center text-neutral-500">Loading…</div>}>
      <TrackForm />
    </Suspense>
  );
}

'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SuccessContent() {
  const params = useSearchParams();
  const orderId = params.get('order') || '';
  const email = params.get('email') || '';

  return (
    <main className="max-w-lg mx-auto px-6 py-20 text-center">
      <div className="text-4xl mb-4">✓</div>
      <h1 className="text-3xl font-bold mb-3">Order received</h1>
      <p className="text-neutral-400 mb-6">
        Thanks for your order. We’ll start making it soon.
      </p>

      {orderId && (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 mb-8 text-left">
          <div className="text-sm text-neutral-500 mb-1">Order ID</div>
          <div className="font-mono text-lg text-yellow-300 mb-4">{orderId}</div>
          {email && (
            <>
              <div className="text-sm text-neutral-500 mb-1">Confirmation sent to</div>
              <div className="text-neutral-300">{email}</div>
            </>
          )}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href={`/orders/track?order=${orderId}&email=${encodeURIComponent(email)}`}
          className="px-6 py-3 rounded-full bg-pink-500 text-white text-sm font-medium hover:bg-pink-400 transition"
        >
          Track this order
        </Link>
        <Link
          href="/shop"
          className="px-6 py-3 rounded-full border border-neutral-700 text-sm text-neutral-300 hover:border-pink-500/40 transition"
        >
          Continue shopping
        </Link>
      </div>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center text-neutral-500">Loading…</div>}>
      <SuccessContent />
    </Suspense>
  );
}

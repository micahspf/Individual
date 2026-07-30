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
        <div className="glass p-6 mb-8 text-left">
          <div className="text-sm text-zinc-500 mb-1">Order ID</div>
          <div className="font-mono text-lg text-yellow-300 mb-4">{orderId}</div>
          {email && (
            <>
              <div className="text-sm text-zinc-500 mb-1">Confirmation sent to</div>
              <div className="text-zinc-300">{email}</div>
            </>
          )}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href={`/orders/track?order=${orderId}&email=${encodeURIComponent(email)}`}
          className="btn-pill-pink px-6 py-3 text-sm"
        >
          Track this order
        </Link>
        <Link
          href="/shop"
          className="px-6 py-3 rounded-full border border-white/15 bg-white/5 text-sm text-zinc-300 transition hover:border-pink-500/40"
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

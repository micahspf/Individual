'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { clearCart } from '@/lib/cart/store';

function SuccessContent() {
  const params = useSearchParams();
  const orderId = params.get('order') || '';
  const email = params.get('email') || '';
  const sessionId = params.get('session_id') || '';

  useEffect(() => {
    // Payment completed on Stripe — safe to clear cart now
    clearCart();
  }, []);

  return (
    <main className="max-w-lg mx-auto px-6 py-20 text-center">
      <div className="text-4xl mb-4">✓</div>
      <h1 className="text-3xl font-bold mb-3">Payment received</h1>
      <p className="mb-4 text-zinc-400">
        Thanks for your order. We’ll start making it soon.
        {sessionId ? ' Your payment was confirmed by Stripe.' : ''}
      </p>
      <p className="mb-6 text-sm text-zinc-400">
        If you entered engraving text, check your confirmation email —{' '}
        <span className="text-yellow-300">
          check the spelling now; that is what gets engraved.
        </span>
      </p>

      {orderId && (
        <div className="glass p-6 mb-8 text-left">
          <div className="mb-1 text-sm text-zinc-400">Order ID</div>
          <div className="font-mono text-lg text-yellow-300 mb-4">{orderId}</div>
          {email && (
            <>
              <div className="mb-1 text-sm text-zinc-400">Receipt email</div>
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
    <Suspense fallback={<div className="p-20 text-center text-zinc-500">Loading…</div>}>
      <SuccessContent />
    </Suspense>
  );
}

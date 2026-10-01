'use client';

import { useState } from 'react';

/**
 * Footer signup — the list for when the shop reopens.
 *
 * Sends through /api/request like the quote form, so there is one delivery path
 * to maintain. This previously saved addresses only to the visitor's own
 * localStorage, which meant every signup was told "you're on the list" and none
 * ever reached the inbox. Never report success unless the server confirmed it.
 */
export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'failed'>('idle');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes('@') || state === 'sending') return;
    setState('sending');
    try {
      const res = await fetch('/api/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          requestType: 'subscribe',
          message: 'Add me to the list for when the shop reopens.',
        }),
      });
      setState(res.ok ? 'done' : 'failed');
    } catch {
      setState('failed');
    }
  }

  if (state === 'done') {
    return <p className="text-sm text-pink-300">You’re on the list. Talk soon.</p>;
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      <p className="text-zinc-400 text-sm mb-2">Hear when the shop reopens.</p>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        aria-label="Email address"
        className="input-glass !rounded-lg !py-2"
      />
      <button
        type="submit"
        disabled={state === 'sending'}
        className="w-full py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-zinc-300 transition hover:border-pink-500/40 hover:bg-[#ff2d8a] hover:text-white disabled:opacity-60"
      >
        {state === 'sending' ? 'Adding…' : 'Subscribe'}
      </button>
      {state === 'failed' && (
        <p className="text-xs text-zinc-400" role="alert">
          That didn’t go through. Email{' '}
          <a href="mailto:madebyindividual@gmail.com" className="text-pink-300 underline">
            madebyindividual@gmail.com
          </a>{' '}
          and we’ll add you.
        </p>
      )}
    </form>
  );
}

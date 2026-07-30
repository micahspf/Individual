'use client';

import { useState } from 'react';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes('@')) return;
    try {
      const list = JSON.parse(localStorage.getItem('individual_emails') || '[]');
      if (!list.includes(email.toLowerCase())) {
        list.push(email.toLowerCase());
        localStorage.setItem('individual_emails', JSON.stringify(list));
      }
    } catch {}
    setDone(true);
  }

  if (done) {
    return (
      <p className="text-sm text-pink-300">You’re on the list. Talk soon.</p>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      <p className="text-neutral-500 text-sm mb-2">
        Get drop alerts + token bonuses
      </p>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-pink-500/50"
      />
      <button
        type="submit"
        className="w-full py-2 rounded-lg bg-neutral-800 text-sm text-neutral-300 hover:bg-pink-500 hover:text-white transition"
      >
        Subscribe
      </button>
    </form>
  );
}

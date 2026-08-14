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
      <p className="text-zinc-400 text-sm mb-2">
        Get new product alerts and Cullman pickup dates.
      </p>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className="input-glass !rounded-lg !py-2"
      />
      <button
        type="submit"
        className="w-full py-2 rounded-lg border border-white/10 bg-white/5 text-sm text-zinc-300 transition hover:border-pink-500/40 hover:bg-[#ff2d8a] hover:text-white"
      >
        Subscribe
      </button>
    </form>
  );
}

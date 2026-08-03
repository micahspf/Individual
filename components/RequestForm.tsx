'use client';

import { useState } from 'react';

export default function RequestForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !message) return;
    setStatus('sending');
    // Placeholder — wire to your Request Agent / email later
    await new Promise((r) => setTimeout(r, 800));
    setStatus('sent');
    setName('');
    setEmail('');
    setMessage('');
  }

  if (status === 'sent') {
    return (
      <div className="glass-pink p-8 text-center">
        <div className="mb-2 text-2xl">✓</div>
        <p className="font-medium">Request received</p>
        <p className="mt-1 text-sm text-zinc-300">
          We’ll reply with a quote and timeline soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm text-pink-400 hover:text-pink-300"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm text-zinc-400">Your name (optional)</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-pink-500/50 focus:outline-none"
          placeholder="Micah"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm text-zinc-400">Email *</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-pink-500/50 focus:outline-none"
          placeholder="you@email.com"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm text-zinc-400">Commission brief *</label>
        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-pink-500/50 focus:outline-none"
          placeholder="What to personalize (names, monogram, date, message), size, material, quantity, and target date…"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-pill-pink w-full py-3.5 disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Request quote'}
      </button>
    </form>
  );
}

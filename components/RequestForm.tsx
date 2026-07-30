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
      <div className="rounded-2xl border border-pink-500/30 bg-pink-500/10 p-8 text-center">
        <div className="text-2xl mb-2">✓</div>
        <p className="font-medium">Request received</p>
        <p className="text-neutral-400 text-sm mt-1">
          We’ll reply with a quote and timeline soon.
        </p>
        <button
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
        <label className="block text-sm text-neutral-400 mb-1.5">Your name (optional)</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500/50"
          placeholder="Micah"
        />
      </div>
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
        <label className="block text-sm text-neutral-400 mb-1.5">What would you like made? *</label>
        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-500/50 resize-none"
          placeholder="Describe size, material preference, color, quantity, any text/logo, and deadline if you have one..."
        />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full py-3.5 rounded-full bg-pink-500 text-white font-medium hover:bg-pink-400 transition disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : 'Send Request'}
      </button>
    </form>
  );
}

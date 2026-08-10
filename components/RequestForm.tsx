'use client';

import { useState } from 'react';

type RequestType = 'product' | 'ai' | 'unsure';

const REQUEST_TYPES: { value: RequestType; label: string }[] = [
  { value: 'product', label: 'Personalized product' },
  { value: 'ai', label: 'AI tool or automation' },
  { value: 'unsure', label: 'Not sure yet' },
];

const PLACEHOLDERS: Record<RequestType, string> = {
  product:
    'What to personalize (names, monogram, date, message), size, material, quantity, and target date…',
  ai: 'The task you keep repeating, the apps involved, roughly how often, and what a good result looks like…',
  unsure: 'Describe what you need and roughly when you need it — we will work out the details.',
};

export default function RequestForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [requestType, setRequestType] = useState<RequestType>('product');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !message) return;
    setStatus('sending');
    setError('');

    try {
      const res = await fetch('/api/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, requestType }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }

      setStatus('sent');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setError('Could not reach the server. Please check your connection and try again.');
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="glass-pink p-8 text-center">
        <div className="mb-2 text-2xl">✓</div>
        <p className="font-medium">Request received</p>
        <p className="mt-1 text-sm text-zinc-300">
          We’ll reply with a quote and timeline. Nothing is built or produced until you
          approve it.
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
      <fieldset>
        <legend className="mb-1.5 block text-sm text-zinc-400">What is this for?</legend>
        <div className="flex flex-wrap gap-2">
          {REQUEST_TYPES.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setRequestType(t.value)}
              aria-pressed={requestType === t.value}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                requestType === t.value
                  ? 'border-pink-500/60 bg-pink-500/15 text-pink-200'
                  : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/25 hover:text-zinc-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label className="mb-1.5 block text-sm text-zinc-400" htmlFor="rf-name">
          Your name (optional)
        </label>
        <input
          id="rf-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-pink-500/50 focus:outline-none"
          placeholder="Micah"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm text-zinc-400" htmlFor="rf-email">
          Email *
        </label>
        <input
          id="rf-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-pink-500/50 focus:outline-none"
          placeholder="you@email.com"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm text-zinc-400" htmlFor="rf-message">
          What do you need? *
        </label>
        <textarea
          id="rf-message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-pink-500/50 focus:outline-none"
          placeholder={PLACEHOLDERS[requestType]}
        />
      </div>

      {status === 'error' && error && (
        <p role="alert" className="text-sm text-pink-300">
          {error}
        </p>
      )}

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

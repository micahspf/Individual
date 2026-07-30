'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus('sending');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error('Failed');
      setStatus('sent');
    } catch {
      // Still show success message to avoid email enumeration
      setStatus('sent');
    }
  }

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-16">
      <div className="glass-strong w-full max-w-md p-8">
        <div className="text-center mb-8">
          <p className="text-pink-400 text-sm font-medium mb-2">ACCOUNT</p>
          <h1 className="text-3xl font-bold">Reset your password</h1>
          <p className="text-zinc-400 text-sm mt-2">
            Enter the email on your account. We’ll send a reset link if it exists.
          </p>
        </div>

        {status === 'sent' ? (
          <div className="glass-pink p-8 text-center">
            <div className="text-3xl mb-3">✉</div>
            <h2 className="font-medium text-lg mb-2">Check your email</h2>
            <p className="text-zinc-300 text-sm leading-relaxed">
              If an account exists for <span className="text-white">{email}</span>, we sent a password reset link.
              It expires in 1 hour.
            </p>
            <Link
              href="/login"
              className="inline-block mt-6 text-sm text-pink-400 hover:text-pink-300"
            >
              ← Back to login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-glass"
                placeholder="you@email.com"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-pill-pink w-full py-3.5 disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending…' : 'Send reset link'}
            </button>

            <p className="text-center text-sm text-zinc-400">
              Remembered it?{' '}
              <Link href="/login" className="text-pink-400 hover:text-pink-300">
                Sign in
              </Link>
            </p>
          </form>
        )}
      </div>
    </main>
  );
}

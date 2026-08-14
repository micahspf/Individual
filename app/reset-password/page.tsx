'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');

    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters');
      return;
    }
    if (password !== confirm) {
      setErrorMsg('Passwords do not match');
      return;
    }
    if (!token) {
      setErrorMsg('Invalid or missing reset token');
      return;
    }

    setStatus('saving');

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Reset failed');

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. The link may have expired.');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-pink-500/30 bg-pink-500/10 p-8 text-center">
        <div className="text-3xl mb-3">✓</div>
        <h2 className="font-medium text-lg mb-2">Password updated</h2>
        <p className="text-neutral-400 text-sm mb-6">
          You can now sign in with your new password.
        </p>
        <Link
          href="/login"
          className="inline-flex px-6 py-2.5 rounded-full bg-[#ff2d8a] text-white text-sm font-medium hover:bg-[#ff4da0] transition"
        >
          Go to login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm text-neutral-400 mb-1.5">New password</label>
        <input
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-glass"
          placeholder="At least 8 characters"
        />
      </div>

      <div>
        <label className="block text-sm text-neutral-400 mb-1.5">Confirm new password</label>
        <input
          type="password"
          required
          minLength={8}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="input-glass"
          placeholder="Repeat password"
        />
      </div>

      {errorMsg && (
        <p className="text-sm text-red-400">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'saving'}
        className="w-full py-3.5 rounded-full bg-[#ff2d8a] text-white font-medium hover:bg-[#ff4da0] transition disabled:opacity-60"
      >
        {status === 'saving' ? 'Updating…' : 'Update password'}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="text-pink-400 text-sm font-medium mb-2">ACCOUNT</p>
          <h1 className="text-3xl font-bold">Set a new password</h1>
          <p className="text-neutral-500 text-sm mt-2">
            Choose a strong password you haven’t used elsewhere.
          </p>
        </div>

        <Suspense fallback={<div className="text-center text-neutral-500">Loading…</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </main>
  );
}

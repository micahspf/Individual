'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  email: string;
  name?: string;
  isFounder?: boolean;
}

async function refreshTokens(): Promise<string | null> {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return null;

  const res = await fetch('/api/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    return null;
  }

  const data = await res.json();
  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  return data.accessToken;
}

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    let accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      router.push('/login');
      return;
    }

    let res = await fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (res.status === 401) {
      accessToken = await refreshTokens();
      if (!accessToken) {
        router.push('/login');
        return;
      }
      res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    }

    if (!res.ok) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      router.push('/login');
      return;
    }

    const data = await res.json();
    setUser(data.user);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  async function logout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {}
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    router.push('/');
  }

  if (loading) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <p className="text-zinc-500">Loading account…</p>
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex items-start justify-between mb-10">
        <div>
          <p className="text-pink-400 text-sm font-medium mb-2">ACCOUNT</p>
          <h1 className="text-3xl font-bold">
            {user.name ? `Hey, ${user.name}` : 'Your account'}
          </h1>
          <p className="text-zinc-400 text-sm mt-1">{user.email}</p>
        </div>
        <button
          onClick={logout}
          className="text-sm text-zinc-500 hover:text-pink-400 transition"
        >
          Sign out
        </button>
      </div>

      <div className="space-y-6">
        <div className="glass p-5">
          <h2 className="font-medium mb-2">Orders</h2>
          <p className="text-sm text-zinc-400 mb-4">
            Track a guest or account order with the email and order ID from your confirmation.
          </p>
          <Link href="/orders/track" className="text-sm text-pink-400 hover:text-pink-300">
            Track an order →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/shop"
            className="glass p-5 transition hover:border-pink-500/40 group"
          >
            <div className="font-medium group-hover:text-pink-300 transition">Shop</div>
            <p className="text-sm text-zinc-400 mt-1">Made-to-order catalog</p>
          </Link>

          <Link
            href="/#request"
            className="glass p-5 transition hover:border-pink-500/40 group"
          >
            <div className="font-medium transition group-hover:text-pink-300">
              Commission
            </div>
            <p className="mt-1 text-sm text-zinc-400">Request a manufactured piece</p>
          </Link>
        </div>
      </div>
    </main>
  );
}

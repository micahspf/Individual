'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TokenBalance from '@/components/rewards/TokenBalance';

interface User {
  email: string;
  name?: string;
  isFounder?: boolean;
}

interface Rewards {
  tokens: number;
  streak: number;
  lastCheckIn: string | null;
  lifetimeSpent: number;
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
  const [rewards, setRewards] = useState<Rewards | null>(null);
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

    // Access token expired → try refresh
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
    setRewards(data.rewards);
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
        <p className="text-neutral-500">Loading account…</p>
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
          <p className="text-neutral-500 text-sm mt-1">{user.email}</p>
        </div>
        <button
          onClick={logout}
          className="text-sm text-neutral-500 hover:text-pink-400 transition"
        >
          Sign out
        </button>
      </div>

      <div className="space-y-6">
        {rewards && (
          <TokenBalance tokens={rewards.tokens} isFounder={user.isFounder} />
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/rewards"
            className="glass p-5 transition hover:border-pink-500/40 group"
          >
            <div className="font-medium group-hover:text-pink-300 transition">
              Play & Earn
            </div>
            <p className="text-sm text-zinc-400 mt-1">
              Daily check-in · Spin the wheel · Streaks
            </p>
          </Link>

          <Link
            href="/shop"
            className="glass p-5 transition hover:border-pink-500/40 group"
          >
            <div className="font-medium group-hover:text-pink-300 transition">
              Shop
            </div>
            <p className="text-sm text-zinc-400 mt-1">
              Spend tokens on exclusives
            </p>
          </Link>
        </div>

        {rewards && (
          <div className="glass p-5">
            <h2 className="font-medium mb-3">Activity</h2>
            <div className="space-y-2 text-sm text-zinc-400">
              <div className="flex justify-between">
                <span>Current streak</span>
                <span className="text-yellow-300">{rewards.streak} days</span>
              </div>
              <div className="flex justify-between">
                <span>Tokens spent (lifetime)</span>
                <span className="text-zinc-300">{rewards.lifetimeSpent}</span>
              </div>
              <div className="flex justify-between">
                <span>Last check-in</span>
                <span className="text-zinc-300">
                  {rewards.lastCheckIn || 'Never'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

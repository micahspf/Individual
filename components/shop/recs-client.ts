'use client';

/**
 * Client-side identity for the For You tab: the logged-in account's email,
 * or "guest". Resolved once per page load and cached module-wide.
 */

import { useEffect, useState } from 'react';

let cached: string | null = null;
let inflight: Promise<string> | null = null;

export function resolveRecsIdentity(): Promise<string> {
  if (cached) return Promise.resolve(cached);
  if (!inflight) {
    // Auth in this app is localStorage-token based (see app/account/page.tsx).
    // Without a token the /api/auth/me call is a guaranteed 401 — skip it
    // entirely so guests never log console noise.
    const token =
      typeof window !== 'undefined' ? window.localStorage.getItem('accessToken') : null;
    if (!token) {
      cached = 'guest';
      return Promise.resolve(cached);
    }
    inflight = fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => (cached = (d?.user?.email as string) || 'guest'))
      .catch(() => (cached = 'guest'));
  }
  return inflight;
}

export function useRecsIdentity(): string {
  const [who, setWho] = useState<string>(cached ?? 'guest');
  useEffect(() => {
    let live = true;
    resolveRecsIdentity().then((w) => {
      if (live) setWho(w);
    });
    return () => {
      live = false;
    };
  }, []);
  return who;
}

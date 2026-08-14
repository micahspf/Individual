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
    inflight = fetch('/api/auth/me')
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

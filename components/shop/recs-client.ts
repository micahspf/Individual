'use client';

/**
 * Client-side identity for the For You tab.
 *
 * Always "guest" while accounts are paused (see app/account/page.tsx). The
 * /api/auth/me endpoint this used to call no longer exists. When accounts come
 * back, resolve the signed-in user here again — callers already treat the
 * result as an opaque key, so nothing else needs to change.
 */

const GUEST = 'guest';

export function resolveRecsIdentity(): Promise<string> {
  return Promise.resolve(GUEST);
}

export function useRecsIdentity(): string {
  return GUEST;
}

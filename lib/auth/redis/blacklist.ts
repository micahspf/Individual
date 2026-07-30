/**
 * Redis-backed token blacklist (with Lua atomicity)
 */

import { getRedis } from './client';
import { BLACKLIST_SCRIPT } from './scripts';

const PREFIX = 'bl:jti:';

export async function blacklistToken(
  jti: string,
  exp: number,
  reason?: string,
  email?: string
): Promise<void> {
  const redis = await getRedis();
  if (!redis) return;

  const ttl = Math.max(1, exp - Math.floor(Date.now() / 1000));
  const key = `${PREFIX}${jti}`;
  const value = JSON.stringify({
    reason: reason || 'revoked',
    email: email || null,
  });

  // Atomic + idempotent via Lua
  await (redis as any).eval(BLACKLIST_SCRIPT, 1, key, value, String(ttl));
}

export async function isBlacklisted(jti: string): Promise<boolean> {
  const redis = await getRedis();
  if (!redis) return false;

  const exists = await redis.exists(`${PREFIX}${jti}`);
  return exists === 1;
}

export async function blacklistMany(
  entries: { jti: string; exp: number }[],
  reason = 'revoke_all'
): Promise<void> {
  const redis = await getRedis();
  if (!redis) return;

  const now = Math.floor(Date.now() / 1000);

  await Promise.all(
    entries.map(({ jti, exp }) => {
      const ttl = Math.max(1, exp - now);
      const key = `${PREFIX}${jti}`;
      const value = JSON.stringify({ reason });
      return (redis as any).eval(BLACKLIST_SCRIPT, 1, key, value, String(ttl));
    })
  );
}

export { PREFIX as BLACKLIST_PREFIX };

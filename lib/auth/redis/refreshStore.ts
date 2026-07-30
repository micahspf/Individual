/**
 * Redis-backed refresh token registry (with Lua atomicity)
 *
 * Keys:
 *   rt:jti:{jti}     →  { email, exp }
 *   rt:user:{email}  →  SET of jtis
 */

import { getRedis } from './client';
import {
  STORE_REFRESH_SCRIPT,
  ROTATE_REFRESH_SCRIPT,
  REVOKE_ALL_SCRIPT,
  VALIDATE_REFRESH_SCRIPT,
} from './scripts';

const JTI_PREFIX = 'rt:jti:';
const USER_PREFIX = 'rt:user:';
const BL_PREFIX = 'bl:jti:';
const USER_SET_TTL = 60 * 60 * 24 * 8; // 8 days

export async function storeRefreshToken(
  jti: string,
  email: string,
  expiresAtMs: number
): Promise<void> {
  const redis = await getRedis();
  if (!redis) return;

  const ttl = Math.max(1, Math.floor((expiresAtMs - Date.now()) / 1000));
  const emailKey = email.toLowerCase().trim();
  const record = JSON.stringify({ email: emailKey, exp: expiresAtMs });

  await (redis as any).eval(
    STORE_REFRESH_SCRIPT,
    2,
    `${JTI_PREFIX}${jti}`,
    `${USER_PREFIX}${emailKey}`,
    record,
    String(ttl),
    jti,
    String(USER_SET_TTL)
  );
}

export async function isRefreshTokenValid(
  jti: string,
  email: string
): Promise<boolean> {
  const redis = await getRedis();
  if (!redis) return false;

  const emailKey = email.toLowerCase().trim();
  const result = (await (redis as any).eval(
    VALIDATE_REFRESH_SCRIPT,
    2,
    `${JTI_PREFIX}${jti}`,
    `${BL_PREFIX}${jti}`,
    emailKey
  )) as [number, string, string?];

  return result[0] === 1;
}

/**
 * Atomic rotate: revoke old JTI, store new JTI, update user set
 * Returns true on success
 */
export async function rotateRefreshToken(
  oldJti: string,
  newJti: string,
  email: string,
  expiresAtMs: number
): Promise<boolean> {
  const redis = await getRedis();
  if (!redis) return false;

  const ttl = Math.max(1, Math.floor((expiresAtMs - Date.now()) / 1000));
  const emailKey = email.toLowerCase().trim();
  const record = JSON.stringify({ email: emailKey, exp: expiresAtMs });

  const result = (await (redis as any).eval(
    ROTATE_REFRESH_SCRIPT,
    3,
    `${JTI_PREFIX}${oldJti}`,
    `${JTI_PREFIX}${newJti}`,
    `${USER_PREFIX}${emailKey}`,
    oldJti,
    newJti,
    emailKey,
    record,
    String(ttl),
    String(USER_SET_TTL)
  )) as [number, string];

  return result[0] === 1;
}

export async function revokeRefreshToken(jti: string): Promise<void> {
  const redis = await getRedis();
  if (!redis) return;

  const raw = await redis.get(`${JTI_PREFIX}${jti}`);
  await redis.del(`${JTI_PREFIX}${jti}`);

  if (raw) {
    try {
      const data = JSON.parse(raw);
      await redis.srem(`${USER_PREFIX}${data.email}`, jti);
    } catch {
      // ignore
    }
  }
}

export async function revokeAllRefreshTokensForUser(
  email: string
): Promise<void> {
  const redis = await getRedis();
  if (!redis) return;

  const emailKey = email.toLowerCase().trim();

  await (redis as any).eval(
    REVOKE_ALL_SCRIPT,
    1,
    `${USER_PREFIX}${emailKey}`,
    JTI_PREFIX
  );
}

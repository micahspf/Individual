/**
 * Unified token store — Redis when available, in-memory otherwise.
 *
 * Usage:
 *   import { blacklistToken, isBlacklisted, storeRefreshToken, ... } from '@/lib/auth/tokenStore'
 *
 * Set REDIS_URL in env to enable Redis.
 */

import * as memoryBlacklist from './blacklist';
import * as memoryStore from './store';
import * as redisBlacklist from './redis/blacklist';
import * as redisRefresh from './redis/refreshStore';
// rotateRefreshToken is Redis-only (atomic)
import { isRedisEnabled } from './redis/client';

// ─── Blacklist ───────────────────────────────────────────────

export async function blacklistToken(
  jti: string,
  exp: number,
  reason?: string,
  email?: string
): Promise<void> {
  // Always write memory (works in single-process / fallback)
  memoryBlacklist.blacklistToken(jti, exp, reason, email);

  if (isRedisEnabled()) {
    await redisBlacklist.blacklistToken(jti, exp, reason, email);
  }
}

export async function isBlacklisted(jti: string): Promise<boolean> {
  // Check memory first (fast path for same process)
  if (memoryBlacklist.isBlacklisted(jti)) return true;

  if (isRedisEnabled()) {
    return redisBlacklist.isBlacklisted(jti);
  }
  return false;
}

// ─── Refresh tokens ──────────────────────────────────────────

export async function storeRefreshToken(
  jti: string,
  email: string,
  expiresAtMs: number
): Promise<void> {
  memoryStore.storeRefreshToken(jti, email, expiresAtMs);

  if (isRedisEnabled()) {
    await redisRefresh.storeRefreshToken(jti, email, expiresAtMs);
  }
}

export async function isRefreshTokenValid(
  jti: string,
  email: string
): Promise<boolean> {
  // Prefer Redis as source of truth when enabled (multi-instance safe)
  if (isRedisEnabled()) {
    return redisRefresh.isRefreshTokenValid(jti, email);
  }
  return memoryStore.isRefreshTokenValid(jti, email);
}

export async function revokeRefreshToken(jti: string): Promise<void> {
  memoryStore.revokeRefreshToken(jti);
  if (isRedisEnabled()) {
    await redisRefresh.revokeRefreshToken(jti);
  }
}

export async function revokeAllRefreshTokensForUser(email: string): Promise<void> {
  memoryStore.revokeAllRefreshTokensForUser(email);
  if (isRedisEnabled()) {
    await redisRefresh.revokeAllRefreshTokensForUser(email);
  }
}


export async function rotateRefreshToken(
  oldJti: string,
  newJti: string,
  email: string,
  expiresAtMs: number
): Promise<boolean> {
  if (isRedisEnabled()) {
    return redisRefresh.rotateRefreshToken(oldJti, newJti, email, expiresAtMs);
  }
  // Memory fallback: revoke old + store new
  memoryStore.revokeRefreshToken(oldJti);
  memoryStore.storeRefreshToken(newJti, email, expiresAtMs);
  return true;
}

// Re-export helpers that stay in memory/store
export { generateJti, findUserByEmail, createUser, verifyPassword, updatePassword, createResetToken, consumeResetToken } from './store';

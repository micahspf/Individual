/**
 * Token blacklist
 * Stores JTIs of revoked access + refresh tokens until they expire.
 * In production: use Redis with TTL = remaining token lifetime.
 */

interface BlacklistEntry {
  exp: number; // unix seconds — when the original token would have expired
  reason?: string;
  email?: string;
}

const blacklist = new Map<string, BlacklistEntry>();

/**
 * Add a token JTI to the blacklist
 */
export function blacklistToken(
  jti: string,
  exp: number,
  reason?: string,
  email?: string
) {
  blacklist.set(jti, { exp, reason, email });
}

/**
 * Check if a JTI is blacklisted (and not yet expired)
 */
export function isBlacklisted(jti: string): boolean {
  const entry = blacklist.get(jti);
  if (!entry) return false;

  // Clean up if the original token would already be expired
  if (entry.exp < Math.floor(Date.now() / 1000)) {
    blacklist.delete(jti);
    return false;
  }

  return true;
}

/**
 * Blacklist all tokens for a user (used on password change / force logout)
 * Note: only works for JTIs we know about (refresh tokens + any access tokens we tracked)
 */
export function blacklistAllForEmail(email: string, knownJtis: string[]) {
  const key = email.toLowerCase().trim();
  const now = Math.floor(Date.now() / 1000);
  for (const jti of knownJtis) {
    blacklist.set(jti, {
      exp: now + 60 * 60 * 24 * 7, // keep for max refresh lifetime
      reason: 'user_revoke_all',
      email: key,
    });
  }
}

/**
 * Remove expired entries (call periodically or on each check)
 */
export function purgeExpired() {
  const now = Math.floor(Date.now() / 1000);
  for (const [jti, entry] of blacklist) {
    if (entry.exp < now) blacklist.delete(jti);
  }
}

/**
 * Debug / admin: count active blacklist entries
 */
export function blacklistSize(): number {
  purgeExpired();
  return blacklist.size;
}

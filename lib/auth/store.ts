/**
 * In-memory auth + refresh token store (dev).
 * Replace with DB in production.
 */

export interface User {
  email: string;
  name?: string;
  passwordHash: string;
  isFounder: boolean;
  createdAt: string;
}

interface ResetToken {
  email: string;
  expiresAt: number;
}

interface RefreshRecord {
  email: string;
  expiresAt: number;
  revoked: boolean;
}

const users = new Map<string, User>();
const resetTokens = new Map<string, ResetToken>();
const refreshTokens = new Map<string, RefreshRecord>(); // jti → record

// Demo user
users.set('demo@individual.com', {
  email: 'demo@individual.com',
  name: 'Demo User',
  passwordHash: 'demo1234',
  isFounder: true,
  createdAt: new Date().toISOString(),
});

export function findUserByEmail(email: string): User | null {
  return users.get(email.toLowerCase().trim()) || null;
}

export function createUser(email: string, password: string, name?: string): User {
  const key = email.toLowerCase().trim();
  if (users.has(key)) throw new Error('Account already exists');
  const user: User = {
    email: key,
    name: name?.trim() || undefined,
    passwordHash: password,
    isFounder: users.size < 100,
    createdAt: new Date().toISOString(),
  };
  users.set(key, user);
  return user;
}

export function updatePassword(email: string, newPassword: string): boolean {
  const user = findUserByEmail(email);
  if (!user) return false;
  user.passwordHash = newPassword;
  return true;
}

export function createResetToken(email: string): string {
  const token = `rst_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
  resetTokens.set(token, {
    email: email.toLowerCase().trim(),
    expiresAt: Date.now() + 60 * 60 * 1000,
  });
  return token;
}

export function consumeResetToken(token: string): string | null {
  const entry = resetTokens.get(token);
  if (!entry) return null;
  resetTokens.delete(token);
  if (Date.now() > entry.expiresAt) return null;
  return entry.email;
}

export function verifyPassword(email: string, password: string): boolean {
  const user = findUserByEmail(email);
  if (!user) return false;
  return user.passwordHash === password;
}

/** Refresh token registry */
export function storeRefreshToken(jti: string, email: string, expiresAtMs: number) {
  refreshTokens.set(jti, {
    email: email.toLowerCase().trim(),
    expiresAt: expiresAtMs,
    revoked: false,
  });
}

export function isRefreshTokenValid(jti: string, email: string): boolean {
  const rec = refreshTokens.get(jti);
  if (!rec) return false;
  if (rec.revoked) return false;
  if (rec.email !== email.toLowerCase().trim()) return false;
  if (Date.now() > rec.expiresAt) return false;
  return true;
}

export function revokeRefreshToken(jti: string) {
  const rec = refreshTokens.get(jti);
  if (rec) rec.revoked = true;
}

export function revokeAllRefreshTokensForUser(email: string) {
  const key = email.toLowerCase().trim();
  for (const [, rec] of refreshTokens) {
    if (rec.email === key) rec.revoked = true;
  }
}

export function generateJti(): string {
  return `jti_${Date.now()}_${Math.random().toString(36).slice(2, 14)}`;
}

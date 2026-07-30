/**
 * JWT Access + Refresh token helper (HMAC-SHA256)
 * Access token: short-lived (15 min) — includes jti for blacklisting
 * Refresh token: long-lived (7 days)
 */

import { isBlacklisted } from './tokenStore';

const DEFAULT_SECRET = process.env.JWT_SECRET || 'individual-dev-secret-change-me-in-production';

function base64UrlEncode(data: ArrayBuffer | string): string {
  const bytes =
    typeof data === 'string'
      ? new TextEncoder().encode(data)
      : new Uint8Array(data);
  let str = '';
  bytes.forEach((b) => (str += String.fromCharCode(b)));
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(str: string): Uint8Array {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function getKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

export type TokenType = 'access' | 'refresh';

export interface JWTPayload {
  sub: string;
  name?: string;
  isFounder?: boolean;
  type: TokenType;
  iat: number;
  exp: number;
  jti: string; // always present — required for blacklisting
}

const ACCESS_TTL = 60 * 15; // 15 minutes
const REFRESH_TTL = 60 * 60 * 24 * 7; // 7 days

async function sign(
  payload: Omit<JWTPayload, 'iat' | 'exp'>,
  expiresInSeconds: number
): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const fullPayload: JWTPayload = {
    ...payload,
    iat: now,
    exp: now + expiresInSeconds,
  };

  const headerB64 = base64UrlEncode(JSON.stringify(header));
  const payloadB64 = base64UrlEncode(JSON.stringify(fullPayload));
  const data = `${headerB64}.${payloadB64}`;

  const key = await getKey(DEFAULT_SECRET);
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(data)
  );

  return `${data}.${base64UrlEncode(signature)}`;
}

export async function signAccessToken(payload: {
  sub: string;
  name?: string;
  isFounder?: boolean;
  jti: string;
}): Promise<string> {
  return sign({ ...payload, type: 'access' }, ACCESS_TTL);
}

export async function signRefreshToken(payload: {
  sub: string;
  name?: string;
  isFounder?: boolean;
  jti: string;
}): Promise<string> {
  return sign({ ...payload, type: 'refresh' }, REFRESH_TTL);
}

/**
 * Verify JWT and reject blacklisted tokens
 */
export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64, signatureB64] = parts;
    const data = `${headerB64}.${payloadB64}`;

    const key = await getKey(DEFAULT_SECRET);
    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      base64UrlDecode(signatureB64),
      new TextEncoder().encode(data)
    );
    if (!valid) return null;

    const payload: JWTPayload = JSON.parse(
      new TextDecoder().decode(base64UrlDecode(payloadB64))
    );

    if (payload.exp < Math.floor(Date.now() / 1000)) return null;

    // Blacklist check (Redis or memory)
    if (payload.jti && (await isBlacklisted(payload.jti))) return null;

    return payload;
  } catch {
    return null;
  }
}

export function extractToken(req: Request): string | null {
  const auth = req.headers.get('authorization');
  if (auth?.startsWith('Bearer ')) return auth.slice(7);

  const cookie = req.headers.get('cookie') || '';
  const match = cookie.match(/(?:^|;\s*)access_token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export function extractRefreshToken(req: Request): string | null {
  const cookie = req.headers.get('cookie') || '';
  const match = cookie.match(/(?:^|;\s*)refresh_token=([^;]+)/);
  if (match) return decodeURIComponent(match[1]);
  return null;
}

export { ACCESS_TTL, REFRESH_TTL };

import { NextRequest, NextResponse } from 'next/server';
import { revokeRefreshToken, revokeAllRefreshTokensForUser } from '@/lib/auth/tokenStore';
import { verifyJWT, extractRefreshToken, extractToken } from '@/lib/auth/jwt';
import { blacklistToken } from '@/lib/auth/tokenStore';

/**
 * POST /api/auth/logout
 * Blacklists access + refresh tokens so they cannot be reused.
 */
export async function POST(req: NextRequest) {
  try {
    let all = false;
    try {
      const body = await req.json();
      all = !!body.all;
    } catch {}

    const accessToken = extractToken(req);
    const refreshToken = extractRefreshToken(req);

    // Blacklist current access token
    if (accessToken) {
      const payload = await verifyJWT(accessToken);
      if (payload?.jti) {
        await blacklistToken(payload.jti, payload.exp, 'logout', payload.sub);
        if (all && payload.sub) {
          await revokeAllRefreshTokensForUser(payload.sub);
        }
      }
    }

    // Blacklist + revoke current refresh token
    if (refreshToken) {
      const payload = await verifyJWT(refreshToken);
      if (payload?.jti) {
        await blacklistToken(payload.jti, payload.exp, 'logout', payload.sub);
        if (all && payload.sub) {
          await revokeAllRefreshTokensForUser(payload.sub);
        } else {
          await revokeRefreshToken(payload.jti);
        }
      }
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set('access_token', '', { httpOnly: true, path: '/', maxAge: 0 });
    response.cookies.set('refresh_token', '', { httpOnly: true, path: '/', maxAge: 0 });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    const response = NextResponse.json({ success: true });
    response.cookies.set('access_token', '', { httpOnly: true, path: '/', maxAge: 0 });
    response.cookies.set('refresh_token', '', { httpOnly: true, path: '/', maxAge: 0 });
    return response;
  }
}

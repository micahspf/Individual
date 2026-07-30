import { NextRequest, NextResponse } from 'next/server';
import {
  findUserByEmail,
  isRefreshTokenValid,
  rotateRefreshToken,
  generateJti,
  blacklistToken,
} from '@/lib/auth/tokenStore';
import {
  verifyJWT,
  signAccessToken,
  signRefreshToken,
  extractRefreshToken,
  REFRESH_TTL,
} from '@/lib/auth/jwt';

/**
 * POST /api/auth/refresh
 * Atomically rotates refresh token (Lua script when Redis is enabled).
 */
export async function POST(req: NextRequest) {
  try {
    let refreshToken = extractRefreshToken(req);

    if (!refreshToken) {
      try {
        const body = await req.json();
        refreshToken = body.refreshToken || null;
      } catch {}
    }

    if (!refreshToken) {
      return NextResponse.json({ error: 'Refresh token required' }, { status: 401 });
    }

    const payload = await verifyJWT(refreshToken);
    if (!payload || payload.type !== 'refresh' || !payload.jti) {
      return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
    }

    if (!(await isRefreshTokenValid(payload.jti, payload.sub))) {
      return NextResponse.json(
        { error: 'Refresh token revoked or expired' },
        { status: 401 }
      );
    }

    const user = findUserByEmail(payload.sub);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    // Blacklist old refresh token
    await blacklistToken(payload.jti, payload.exp, 'rotation', payload.sub);

    const accessJti = generateJti();
    const refreshJti = generateJti();
    const expiresAtMs = Date.now() + REFRESH_TTL * 1000;

    // Atomic rotate in Redis (or memory fallback)
    const rotated = await rotateRefreshToken(
      payload.jti,
      refreshJti,
      user.email,
      expiresAtMs
    );

    if (!rotated) {
      return NextResponse.json(
        { error: 'Refresh token already used or invalid' },
        { status: 401 }
      );
    }

    const accessToken = await signAccessToken({
      sub: user.email,
      name: user.name,
      isFounder: user.isFounder,
      jti: accessJti,
    });
    const newRefreshToken = await signRefreshToken({
      sub: user.email,
      name: user.name,
      isFounder: user.isFounder,
      jti: refreshJti,
    });

    const response = NextResponse.json({
      success: true,
      accessToken,
      refreshToken: newRefreshToken,
      expiresIn: 15 * 60,
    });

    response.cookies.set('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 15 * 60,
    });

    response.cookies.set('refresh_token', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: REFRESH_TTL,
    });

    return response;
  } catch (error) {
    console.error('Refresh error:', error);
    return NextResponse.json({ error: 'Token refresh failed' }, { status: 500 });
  }
}

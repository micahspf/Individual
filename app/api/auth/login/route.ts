import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, verifyPassword, storeRefreshToken, generateJti } from '@/lib/auth/tokenStore';
import { signAccessToken, signRefreshToken, REFRESH_TTL } from '@/lib/auth/jwt';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body.email || '').toLowerCase().trim();
    const password = body.password || '';

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = findUserByEmail(email);
    if (!user || !verifyPassword(email, password)) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const accessJti = generateJti();
    const refreshJti = generateJti();

    const accessToken = await signAccessToken({
      sub: user.email,
      name: user.name,
      isFounder: user.isFounder,
      jti: accessJti,
    });
    const refreshToken = await signRefreshToken({
      sub: user.email,
      name: user.name,
      isFounder: user.isFounder,
      jti: refreshJti,
    });

    await storeRefreshToken(refreshJti, user.email, Date.now() + REFRESH_TTL * 1000);

    const response = NextResponse.json({
      success: true,
      accessToken,
      refreshToken,
      expiresIn: 15 * 60,
      user: {
        email: user.email,
        name: user.name,
        isFounder: user.isFounder,
      },
    });

    response.cookies.set('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 15 * 60,
    });

    response.cookies.set('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: REFRESH_TTL,
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}

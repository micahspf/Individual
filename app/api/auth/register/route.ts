import { NextRequest, NextResponse } from 'next/server';
import {
  createUser,
  findUserByEmail,
  storeRefreshToken,
  generateJti,
} from '@/lib/auth/tokenStore';
import { signAccessToken, signRefreshToken, REFRESH_TTL } from '@/lib/auth/jwt';
import { awardWelcomeBonus } from '@/lib/rewards/engine';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body.email || '').toLowerCase().trim();
    const password = body.password || '';
    const name = body.name?.trim() || undefined;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }
    if (!password || password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }
    if (findUserByEmail(email)) {
      return NextResponse.json({ error: 'Account already exists' }, { status: 409 });
    }

    const user = createUser(email, password, name);

    try {
      awardWelcomeBonus(email);
    } catch {}

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
      welcomeTokens: 20,
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
    console.error('Register error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Registration failed' },
      { status: 500 }
    );
  }
}

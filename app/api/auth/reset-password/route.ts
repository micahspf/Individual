import { NextRequest, NextResponse } from 'next/server';
import { consumeResetToken, updatePassword, revokeAllRefreshTokensForUser } from '@/lib/auth/tokenStore';
import { blacklistToken } from '@/lib/auth/tokenStore';

/**
 * POST /api/auth/reset-password
 * Body: { token: string, password: string }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, password } = body;

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }

    if (!password || typeof password !== 'string' || password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    const email = consumeResetToken(token);

    if (!email) {
      return NextResponse.json(
        { error: 'This reset link is invalid or has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    const ok = updatePassword(email, password);

    if (!ok) {
      return NextResponse.json({ error: 'Unable to update password' }, { status: 500 });
    }

    // Invalidate all existing sessions for this user
    await revokeAllRefreshTokensForUser(email);

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully. Please sign in again.',
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

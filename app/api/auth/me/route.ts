import { NextRequest, NextResponse } from 'next/server';
import { extractToken, verifyJWT } from '@/lib/auth/jwt';
import { findUserByEmail } from '@/lib/auth/store';
import { getRewards } from '@/lib/rewards/engine';

/**
 * GET /api/auth/me
 * Returns current user from JWT
 */
export async function GET(req: NextRequest) {
  try {
    const token = extractToken(req);
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const payload = await verifyJWT(token);
    if (!payload || payload.type !== 'access') {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }

    const user = findUserByEmail(payload.sub);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    const rewards = getRewards(user.email);

    return NextResponse.json({
      user: {
        email: user.email,
        name: user.name,
        isFounder: user.isFounder,
      },
      rewards: {
        tokens: rewards.tokens,
        streak: rewards.streak,
        lastCheckIn: rewards.lastCheckIn,
        lifetimeSpent: rewards.lifetimeSpent,
      },
    });
  } catch (error) {
    console.error('Me error:', error);
    return NextResponse.json({ error: 'Failed to load user' }, { status: 500 });
  }
}

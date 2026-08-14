import { NextRequest, NextResponse } from 'next/server';
import { createResetToken, findUserByEmail } from '@/lib/auth/store';
import { sendPasswordResetEmail } from '@/lib/auth/email';

/**
 * POST /api/auth/forgot-password
 * Body: { email: string }
 *
 * Always returns success to the client (prevents email enumeration).
 * Only actually sends mail if the account exists.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = (body.email || '').toLowerCase().trim();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ success: true }); // still generic
    }

    const user = findUserByEmail(email);

    if (user) {
      const token = createResetToken(email);
      const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${token}`;

      // Fire-and-forget email (safe if Resend not configured)
      try {
        await sendPasswordResetEmail(email, resetUrl, user.name);
      } catch {
        console.log('Password reset email skipped (email service not ready)');
      }
    }

    // Always return the same response
    return NextResponse.json({
      success: true,
      message: 'If an account exists, a reset link has been sent.',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ success: true }); // never leak
  }
}

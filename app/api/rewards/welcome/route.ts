import { NextRequest, NextResponse } from 'next/server';
import { awardWelcomeBonus } from '@/lib/rewards/engine';
import { WELCOME_BONUS } from '@/lib/rewards/constants';
import { buildWelcomeEmail } from '@/lib/rewards/welcome-email';
import { notifyFounder } from '@/lib/email';

/**
 * POST /api/rewards/welcome
 * Call this right after a successful user registration.
 * Body: { email: string, name?: string }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Award +20 tokens (only once per email)
    const profile = awardWelcomeBonus(email);

    // Build personal welcome email from Micah
    const { subject, html, text } = buildWelcomeEmail(name || null, WELCOME_BONUS);

    // Send welcome email to the customer
    // (Uses the existing email helper – safe if Resend key is missing)
    try {
      const { sendEmail } = await import('@/lib/email');
      await sendEmail({
        to: email,
        subject,
        html,
      });
    } catch (e) {
      console.log('Welcome email skipped (email service not configured)');
    }

    // Optional: notify founder of new signup
    try {
      await notifyFounder(
        'New account + welcome tokens',
        `New user: ${name || 'Unknown'} <${email}>\nTokens awarded: ${WELCOME_BONUS}\nFounder status: ${profile.isFounder}`
      );
    } catch (e) {
      // silent
    }

    return NextResponse.json({
      success: true,
      tokens: profile.tokens,
      isFounder: profile.isFounder,
      message: 'Welcome bonus awarded and email queued',
    });
  } catch (error) {
    console.error('Welcome rewards error:', error);
    return NextResponse.json({ error: 'Failed to process welcome bonus' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { notifyFounder } from '@/lib/email';

/**
 * POST /api/request
 * Commission and AI project requests from the site request form.
 * Body: { email: string, message: string, name?: string, requestType?: string }
 */

const REQUEST_TYPES: Record<string, string> = {
  product: 'Personalized product',
  ai: 'AI tool or automation',
  unsure: 'Not sure yet',
};

const MAX_NAME = 120;
const MAX_EMAIL = 200;
const MAX_MESSAGE = 5000;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, message, name, requestType } = body ?? {};

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
    }
    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Tell us what you need' }, { status: 400 });
    }
    if (email.length > MAX_EMAIL || message.length > MAX_MESSAGE) {
      return NextResponse.json({ error: 'Request is too long' }, { status: 400 });
    }

    const typeLabel = REQUEST_TYPES[requestType] ?? REQUEST_TYPES.unsure;
    const cleanName =
      typeof name === 'string' && name.trim() ? name.trim().slice(0, MAX_NAME) : 'Not given';

    // Founder gets the request type in the subject so it triages at a glance
    const result = await notifyFounder(
      `Request — ${typeLabel}`,
      [
        `Type:  ${typeLabel}`,
        `Name:  ${cleanName}`,
        `Email: ${email.trim()}`,
        '',
        message.trim(),
      ].join('\n')
    );

    // Without a key the helper only logs. Fine locally, a lost lead in production.
    if (!result.success) {
      if (process.env.NODE_ENV === 'production') {
        console.error('Request notification failed — lead not delivered:', email);
        return NextResponse.json(
          { error: 'We could not send that. Please email madebyindividual@gmail.com.' },
          { status: 502 }
        );
      }
      console.log('Request captured (email not configured in dev):', { email, typeLabel });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Request route error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

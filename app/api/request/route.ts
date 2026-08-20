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

/** Same numbers shown in the footer and on /contact. */
const CONTACT_PHONE = '256-590-6534';
const CONTACT_EMAIL = 'madebyindividual@gmail.com';

/**
 * A mailto the visitor can send themselves, pre-filled with what they typed.
 * Used only when delivery fails — better than asking them to retype it.
 */
function fallbackMailto(typeLabel: string, name: string, message: string) {
  const subject = `Request — ${typeLabel}`;
  const body = [`Name: ${name}`, '', message].join('\n');
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

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
      // Log the whole request, not just the address — this is the only copy left,
      // and a lead nobody can read is the same as a lead nobody received.
      console.error(
        'Request notification failed — lead not delivered. Full request follows:',
        JSON.stringify({
          type: typeLabel,
          name: cleanName,
          email: email.trim(),
          message: message.trim(),
          at: new Date().toISOString(),
        })
      );

      if (process.env.NODE_ENV === 'production') {
        // Still a 502 — nothing here pretends the send worked — but the visitor
        // leaves with two routes that do not depend on our email working.
        return NextResponse.json(
          {
            error: 'That did not send. Here are two ways to reach me directly.',
            fallback: {
              phone: CONTACT_PHONE,
              email: CONTACT_EMAIL,
              mailto: fallbackMailto(typeLabel, cleanName, message.trim()),
            },
          },
          { status: 502 }
        );
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Request route error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { notifyFounder } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!email || !message) {
      return NextResponse.json(
        { error: 'Email and message are required' },
        { status: 400 }
      );
    }

    const structuredSummary = `Structured Request Summary
• Product: (from message)
• Size: (if mentioned)
• Material: (if mentioned)
• Color: (if mentioned)
• Quantity: 1
• Special features: (if any)
• Deadline: None
• Missing info: None`;

    // Notify founder (safe even without Resend)
    try {
      await notifyFounder(
        'New Customer Request',
        `From: ${name || 'Anonymous'} <${email}>\n\nMessage:\n${message}\n\n---\n${structuredSummary}`
      );
    } catch (e) {
      console.log('Founder notification skipped');
    }

    const reply = `Thanks${name ? `, ${name}` : ''}!

We received your request and will review it shortly.

You’ll get a quote from us soon.

— Micah
Individual`;

    return NextResponse.json({
      success: true,
      reply,
      summary: structuredSummary,
    });
  } catch (error) {
    console.error('Request agent error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

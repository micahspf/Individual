export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  // Safe when Resend is not installed or key is missing
  if (!process.env.RESEND_API_KEY) {
    console.log('Email skipped (no RESEND_API_KEY):', { to, subject });
    return { success: false, error: 'No API key' };
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    const data = await resend.emails.send({
      from: 'Individual <onboarding@resend.dev>',
      to,
      subject,
      html,
    });

    return { success: true, data };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error };
  }
}

export async function notifyFounder(subject: string, body: string) {
  const founderEmail = process.env.FOUNDER_EMAIL || 'founder@madebyindividual.com';
  return sendEmail({
    to: founderEmail,
    subject: `[Individual] ${subject}`,
    html: `<pre style="font-family: system-ui; white-space: pre-wrap;">${body}</pre>`,
  });
}

/**
 * Password reset email
 * Uses the same safe pattern as the welcome email.
 */

export async function sendPasswordResetEmail(
  to: string,
  resetUrl: string,
  name?: string | null
) {
  const displayName = name?.trim() || 'there';

  const subject = 'Reset your Individual password';

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0a; color: #f5f5f5; margin: 0; padding: 0; }
    .wrapper { max-width: 520px; margin: 0 auto; padding: 40px 24px; }
    .card { background: #111; border: 1px solid #222; border-radius: 16px; padding: 32px; }
    h1 { font-size: 22px; margin: 0 0 12px; color: #fff; }
    p { line-height: 1.6; color: #a3a3a3; margin: 12px 0; }
    .btn { display: inline-block; background: #ec4899; color: white; text-decoration: none; padding: 12px 28px; border-radius: 999px; font-weight: 600; margin: 20px 0; }
    .footer { margin-top: 28px; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <h1>Reset your password</h1>
      <p>Hey ${displayName},</p>
      <p>We received a request to reset the password for your Made by Individual account.</p>
      <p style="text-align:center;">
        <a href="${resetUrl}" class="btn">Set new password</a>
      </p>
      <p>This link expires in <strong>1 hour</strong>. If you didn’t ask for this, you can safely ignore the email.</p>
      <p>— Micah<br><span style="color:#666;">Founder, Individual</span></p>
      <div class="footer">
        If the button doesn’t work, copy and paste this link:<br>
        ${resetUrl}
      </div>
    </div>
  </div>
</body>
</html>
`;

  // Try to use the project email helper if it exists
  try {
    const { sendEmail } = await import('@/lib/email');
    await sendEmail({ to, subject, html });
  } catch {
    // Fallback: log for development
    console.log('--- PASSWORD RESET EMAIL (dev) ---');
    console.log('To:', to);
    console.log('Link:', resetUrl);
    console.log('----------------------------------');
  }
}

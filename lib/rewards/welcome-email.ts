/**
 * Personal welcome email from Micah
 * Call this right after awardWelcomeBonus()
 */

export function buildWelcomeEmail(name: string | null, tokens: number) {
  const displayName = name?.trim() || 'friend';

  const subject = `Welcome to Individual — you just got ${tokens} tokens`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0a; color: #f5f5f5; margin: 0; padding: 0; }
    .wrapper { max-width: 560px; margin: 0 auto; padding: 40px 24px; }
    .card { background: #111; border: 1px solid #222; border-radius: 16px; padding: 32px; }
    h1 { font-size: 24px; margin: 0 0 8px; color: #fff; }
    .pink { color: #f472b6; }
    .yellow { color: #facc15; }
    p { line-height: 1.6; color: #a3a3a3; margin: 16px 0; }
    .tokens { background: #1a1a1a; border: 1px solid #f472b6; border-radius: 12px; padding: 16px 20px; margin: 24px 0; text-align: center; }
    .tokens strong { font-size: 28px; color: #facc15; }
    .btn { display: inline-block; background: #ec4899; color: white; text-decoration: none; padding: 12px 28px; border-radius: 999px; font-weight: 600; margin-top: 8px; }
    .footer { margin-top: 32px; font-size: 13px; color: #666; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <h1>Hey ${displayName},</h1>
      
      <p>Micah here — founder of <span class="pink">Individual</span>.</p>
      
      <p>I just wanted to personally welcome you. This isn’t a big company. It’s me building custom products one at a time, with zero waste.</p>
      
      <div class="tokens">
        <div style="color:#a3a3a3; font-size:13px; margin-bottom:4px;">Your welcome gift</div>
        <strong>+${tokens} Individual Tokens</strong>
      </div>
      
      <p>You can use tokens on exclusive drops, Founders items, Nova editions, and one-time releases that never come back.</p>
      
      <p style="text-align:center;">
        <a href="https://www.madebyindividual.com/shop" class="btn">Start exploring →</a>
      </p>
      
      <p>If you ever need anything, just reply to this email. I read every one.</p>
      
      <p>— Micah<br>
      <span style="color:#666;">Founder, Individual</span></p>
      
      <div class="footer">
        You’re receiving this because you created an account at madebyindividual.com
      </div>
    </div>
  </div>
</body>
</html>
`;

  const text = `
Hey ${displayName},

Micah here — founder of Individual.

I just wanted to personally welcome you. This isn’t a big company. It’s me building custom products one at a time, with zero waste.

Your welcome gift: +${tokens} Individual Tokens

You can use tokens on exclusive drops, Founders items, Nova editions, and one-time releases that never come back.

Start exploring: https://www.madebyindividual.com/shop

If you ever need anything, just reply to this email. I read every one.

— Micah
Founder, Individual
`;

  return { subject, html, text };
}

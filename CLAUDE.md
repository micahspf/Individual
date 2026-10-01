# Working with Micah on this repo

## Standing instruction — always ask next-step questions

**Never end a turn without asking what to do next.** After finishing any piece of
work, ask about next steps or options — every time, not only when something is
ambiguous. Use the structured question tool so the choices are clickable, and put a
recommendation first when there is a sensible default.

This overrides rule 2 of [`docs/OPERATING_STYLE.md`](docs/OPERATING_STYLE.md) ("Do not
offer options unless asked"). That rule still applies to *mid-task* chatter — don't
narrate alternatives while working — but the end of a turn always offers next steps.

## Show work before shipping

Site changes get a rendered preview (screenshot) for accept/deny **before** deploying,
not after. This has caught real problems more than once.

## Deploy flow

Work on the assigned `claude/*` branch, then merge to `main` — Vercel deploys `main`
only. Always verify the change is actually live afterwards, and check the CSS file for
CSS-variable changes rather than grepping the HTML for them.

## Verify by measuring, not by eye

Contrast, page counts, link integrity, and price consistency are all checked
programmatically in this repo. A WCAG audit script pattern already exists and caught
brand yellow at 2.36:1 when it looked fine in a screenshot.

## Business context

Two lines, both run by one person in Cullman, Alabama:

- **Custom manufacturing** — laser engraving and 3D printing, commissions only right
  now. The shop catalog is paused; the 29 product pages are portfolio, not for sale.
- **AI systems** — for local businesses *or* individuals. $75 one-off, $150–$1,250/month.
  Priced deliberately for the Cullman market, which is below national rates.

Public contact is **256-590-6534** and **madebyindividual@gmail.com**. Never put the
personal address (`micahspf@`) in committed files. `founder@madebyindividual.com` is
dead — do not reintroduce it.

## Check the checkout before reading code

GitHub's **default branch is `Individual`, frozen at `527f43f`** (Aug 2026) — Vercel
deploys `main`. Fresh cloud sessions can clone that stale commit, which is 100+ files
behind. This has produced a false bug report before. Before reviewing or editing, run
`git log --oneline -1` and confirm recent work is present (e.g. `app/ai/page.tsx`
exists). If not: `git fetch origin && git checkout -B <claude-branch> origin/main`.
Remove this note once Micah switches the default branch to `main`.

## Accounts are off — do not re-enable

The login/register/account system was taken offline: plain-text passwords, an
in-memory store that serverless wipes, and a JWT fallback secret readable in this
public repo. `/login`, `/register`, `/forgot-password`, `/reset-password` redirect to
`/account`. `lib/auth/` is kept for reference only. Bring accounts back on a hosted
auth provider and a real database, with the shop.

## Email delivery

`RESEND_API_KEY` was set in Vercel Production on 2026-10-01 (Resend sandbox, sender
`onboarding@resend.dev`). A test enquiry through the live form returned 200 and Vercel
logged no rejection, and Micah confirmed it landed in the madebyindividual@gmail.com
inbox (not spam) — delivery is verified end to end. `lib/email.ts` treats Resend's *returned* errors as failures —
the SDK does not throw on a rejected send — so a 200 from `/api/request` now really
means Resend accepted it.

- The sandbox only delivers to the Resend account's own signup address. Founder
  notifications are fine; customer-facing email (order confirmations, when the shop
  reopens) needs the domain verified in Resend first.
- The Gmail connector available to Claude sessions is **not** the business inbox, so
  Claude cannot confirm arrival — ask Micah to check madebyindividual@gmail.com,
  including spam.
- Vercel Hobby keeps runtime logs for **1 hour**. If a send fails, the visitor sees the
  phone/email fallback; the logged enquiry is gone after an hour.

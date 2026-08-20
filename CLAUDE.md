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

## Known outstanding issue

`RESEND_API_KEY` is not set in Vercel, so commission form enquiries never reach the
inbox. The route logs the full enquiry and shows the visitor a phone/email fallback, so
nothing is lost, but this is unresolved until Micah sets it.

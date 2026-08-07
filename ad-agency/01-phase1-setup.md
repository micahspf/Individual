# Phase 1 — Setup (Days 1–3)

Goal: be able to take money and deliver work. Nothing here is optional, nothing here
is more than an hour.

**Rule: do not let paperwork block outreach.** Items 1, 2, 6, 7, 8 are required before
you talk to anyone. Items 4 and 5 can finish while Phase 3 is already running.

---

## Day 1

### 1. Business Google account — 5 min, $0
Create a clean Google account for the business. Not your personal one.

**Done when:** you're logged in and it's not tied to anything personal.

### 2. Google Ads Manager (MCC) — 15 min, $0
`ads.google.com/home/tools/manager-accounts` → Create a manager account → "Manage other
people's accounts."

**Done when:** the manager dashboard loads, the client list is empty, and **no payment
method exists on the account.** You never pay for a client's clicks. If you ever front
ad spend, you have become a lender, not an agency.

### 3. Business email that isn't Gmail-looking — 15 min, ~$7/mo
Google Workspace on a domain you own. `yourname@youragency.com`.

Cold email from `@gmail.com` gets deleted. This is the cheapest deliverability fix
available.

**Done when:** you can send and receive from the custom domain.

> ⚠️ Send fewer than 20 cold emails/day from a brand-new domain for the first two
> weeks. New domains that blast get filtered permanently. The daily minimum of 10–20 is
> exactly the right pace — do not exceed it thinking more is better.

### 4. Payment collection — 20 min
Stripe invoicing is enough. No subscriptions plumbing, no portal, no checkout page —
you send an invoice, they pay it.

There's an existing Stripe setup documented in
[`../docs/STRIPE-GOING-LIVE.md`](../docs/STRIPE-GOING-LIVE.md). Reuse that account if
it's already verified; a separate business entity later can get its own.

**Done when:** you have sent yourself a $1 test invoice and paid it.

### 5. Business basics — 30 min, can finish during Phase 3
- Sole proprietor is fine to start. An LLC is better before client #2.
- Business bank account — keeps client money separate from personal.
- Alabama business privilege license if required for your county.

**Done when:** money from a client can land somewhere that isn't your personal checking.
**Do not wait on this to start outreach.**

---

## Day 2

### 6. One-pager — 60 min
Build from the section list in [`05-one-pager.md`](05-one-pager.md). Notion published
page or Carrd. No CMS, no funnel builder, no WordPress.

**Done when:** it loads at a public URL, reads correctly on a phone, and the offer
sentence is the first thing visible.

### 7. Client agreement — 45 min
Build from [`06-agreement.md`](06-agreement.md). Export to PDF. Use a free e-sign tool
or accept a typed signature and a reply email.

**Done when:** a signable PDF exists on your drive and you have read it end to end
once.

### 8. Reporting sheet — 20 min
Import [`templates/client-report.csv`](templates/client-report.csv) into Google Sheets.
Structure and weekly note format are in [`07-reporting.md`](07-reporting.md).

**Done when:** the sheet exists with the right columns and one dummy row.

---

## Day 3

### 9. Prospect tracker — 10 min
Import [`templates/prospect-tracker.csv`](templates/prospect-tracker.csv).

**Done when:** the sheet exists and is bookmarked.

### 10. Keyword Planner reality check — 30 min
Inside the MCC → Tools → Keyword Planner. Set location to **Huntsville, AL + 35 mi**.
Pull volume and top-of-page bid ranges for:

```
ac repair huntsville
emergency ac repair
air conditioner not cooling
hvac replacement huntsville
furnace repair madison al
heat pump replacement
ac installation cost
```

Write the real numbers into `00-offer.md`, replacing the planning assumptions.
Screenshot the results — this becomes proof material for outreach.

**Done when:** you can state, from your own screenshot, what a click actually costs in
this metro and roughly how many searches per month exist.

### 11. Calendar link — 5 min
Free Calendly or Google Appointment Schedule. 30-minute slots, business hours only.

**Done when:** you can book yourself a test slot.

> Do not put this link in a first-touch cold email. It reads as a demand before you've
> earned attention. It goes in touch 2 and later, or after a reply.

---

## Phase 1 is done when all six are true

- [ ] MCC exists, empty, with no card on file
- [ ] Custom-domain email sends and receives
- [ ] One-pager is live at a URL that works on a phone
- [ ] Agreement PDF exists and is signable
- [ ] Reporting sheet + prospect tracker exist
- [ ] Real Huntsville CPC numbers are recorded and screenshotted

**Then go to [`04-mini-audit.md`](04-mini-audit.md) — Phase 2 is proof, and it's free.**

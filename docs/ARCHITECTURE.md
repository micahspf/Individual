# Made by Individual — Architecture

**Status:** One Next.js app. Shop-first launch. No second backend.

## Stack

| Layer | Choice |
|--------|--------|
| Frontend + API | Next.js App Router (TypeScript) |
| Styling | Tailwind + glass utilities (`app/globals.css`) |
| Hosting | Vercel → `www.madebyindividual.com` |
| Auth | JWT access + refresh (`lib/auth/`) |
| Cart / orders (demo) | Browser localStorage until Postgres is wired |
| Rewards | **Paused** — code kept under `lib/rewards/` until balances use a DB |

## Design principles

1. **Low decision load** — shop catalog + one custom request form.
2. **Made to order** — no inventory, no fake scarcity counters.
3. **Honest turnaround** — catalog default **7–10 days**.
4. **One language, one deploy** — no parallel Python/FastAPI backend.
5. **Human approval for quotes** — request form does not invent prices.

## Core flows

```
Visitor → Shop product → Cart → Checkout (guest OK) → Order id
Visitor → Custom request form → Founder email / quote later
Visitor → Account (optional) → Track order by email + order id
```

## What was deliberately cut at launch

| Cut | Why |
|-----|-----|
| Spin wheel | Paid chance mechanic; legal/brand risk for a new local maker |
| Live rewards UI | In-memory balances reset on serverless cold starts |
| Hardcoded `remainingQuantity` | Fake scarcity is deceptive without order decrements |
| Python infrastructure archive | Duplicates Next.js API routes; two stacks = unaffordable part-time |

## Repo layout

```
app/           routes + API
components/    UI (shop, cart, request form)
lib/data/      products catalog ★ source of truth for shop content
lib/auth/      JWT + optional Redis
lib/rewards/   parked until Postgres (do not re-enable UI without storage)
docs/          architecture + ops notes
```

## Next real work (after customers)

1. Wire cart/orders/auth users to Postgres (Neon).
2. Real product photos.
3. Resend + `founder@madebyindividual.com` mailbox.
4. Then decide if tokens/rewards are worth building with durable storage.

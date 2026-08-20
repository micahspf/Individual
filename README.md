# Made by Individual

Custom 3D print & laser engraving · Cullman, Alabama  
Live site: [www.madebyindividual.com](https://www.madebyindividual.com)

**One repo. One shop. No archive variants.**

## Catalog (cash products)

| Product | Price | Turnaround |
|---------|-------|------------|
| Personalized Tumbler | $32 | 7–10 days |
| Personalized Can Cooler | $28 | 7–10 days |
| Custom Wood Sign | $45 | 7–10 days |
| Smith Lake Sign | $38 | 7–10 days |
| Flexi Animal Multipack 12 | $18 | 7–10 days |
| Flexi Animal Multipack 25 | $24 | 7–10 days |
| Pet ID Tag | $16 | 7–10 days |
| Fidget Slider (13+) | $12 | 7–10 days |
| Fidget Board (13+) | $18 | 7–10 days |

Token exclusives exist in `lib/data/products.ts` but are **hidden** until rewards has a real database.

## Local run

```powershell
cd Individual
npm install
npm run dev
```

Open http://localhost:3000

## Launch posture (from archive audit)

- **Ship the shop** — cart, checkout, track order, custom request.
- **No spin wheel** — removed (paid chance mechanic).
- **Rewards UI paused** — `/rewards` is a coming-soon page; code kept under `lib/rewards/`.
- **No fake scarcity** — no hardcoded “X left” without order-backed counters.
- **Public contact** — `madebyindividual@gmail.com` and `256-590-6534`. Never the
  personal address (`micahspf@`) in committed files.

See `docs/ARCHITECTURE.md`.

## Env

Copy `.env.local.example` → `.env.local`. Never commit real secrets.

## Next

1. Real product photos  
2. Postgres for orders/auth  
3. LLC / filings (keep Wednesday)  
4. ~20 real orders before reopening rewards  

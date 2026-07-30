# Made by Individual — Strategy-Aligned Website

Built from the July 30, 2026 Website, Market, and Product Strategy Report.

## What’s included

### Shop (populated)
- Personalized Tumbler ($32) — lead product
- Personalized Can Cooler ($28)
- Custom Wood Sign ($45)
- Smith Lake Sign ($38)
- Flexi Animal Multipack 12pc ($18)
- Flexi Animal Multipack 25pc ($24)
- Pet ID Tag ($16)
- Fidget Slider ($12) — ages 13+
- Fidget Board ($18) — ages 13+
- Founders Name Plate (tokens only)
- Nova Desk Piece (tokens only)

### Categories (updated per strategy)
- All
- 3D Printed
- Fidget & Sensory (renamed from Viral Toys)
- Drinkware
- Home
- Custom Request

### Pages added
- `/` — Homepage (no fake 4.9★ rating; local Cullman messaging)
- `/shop` — Full catalog + filters
- `/about` — Local maker story
- `/contact` — Cullman location + email
- `/faq` — Materials, turnaround, collegiate policy, ages
- `/shipping` — Turnaround + local pickup
- `/returns` — Made-to-order return policy

### SEO / Trust
- Title and meta include “Cullman, Alabama”
- LocalBusiness schema
- Honest trust bar (no fabricated ratings)

## PowerShell quick start

```powershell
# Unzip, then:
cd individual-strategy
npm install
npm run dev
```

Open http://localhost:3000

## Next steps from the strategy report
1. Replace emoji placeholders with your real product photos
2. Wire the Request form to email / Request Agent
3. Claim Google Business Profile
4. Add real reviews only when you have them
5. Keep collegiate marks off the site unless licensed

## Redis (production auth)

Token blacklist + refresh tokens can run on Redis for multi-server deploys.

```bash
npm install ioredis
```

```env
REDIS_URL=redis://localhost:6379
```

If `REDIS_URL` is missing, the app automatically uses the in-memory store.

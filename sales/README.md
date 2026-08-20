# Sales — AI systems offer

Everything for selling AI systems to local businesses. One offer, one market.

| Decision | Value |
|---|---|
| Offer | Custom AI tools, automations, and business systems |
| Market | Cullman, AL + 20 miles |
| Client cap | 4–6 at once |

## Pricing

| | Price |
|---|---|
| One task, one time | from **$75** |
| Essentials | **$150** / month |
| Starter | **$300** / month |
| Growth | **$700** / month |
| Full Custom | **$1,250** / month |
| Setup (monthly plans) | **$250–$500** one time |

Priced for this market specifically — Cullman's median household income is $61,224 and
falling, and 80%+ of Alabama small businesses are non-employer firms. The same numbers
would undersell you in Huntsville.

These prices appear in four places and must stay in sync:
`app/ai/page.tsx` · `app/page.tsx` · `app/faq/page.tsx` · `scripts/leave-behind/*.html`

## Files

- [`prospects-cullman.md`](prospects-cullman.md) — how to build and work the 30-name list
- [`templates/prospect-tracker.csv`](templates/prospect-tracker.csv) — the list itself
- [`templates/daily-scoreboard.csv`](templates/daily-scoreboard.csv) — daily activity log
- [`templates/client-report.csv`](templates/client-report.csv) — monthly summary per client
- [`manufacturing-catalog.md`](manufacturing-catalog.md) — what custom manufacturing work
  we take, by process and material; doubles as a quoting intake checklist

Import the CSVs into Google Sheets with **File → Import → Upload**.

## Print assets

Both regenerate with `npm run leave-behind`:

- `public/ai-systems-for-local-business.pdf` — one-page leave-behind, businesses
- `public/ai-help-for-one-person.pdf` — one-page leave-behind, individuals; leads with
  the $75 one-off rather than the monthly tiers, which scare off a personal buyer
- `public/what-ai-can-do-for-your-local-business.pdf` — two-page guide, linked on `/ai`

Sources are plain HTML in `scripts/leave-behind/` — edit the copy directly.

## Contact on everything

**256-590-6534** · **madebyindividual@gmail.com** · madebyindividual.com/ai

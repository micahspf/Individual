---
name: ship
description: Pre-deploy checks for madebyindividual.com. Use before any production deploy or when the user says /ship.
---

# Before deploying

1. `next build` — confirm content pages are static (○), products SSG (●),
   only auth and checkout dynamic (ƒ)
2. No function with a 300s timeout
3. Stripe webhook: raw body, signature verified, fulfillment idempotent
4. No secrets in client bundles — grep for NEXT_PUBLIC_ on anything sensitive
5. robots.txt and sitemap.xml resolve
6. No review or aggregateRating schema anywhere
7. Lighthouse on a product page — LCP under 2.5s, CLS under 0.1
8. Every product has a real image, a real price, and a 7–10 day turnaround

Report pass/fail per line. Do not say "ready" if any line fails.

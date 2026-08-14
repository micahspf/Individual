---
name: storefront-catalog
description: Checklist for adding or changing catalog tabs, Trending picks, and For You recommendations on the Individual shop. Use when adding a product category, changing what's trending, or debugging the catalog tabs.
---

# Storefront catalog — how it works and how to change it

**When to use:** adding a catalog tab, adding products to an empty tab, changing
Trending, or debugging the /shop tabs or For You recommendations.

**Inputs the owner provides:** product name, price, category id, description, and
(optionally) a photo dropped in `raw-photos/{slug}.jpg` followed by `npm run images`.

## Where things live

| Thing | File |
|---|---|
| Tab list (labels, emoji, order) | `lib/catalog.ts` |
| Products + `trending: true` flags | `lib/data/products.ts` |
| For You logic (localStorage) | `lib/recs.ts` |
| Who is browsing (account email or guest) | `components/shop/recs-client.ts` |
| Records a product view | `components/shop/TrackView.tsx` (in `app/shop/[slug]/page.tsx`) |
| The shop page itself | `app/shop/page.tsx` |
| Homepage strip | `components/home/CatalogStrip.tsx` |

## Steps

1. **Change Trending:** edit `trending: true` flags in `lib/data/products.ts`. Nothing else.
2. **Fill an empty tab (e.g. Mystery Boxes):** add products with `category` equal to the
   tab's `category` value in `lib/catalog.ts` (e.g. `"mystery-boxes"`). The invite card
   disappears automatically once one product exists.
3. **Add a new tab:** add one entry to `catalogTabs` in `lib/catalog.ts` with a unique
   `id`, a `label`, one emoji, `kind: "category"`, and a `category` id. Done — empty
   tabs render the made-to-order invite on their own.
4. **Build and test:** `npm run build` must exit 0, then verify in a real browser
   (see mistakes below).
5. **Deploy preview:** `vercel --yes --scope rootnova`, click the tabs on the preview URL.

## Common mistakes

- **Testing in a hidden or backgrounded browser pane and concluding the site is broken.**
  React 19 reveals streamed Suspense boundaries on requestAnimationFrame; a hidden
  document gets no frames, so pages look stuck on fallbacks ("Loading shop…", skeleton
  header, inert tabs) even though nothing is wrong. Check `document.hidden` before
  diagnosing — test with a visible browser window.
- **Testing with curl only.** curl proves the server HTML, not that the page is
  interactive. Click a tab in a real visible browser and confirm the grid changes.
- **Renaming a tab `id` that old links use.** `?cat=home`, `?cat=drinkware`,
  `?cat=3d-printed`, `?cat=custom` are legacy params handled in `app/shop/page.tsx`
  (`normalizeCat`) — keep them working.
- **Expecting For You to sync across devices.** History is localStorage only, keyed to
  the account email at `individual-recs:<email-or-guest>`. Cross-device needs a real
  database — a separate project, not a tweak.
- **Adding a product without an image.** Missing `/products/{slug}.avif` logs a 404 and
  shows the placeholder. Drop the photo in `raw-photos/` and run `npm run images`.

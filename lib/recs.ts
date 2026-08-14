/**
 * On-device browsing history for the "For You" tab.
 *
 * Stored in localStorage only — nothing leaves the visitor's browser.
 * Keyed to the logged-in account email when there is one, so each account
 * on a shared device gets its own recommendations. Falls back to "guest".
 *
 * Limit (stated on the About of this feature, keep honest): history does
 * not follow an account across devices. That needs a database we don't run.
 */

import type { Product } from "@/lib/data/products";

interface RecData {
  /** category id -> tap/view count */
  cats: Record<string, number>;
  /** product id -> view count */
  views: Record<string, number>;
}

const EMPTY: RecData = { cats: {}, views: {} };
const MAX_COUNT = 500; // cap so one enthusiastic clicker can't overflow

function storageKey(who: string): string {
  return `individual-recs:${who}`;
}

function load(who: string): RecData {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(storageKey(who));
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<RecData>;
    return {
      cats: parsed.cats && typeof parsed.cats === "object" ? parsed.cats : {},
      views: parsed.views && typeof parsed.views === "object" ? parsed.views : {},
    };
  } catch {
    return EMPTY;
  }
}

function save(who: string, data: RecData): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(storageKey(who), JSON.stringify(data));
  } catch {
    // Storage full or blocked — recommendations just stay as they were.
  }
}

function bump(record: Record<string, number>, key: string): void {
  record[key] = Math.min((record[key] ?? 0) + 1, MAX_COUNT);
}

/** Call when a visitor opens a category tab. */
export function recordCategoryTap(who: string, category: string): void {
  const data = load(who);
  bump(data.cats, category);
  save(who, data);
}

/** Call when a visitor opens a product page. */
export function recordProductView(who: string, productId: string, category: string): void {
  const data = load(who);
  bump(data.views, productId);
  bump(data.cats, category);
  save(who, data);
}

/** True once the visitor has any history at all. */
export function hasHistory(who: string): boolean {
  const data = load(who);
  return Object.keys(data.cats).length > 0 || Object.keys(data.views).length > 0;
}

/**
 * Order products for the For You tab: products the visitor viewed rank
 * highest, then products from categories they browse most. Products with
 * no signal at all are excluded — the caller decides the fallback.
 */
export function forYouProducts(who: string, products: Product[]): Product[] {
  const data = load(who);
  return products
    .map((p) => ({
      p,
      score: (data.views[p.id] ?? 0) * 3 + (data.cats[p.category] ?? 0),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p);
}

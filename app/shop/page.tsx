'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { shopProducts } from '@/lib/data/products';
import { catalogTabs, findTab } from '@/lib/catalog';
import { forYouProducts, recordCategoryTap } from '@/lib/recs';
import { useRecsIdentity, resolveRecsIdentity } from '@/components/shop/recs-client';
import ProductCard from '@/components/shop/ProductCard';
import CategoryTabs from '@/components/shop/CategoryTabs';
import Link from 'next/link';
import Recommendations from '@/components/shop/Recommendations';

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name';

/** Old links use ?cat=home; the tab id is home-office now. */
function normalizeCat(raw: string): string {
  return raw === 'home' ? 'home-office' : raw;
}

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCat = normalizeCat(searchParams.get('cat') || 'all');
  const initialQ = searchParams.get('q') || '';

  const [activeTab, setActiveTab] = useState(initialCat);
  const [search, setSearch] = useState(initialQ);
  const [sort, setSort] = useState<SortOption>('newest');
  const [priceRange, setPriceRange] = useState('all');
  const who = useRecsIdentity();

  const tab = findTab(activeTab);

  function handleTabChange(id: string) {
    setActiveTab(id);
    const next = findTab(id);
    if (next?.kind === 'category') {
      resolveRecsIdentity().then((w) => recordCategoryTap(w, next.category!));
    }
  }

  /** Products belonging to the tab, before search/price/sort. */
  const baseForTab = useMemo(() => {
    if (activeTab === 'custom') return [];
    if (!tab) {
      // Legacy ?cat= values without their own tab (drinkware, 3d-printed)
      return shopProducts.filter((p) => p.category === activeTab);
    }
    if (tab.kind === 'all') return [...shopProducts];
    if (tab.id === 'trending') return shopProducts.filter((p) => p.trending);
    if (tab.id === 'for-you') return forYouProducts(who, shopProducts);
    return shopProducts.filter((p) => p.category === tab.category);
  }, [activeTab, tab, who]);

  /** Category tab with zero products → made-to-order invite. */
  const isEmptyCategory =
    tab?.kind === 'category' && !shopProducts.some((p) => p.category === tab.category);

  /** For You with no browsing history yet → friendly start + trending. */
  const forYouIsNew = tab?.id === 'for-you' && baseForTab.length === 0;

  const filtered = useMemo(() => {
    let result = [...baseForTab];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.occasions && p.occasions.some((o) => o.toLowerCase().includes(q)))
      );
    }

    if (priceRange !== 'all') {
      result = result.filter((p) => {
        const price = p.price;
        if (priceRange === '0-20') return price < 20;
        if (priceRange === '20-35') return price >= 20 && price <= 35;
        if (priceRange === '35-50') return price > 35 && price <= 50;
        if (priceRange === '50+') return price > 50;
        return true;
      });
    }

    result.sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'name') return a.name.localeCompare(b.name);
      return 0; // 'newest' keeps tab order (For You keeps its ranking)
    });

    return result;
  }, [baseForTab, search, sort, priceRange]);

  const trendingFallback = useMemo(() => shopProducts.filter((p) => p.trending), []);

  return (
    <main className="min-h-screen">
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-pink-400">
                Catalog
              </p>
              <h1 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
                Personalize & <span className="text-pink-400">order</span>
              </h1>
              <p className="mt-2 max-w-md text-zinc-400">
                Gift-ready personalization — names, monograms, dates, messages — manufactured to order in Cullman, Alabama.
              </p>
            </div>
            <Link
              href="/#request"
              className="inline-flex items-center gap-2 rounded-full bg-[#ffe14a] px-5 py-2.5 text-sm font-semibold text-black shadow-[0_0_20px_rgba(255,225,74,0.25)] transition hover:bg-[#fff08a]"
            >
              Request a commission →
            </Link>
          </div>
          <CategoryTabs active={activeTab} onChange={handleTabChange} categories={catalogTabs} />
        </div>
      </div>

      {/* Toolbar */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search the catalog…"
              aria-label="Search the catalog"
              className="input-glass-pill"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 backdrop-blur-sm focus:outline-none focus:border-pink-500/50"
          >
            <option value="newest">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name A–Z</option>
          </select>
        </div>

        <div className="mt-5 flex flex-wrap gap-2 items-center">
          <span className="text-xs text-zinc-500 uppercase tracking-wider mr-2">Price</span>
          {[
            { id: 'all', label: 'Any' },
            { id: '0-20', label: 'Under $20' },
            { id: '20-35', label: '$20–$35' },
            { id: '35-50', label: '$35–$50' },
            { id: '50+', label: '$50+' },
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => setPriceRange(r.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition ${
                priceRange === r.id
                  ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40 shadow-[0_0_16px_rgba(236,72,153,0.2)]'
                  : 'bg-white/5 text-zinc-400 border border-white/10 hover:border-pink-500/30'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <Recommendations context={activeTab} />
        </div>

        {activeTab === 'custom' ? (
          <div className="py-24 text-center">
            <h2 className="font-display mb-3 text-3xl font-medium tracking-tight">Commission</h2>
            <p className="mx-auto mb-8 max-w-md text-neutral-400">
              Specify the piece. We quote price and lead time, then manufacture only what you ordered.
            </p>
            <Link
              href="/#request"
              className="inline-flex items-center gap-2 rounded-full bg-[#ff2d8a] px-8 py-3.5 font-medium text-white transition hover:bg-[#ff4da0]"
            >
              Request a quote
            </Link>
          </div>
        ) : isEmptyCategory ? (
          <div className="mx-auto max-w-xl py-20 text-center">
            <div className="mb-5 text-5xl" aria-hidden="true">
              {tab!.icon}
            </div>
            <h2 className="font-display mb-3 text-3xl font-medium tracking-tight">
              {tab!.label} — made to order
            </h2>
            <p className="mx-auto mb-8 max-w-md leading-relaxed text-zinc-400">
              We build these one at a time, exactly how you want them. Tell us what you’re
              after and we’ll reply with a price and a timeline before anything is made.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/#request" className="btn-pill-pink px-8 py-3.5 text-sm">
                Tell us what you want
              </Link>
              <button
                onClick={() => handleTabChange('all')}
                className="rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-medium text-zinc-100 transition hover:border-[#ffe14a]/40 hover:bg-[#ffe14a]/10"
              >
                Browse everything
              </button>
            </div>
          </div>
        ) : forYouIsNew ? (
          <>
            <div className="mb-10 rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm">
              <div className="mb-2 text-3xl" aria-hidden="true">💖</div>
              <h2 className="font-display mb-2 text-2xl font-medium tracking-tight">
                This tab learns what you like
              </h2>
              <p className="mx-auto max-w-md text-sm leading-relaxed text-zinc-400">
                Tap around the catalog and your favorites collect here. Recommendations stay on
                this device{who !== 'guest' ? ', saved to your account name' : ''}. Here’s
                what’s trending to get you started:
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {trendingFallback.map((product, i) => (
                <ProductCard key={product.id} product={product} priority={i === 0} />
              ))}
            </div>
          </>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <h3 className="text-xl font-medium mb-2">No products found</h3>
            <p className="text-neutral-500 mb-6">Try adjusting filters or search.</p>
            <button
              onClick={() => {
                setSearch('');
                setPriceRange('all');
                setActiveTab('all');
              }}
              className="text-pink-400 text-sm"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-neutral-500 text-sm mb-6">
              {filtered.length} product{filtered.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} priority={i === 0} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center text-neutral-500">Loading shop…</div>}>
      <ShopContent />
    </Suspense>
  );
}

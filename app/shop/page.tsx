'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { products, categories } from '@/lib/data/products';
import ProductCard from '@/components/shop/ProductCard';
import CategoryTabs from '@/components/shop/CategoryTabs';
import Link from 'next/link';
import Recommendations from '@/components/shop/Recommendations';

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get('cat') || 'all';
  const initialQ = searchParams.get('q') || '';

  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [search, setSearch] = useState(initialQ);
  const [sort, setSort] = useState<SortOption>('newest');
  const [priceRange, setPriceRange] = useState('all');

  const filtered = useMemo(() => {
    let result = [...products];

    if (activeCategory === 'custom') return [];
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.badge && p.badge.toLowerCase().includes(q)) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (priceRange !== 'all') {
      result = result.filter((p) => {
        const price = p.isTokenOnly ? (p.tokenPrice || 0) : p.price;
        if (priceRange === '0-20') return price < 20;
        if (priceRange === '20-35') return price >= 20 && price <= 35;
        if (priceRange === '35-50') return price > 35 && price <= 50;
        if (priceRange === '50+') return price > 50;
        return true;
      });
    }

    result.sort((a, b) => {
      const pa = a.isTokenOnly ? (a.tokenPrice || 0) : a.price;
      const pb = b.isTokenOnly ? (b.tokenPrice || 0) : b.price;
      if (sort === 'price-asc') return pa - pb;
      if (sort === 'price-desc') return pb - pa;
      if (sort === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

    return result;
  }, [activeCategory, search, sort, priceRange]);

  return (
    <main className="min-h-screen">
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-pink-400 text-sm font-medium mb-2 tracking-wide">✦ SHOP</p>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Find your <span className="text-pink-400">thing</span>
              </h1>
              <p className="text-zinc-400 mt-2 max-w-md">
                Everything is made to order in Cullman, Alabama. No waste. Just yours.
              </p>
            </div>
            <Link
              href="/#request"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-yellow-400 text-black text-sm font-semibold shadow-[0_0_20px_rgba(250,204,21,0.25)] hover:bg-yellow-300 transition"
            >
              Start Custom Request →
            </Link>
          </div>
          <CategoryTabs active={activeCategory} onChange={setActiveCategory} categories={categories} />
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
              placeholder="Search products..."
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
          <Recommendations context={activeCategory} />
        </div>
        {activeCategory === 'custom' ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-6">✨</div>
            <h2 className="text-3xl font-bold mb-3">Fully Custom</h2>
            <p className="text-neutral-400 max-w-md mx-auto mb-8">
              Tell us exactly what you want. We’ll design and make only that — nothing extra.
            </p>
            <Link
              href="/#request"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-pink-500 text-white font-medium hover:bg-pink-400 transition"
            >
              Start Your Custom Request
            </Link>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <h3 className="text-xl font-medium mb-2">No products found</h3>
            <p className="text-neutral-500 mb-6">Try adjusting filters or search.</p>
            <button
              onClick={() => {
                setSearch('');
                setPriceRange('all');
                setActiveCategory('all');
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
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
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

'use client';

import { useState, useMemo } from 'react';
import CategoryTabs from '@/components/shop/CategoryTabs';
import ProductCard from '@/components/shop/ProductCard';
import Link from 'next/link';

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  badge?: string;
  slug: string;
  createdAt?: number;
}

const allProducts: Product[] = [
  { id: '1', name: 'Custom Name Plate', price: 28, category: '3d-printed', badge: 'Bestseller', slug: 'custom-name-plate', createdAt: 12 },
  { id: '2', name: 'Soft Squishy Buddy', price: 18, category: 'viral-toys', badge: 'Viral', slug: 'soft-squishy-buddy', createdAt: 11 },
  { id: '3', name: 'Bubbly Hoodie', price: 52, category: 'apparel', badge: 'New', slug: 'bubbly-hoodie', createdAt: 10 },
  { id: '4', name: 'Good Vibes Mug', price: 24, category: 'drinkware', slug: 'good-vibes-mug', createdAt: 9 },
  { id: '5', name: 'Desk Organizer Pro', price: 34, category: 'home', slug: 'desk-organizer-pro', createdAt: 8 },
  { id: '6', name: 'Mini Articulated Dragon', price: 22, category: '3d-printed', badge: 'Popular', slug: 'mini-dragon', createdAt: 7 },
  { id: '7', name: 'Stress Blob', price: 14, category: 'viral-toys', slug: 'stress-blob', createdAt: 6 },
  { id: '8', name: 'Custom Cap', price: 29, category: 'apparel', slug: 'custom-cap', createdAt: 5 },
  { id: '9', name: 'Personal Tumbler', price: 32, category: 'drinkware', badge: 'Gift Ready', slug: 'personal-tumbler', createdAt: 4 },
  { id: '10', name: 'LED Name Light', price: 45, category: 'home', badge: 'Premium', slug: 'led-name-light', createdAt: 3 },
  { id: '11', name: 'Flexi Octopus', price: 16, category: '3d-printed', slug: 'flexi-octopus', createdAt: 2 },
  { id: '12', name: 'Mystery Squish Pack', price: 27, category: 'viral-toys', badge: 'Limited', slug: 'mystery-squish', createdAt: 1 },
];

const PRICE_RANGES = [
  { id: 'all', label: 'Any price' },
  { id: '0-20', label: 'Under $20' },
  { id: '20-35', label: '$20 – $35' },
  { id: '35-50', label: '$35 – $50' },
  { id: '50+', label: '$50+' },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortOption>('newest');
  const [priceRange, setPriceRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...allProducts];

    // Category
    if (activeCategory === 'custom') return [];
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.badge && p.badge.toLowerCase().includes(q))
      );
    }

    // Price range
    if (priceRange !== 'all') {
      result = result.filter((p) => {
        if (priceRange === '0-20') return p.price < 20;
        if (priceRange === '20-35') return p.price >= 20 && p.price <= 35;
        if (priceRange === '35-50') return p.price > 35 && p.price <= 50;
        if (priceRange === '50+') return p.price > 50;
        return true;
      });
    }

    // Sort
    result.sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'name') return a.name.localeCompare(b.name);
      // newest
      return (b.createdAt || 0) - (a.createdAt || 0);
    });

    return result;
  }, [activeCategory, search, sort, priceRange]);

  const activeFilterCount =
    (search.trim() ? 1 : 0) +
    (priceRange !== 'all' ? 1 : 0) +
    (sort !== 'newest' ? 1 : 0);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-pink-400 text-sm font-medium mb-2 tracking-wide">✦ SHOP</p>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Find your <span className="text-pink-400">thing</span>
              </h1>
              <p className="text-neutral-500 mt-2 max-w-md">
                Everything is made to order. No waste. Just yours.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-yellow-400 text-black text-sm font-semibold hover:bg-yellow-300 transition"
            >
              Start Custom Request →
            </Link>
          </div>

          <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
        </div>
      </div>

      {/* Toolbar */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Search */}
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-full px-5 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/30 transition"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white text-sm"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Filter toggle (mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-800 text-sm text-neutral-400"
            >
              Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="bg-neutral-950 border border-neutral-800 rounded-full px-4 py-2 text-sm text-neutral-300 focus:outline-none focus:border-pink-500/50"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
        </div>

        {/* Advanced Filters Panel */}
        <div className={`mt-5 ${showFilters ? 'block' : 'hidden sm:block'}`}>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-neutral-600 uppercase tracking-wider mr-2">Price</span>
            {PRICE_RANGES.map((range) => (
              <button
                key={range.id}
                onClick={() => setPriceRange(range.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  priceRange === range.id
                    ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40'
                    : 'bg-neutral-900 text-neutral-500 border border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {range.label}
              </button>
            ))}

            {activeFilterCount > 0 && (
              <button
                onClick={() => {
                  setSearch('');
                  setPriceRange('all');
                  setSort('newest');
                }}
                className="ml-2 text-xs text-neutral-500 hover:text-pink-400 transition"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {activeCategory === 'custom' ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-6">✨</div>
            <h2 className="text-3xl font-bold mb-3">Fully Custom</h2>
            <p className="text-neutral-400 max-w-md mx-auto mb-8">
              Tell us exactly what you want. We’ll design and make only that — nothing extra.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-pink-500 text-white font-medium hover:bg-pink-400 transition shadow-[0_0_30px_rgba(236,72,153,0.35)]"
            >
              Start Your Custom Request
            </Link>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4 opacity-40">🔍</div>
            <h3 className="text-xl font-medium mb-2">No products found</h3>
            <p className="text-neutral-500 mb-6">Try adjusting your filters or search.</p>
            <button
              onClick={() => {
                setSearch('');
                setPriceRange('all');
                setActiveCategory('all');
              }}
              className="text-pink-400 hover:text-pink-300 text-sm"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-neutral-500 text-sm mb-6">
              {filtered.length} product{filtered.length !== 1 ? 's' : ''}
              {search && <> matching “{search}”</>}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h3 className="text-2xl font-bold mb-3">Can’t find it? We’ll make it.</h3>
          <p className="text-neutral-500 mb-6">Custom requests are our specialty.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-pink-500/50 text-pink-300 hover:bg-pink-500/10 transition"
          >
            Request something custom →
          </Link>
        </div>
      </div>
    </main>
  );
}

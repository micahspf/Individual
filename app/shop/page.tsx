"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CategoryTabs from "@/components/shop/CategoryTabs";
import ProductCard from "@/components/shop/ProductCard";
import Link from "next/link";
import { ALL_PRODUCTS } from "@/lib/products-data";

type SortOption = "newest" | "price-asc" | "price-desc" | "name";

const PRICE_RANGES = [
  { id: "all", label: "Any price" },
  { id: "0-20", label: "Under $20" },
  { id: "20-35", label: "$20 – $35" },
  { id: "35-50", label: "$35 – $50" },
  { id: "50+", label: "$50+" },
];

function ShopInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category") || "all";

  const [activeCategory, setActiveCategory] = useState(categoryFromUrl);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("newest");
  const [priceRange, setPriceRange] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Keep tabs in sync with URL (?category=apparel)
  useEffect(() => {
    setActiveCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  function handleCategoryChange(id: string) {
    setActiveCategory(id);
    const params = new URLSearchParams(searchParams.toString());
    if (id === "all") params.delete("category");
    else params.set("category", id);
    const q = params.toString();
    router.replace(q ? `/shop?${q}` : "/shop", { scroll: false });
  }

  const filtered = useMemo(() => {
    let result = [...ALL_PRODUCTS];

    if (activeCategory === "custom") return [];
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.badge && p.badge.toLowerCase().includes(q))
      );
    }

    if (priceRange !== "all") {
      result = result.filter((p) => {
        if (priceRange === "0-20") return p.price < 20;
        if (priceRange === "20-35") return p.price >= 20 && p.price <= 35;
        if (priceRange === "35-50") return p.price > 35 && p.price <= 50;
        if (priceRange === "50+") return p.price > 50;
        return true;
      });
    }

    result.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "name") return a.name.localeCompare(b.name);
      return (b.createdAt || 0) - (a.createdAt || 0);
    });

    return result;
  }, [activeCategory, search, sort, priceRange]);

  const activeFilterCount =
    (search.trim() ? 1 : 0) + (priceRange !== "all" ? 1 : 0) + (sort !== "newest" ? 1 : 0);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="border-b border-neutral-900">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-sm font-medium tracking-wide text-pink-400">✦ SHOP</p>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Find your <span className="text-pink-400">thing</span>
              </h1>
              <p className="mt-2 max-w-md text-neutral-500">
                Everything is made to order. No waste. Just yours.
              </p>
            </div>
            <Link
              href="/#request"
              className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-yellow-300"
            >
              Start custom request →
            </Link>
          </div>

          <CategoryTabs active={activeCategory} onChange={handleCategoryChange} />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-80">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-full border border-neutral-800 bg-neutral-950 px-5 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:border-pink-500/50 focus:outline-none focus:ring-1 focus:ring-pink-500/30"
              aria-label="Search products"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-neutral-500 hover:text-white"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex w-full items-center gap-3 sm:w-auto">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 rounded-full border border-neutral-800 px-4 py-2 text-sm text-neutral-400 sm:hidden"
            >
              Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="rounded-full border border-neutral-800 bg-neutral-950 px-4 py-2 text-sm text-neutral-300 focus:border-pink-500/50 focus:outline-none"
              aria-label="Sort products"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
        </div>

        <div className={`mt-5 ${showFilters ? "block" : "hidden sm:block"}`}>
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 text-xs uppercase tracking-wider text-neutral-600">Price</span>
            {PRICE_RANGES.map((range) => (
              <button
                key={range.id}
                type="button"
                onClick={() => setPriceRange(range.id)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  priceRange === range.id
                    ? "border border-pink-500/40 bg-pink-500/20 text-pink-300"
                    : "border border-neutral-800 bg-neutral-900 text-neutral-500 hover:border-neutral-700"
                }`}
              >
                {range.label}
              </button>
            ))}

            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setPriceRange("all");
                  setSort("newest");
                }}
                className="ml-2 text-xs text-neutral-500 transition hover:text-pink-400"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {activeCategory === "custom" ? (
          <div className="py-24 text-center">
            <div className="mb-6 text-6xl">✨</div>
            <h2 className="mb-3 text-3xl font-bold">Fully custom</h2>
            <p className="mx-auto mb-8 max-w-md text-neutral-400">
              Tell us exactly what you want. We’ll design and make only that — nothing extra.
            </p>
            <Link
              href="/#request"
              className="inline-flex items-center gap-2 rounded-full bg-pink-500 px-8 py-3.5 font-medium text-white transition hover:bg-pink-400 shadow-[0_0_30px_rgba(236,72,153,0.35)]"
            >
              Start your custom request
            </Link>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-24 text-center">
            <div className="mb-4 text-5xl opacity-40">🔍</div>
            <h3 className="mb-2 text-xl font-medium">No products found</h3>
            <p className="mb-6 text-neutral-500">Try adjusting your filters or search.</p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setPriceRange("all");
                handleCategoryChange("all");
              }}
              className="text-sm text-pink-400 hover:text-pink-300"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-neutral-500">
              {filtered.length} product{filtered.length !== 1 ? "s" : ""}
              {search ? <> matching “{search}”</> : null}
            </p>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="border-t border-neutral-900">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <h3 className="mb-3 text-2xl font-bold">Can’t find it? We’ll make it.</h3>
          <p className="mb-6 text-neutral-500">Custom requests are our specialty.</p>
          <Link
            href="/#request"
            className="inline-flex items-center gap-2 rounded-full border border-pink-500/50 px-7 py-3 text-pink-300 transition hover:bg-pink-500/10"
          >
            Request something custom →
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-black text-neutral-400">
          Loading shop…
        </main>
      }
    >
      <ShopInner />
    </Suspense>
  );
}

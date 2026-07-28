"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Category = { id: string; name: string; slug: string; _count: { products: number } };

export function ShopFilters({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();

  function update(key: string, value: string | null) {
    const next = new URLSearchParams(params.toString());
    if (!value) next.delete(key);
    else next.set(key, value);
    startTransition(() => {
      router.push(`/shop?${next.toString()}`);
    });
  }

  const activeCategory = params.get("category") || "";
  const sort = params.get("sort") || "featured";
  const q = params.get("q") || "";

  return (
    <aside className={cn("space-y-6", pending && "opacity-70")}>
      <div className="space-y-2">
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          defaultValue={q}
          placeholder="Search products…"
          onChange={(e) => {
            const value = e.target.value;
            // debounce-ish: update on enter or short delay via form submit preferred
            if (value.length === 0) update("q", null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              update("q", (e.target as HTMLInputElement).value || null);
            }
          }}
        />
        <p className="text-xs text-muted-foreground">Press Enter to search</p>
      </div>

      <div className="space-y-2">
        <Label>Category</Label>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => update("category", null)}
            className={cn(
              "block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-muted",
              !activeCategory && "bg-muted font-medium"
            )}
          >
            All products
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => update("category", c.slug)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-muted",
                activeCategory === c.slug && "bg-muted font-medium"
              )}
            >
              <span>{c.name}</span>
              <span className="text-xs text-muted-foreground">{c._count.products}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sort">Sort</Label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => update("sort", e.target.value)}
          className="flex h-11 w-full rounded-xl border border-border bg-background px-3 text-sm"
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to high</option>
          <option value="price-desc">Price: High to low</option>
          <option value="name">Name</option>
        </select>
      </div>
    </aside>
  );
}

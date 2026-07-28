"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useWishlist } from "@/store/wishlist";
import { ProductCard } from "@/components/product-card";
import type { ProductDTO } from "@/lib/products";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const ids = useWishlist((s) => s.ids);
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (ids.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      const res = await fetch(`/api/products?ids=${ids.join(",")}`);
      const data = await res.json();
      if (!cancelled) {
        setProducts(data.products || []);
        setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [ids]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="mb-6 font-display text-3xl font-semibold">Wishlist</h1>
      {loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center">
          <p className="text-lg font-semibold">No saved products yet</p>
          <p className="mt-2 text-muted-foreground">Tap the heart on any product to save it here.</p>
          <Link href="/shop" className="mt-6 inline-block">
            <Button>Browse shop</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

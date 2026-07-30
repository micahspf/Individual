"use client";

import Link from "next/link";
import EditionBadge from "@/components/rewards/EditionBadge";
import { EditionType } from "@/lib/rewards/types";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  badge?: string;
  slug: string;
  isTokenOnly?: boolean;
  tokenPrice?: number;
  edition?: EditionType;
  remainingQuantity?: number;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-950 transition-all duration-500 hover:-translate-y-1.5 hover:border-pink-500/50 hover:shadow-[0_20px_50px_rgba(236,72,153,0.18)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-yellow-400/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl opacity-30 transition-all duration-500 group-hover:scale-110 group-hover:opacity-50">
            {product.category === "3d-printed" && "🖨️"}
            {product.category === "viral-toys" && "🧸"}
            {product.category === "apparel" && "👕"}
            {product.category === "drinkware" && "🥤"}
            {product.category === "home" && "🏠"}
            {!["3d-printed", "viral-toys", "apparel", "drinkware", "home"].includes(
              product.category
            ) && "✨"}
          </div>
        </div>

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.edition && <EditionBadge edition={product.edition} />}
          {product.badge && !product.edition && (
            <div className="rounded-full bg-pink-500 px-2.5 py-1 text-[11px] font-semibold text-white shadow-[0_0_15px_rgba(236,72,153,0.5)]">
              {product.badge}
            </div>
          )}
          {product.isTokenOnly && (
            <div className="rounded-full border border-yellow-400/40 bg-yellow-400/20 px-2.5 py-1 text-[11px] font-semibold text-yellow-300">
              Tokens Only
            </div>
          )}
        </div>

        {typeof product.remainingQuantity === "number" && product.remainingQuantity <= 10 && (
          <div className="absolute bottom-3 left-3 rounded-full border border-neutral-700 bg-black/70 px-2.5 py-1 text-[11px] font-medium text-neutral-300">
            Only {product.remainingQuantity} left
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="line-clamp-1 font-medium text-white transition-colors duration-300 group-hover:text-pink-300">
          {product.name}
        </h3>
        <div className="mt-1.5 flex items-center justify-between">
          {product.isTokenOnly && product.tokenPrice ? (
            <span className="flex items-center gap-1 text-lg font-semibold text-yellow-300">
              <span className="text-yellow-400/80">●</span>
              {product.tokenPrice}
            </span>
          ) : (
            <span className="text-lg font-semibold text-yellow-300">
              ${product.price.toFixed(2)}
            </span>
          )}
          <span className="text-xs uppercase tracking-wider text-neutral-500">
            {product.isTokenOnly ? "Tokens" : "Made to order"}
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-pink-500/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </Link>
  );
}

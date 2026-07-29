"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { formatMoney } from "@/lib/utils";
import type { ProductDTO } from "@/lib/products";
import { useWishlist } from "@/store/wishlist";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: ProductDTO }) {
  const toggle = useWishlist((s) => s.toggle);
  const wished = useWishlist((s) => s.ids.includes(product.id));
  const image = product.images[0] || "/placeholder-product.svg";

  return (
    <article className="group overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 transition hover:-translate-y-1 hover:border-pink-500/40 hover:shadow-[0_0_30px_rgba(236,72,153,0.12)]">
      <div className="relative aspect-square overflow-hidden bg-neutral-900">
        <Link href={`/products/${product.slug}`}>
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(max-width:768px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>
        <button
          type="button"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => {
            toggle(product.id);
            toast(wished ? "Removed from wishlist" : "Saved to wishlist ♥");
          }}
          className={cn(
            "absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-pink-500 text-white shadow transition hover:scale-110",
            wished && "bg-pink-400"
          )}
        >
          <Heart className={cn("h-4 w-4", wished && "fill-current")} />
        </button>
        {product.compareAtPrice && (
          <Badge className="absolute left-3 top-3 border-0 bg-pink-500 text-white">Sale</Badge>
        )}
        {product.tags.includes("new") && !product.compareAtPrice && (
          <Badge className="absolute left-3 top-3 border-0 bg-yellow-400 text-black">New</Badge>
        )}
      </div>
      <div className="space-y-1.5 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-pink-400/80">
          {product.category.name}
        </p>
        <h3 className="font-semibold leading-snug">
          <Link href={`/products/${product.slug}`} className="hover:text-pink-300">
            {product.name}
          </Link>
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-bold text-yellow-300">{formatMoney(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-sm text-neutral-500 line-through">
              {formatMoney(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

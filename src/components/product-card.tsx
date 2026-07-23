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
    <article className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-muted">
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
            toast(wished ? "Removed from wishlist" : "Saved to wishlist");
          }}
          className={cn(
            "absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/90 shadow-sm backdrop-blur transition hover:scale-105",
            wished && "text-accent"
          )}
        >
          <Heart className={cn("h-4 w-4", wished && "fill-current")} />
        </button>
        {product.compareAtPrice && (
          <Badge className="absolute left-3 top-3 border-0 bg-accent text-white">Sale</Badge>
        )}
        {product.tags.includes("new") && !product.compareAtPrice && (
          <Badge className="absolute left-3 top-3 border-0 bg-foreground text-background">New</Badge>
        )}
      </div>
      <div className="space-y-1.5 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {product.category.name}
        </p>
        <h3 className="font-medium leading-snug">
          <Link href={`/products/${product.slug}`} className="hover:text-accent">
            {product.name}
          </Link>
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-semibold">{formatMoney(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatMoney(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

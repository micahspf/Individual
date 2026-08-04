'use client';

import Link from 'next/link';
import ProductImage from '@/components/shop/ProductImage';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  slug: string;
  image: string;
  occasions?: string[];
}

export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="glass group relative block overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:border-pink-500/45 hover:shadow-[0_20px_50px_rgba(236,72,153,0.15)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-white/[0.04]">
        <ProductImage
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-yellow-400/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {product.occasions?.[0] && (
          <div className="absolute top-3 left-3 z-10">
            <div className="rounded-full border border-white/15 bg-[#0a0a12]/75 px-2.5 py-1 text-[11px] font-medium text-zinc-200 backdrop-blur">
              {product.occasions[0]}
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="line-clamp-1 font-medium text-zinc-100 transition-colors group-hover:text-pink-300">
          {product.name}
        </h3>
        <div className="mt-1.5 flex items-center justify-between">
          <span className="text-lg font-semibold text-yellow-300">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-xs uppercase tracking-wider text-zinc-400">
            Made to order
          </span>
        </div>
      </div>
    </Link>
  );
}

'use client';

import Link from 'next/link';
import EditionBadge from '@/components/rewards/EditionBadge';
import { EditionType } from '@/lib/rewards/types';

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
      className="group relative block rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800/80 transition-all duration-500 hover:border-pink-500/50 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(236,72,153,0.18)]"
    >
      {/* Image area */}
      <div className="relative aspect-[4/5] bg-neutral-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500">
            {product.category === '3d-printed' && '🖨️'}
            {product.category === 'viral-toys' && '🧸'}
            {product.category === 'apparel' && '👕'}
            {product.category === 'drinkware' && '🥤'}
            {product.category === 'home' && '🏠'}
            {!['3d-printed','viral-toys','apparel','drinkware','home'].includes(product.category) && '✨'}
          </div>
        </div>

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.edition && <EditionBadge edition={product.edition} />}
          {product.badge && !product.edition && (
            <div className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)]">
              {product.badge}
            </div>
          )}
          {product.isTokenOnly && (
            <div className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-yellow-400/20 text-yellow-300 border border-yellow-400/40">
              Tokens Only
            </div>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => e.preventDefault()}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:text-pink-400 hover:border-pink-500/50 transition-all opacity-0 group-hover:opacity-100"
        >
          ♥
        </button>

        {/* Limited quantity */}
        {typeof product.remainingQuantity === 'number' && product.remainingQuantity <= 10 && (
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/70 text-neutral-300 border border-neutral-700">
            Only {product.remainingQuantity} left
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-medium text-white group-hover:text-pink-300 transition-colors duration-300 line-clamp-1">
          {product.name}
        </h3>
        <div className="mt-1.5 flex items-center justify-between">
          {product.isTokenOnly && product.tokenPrice ? (
            <span className="text-lg font-semibold text-yellow-300 flex items-center gap-1">
              <span className="text-yellow-400/80">●</span>
              {product.tokenPrice}
            </span>
          ) : (
            <span className="text-lg font-semibold text-yellow-300">
              ${product.price.toFixed(2)}
            </span>
          )}
          <span className="text-xs text-neutral-500 uppercase tracking-wider">
            {product.isTokenOnly ? 'Tokens' : 'Made to order'}
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-pink-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </Link>
  );
}

'use client';

import { use } from 'react';
import Link from 'next/link';
import { products } from '@/lib/data/products';
import { addToCart } from '@/lib/cart/store';
import EditionBadge from '@/components/rewards/EditionBadge';
import Recommendations from '@/components/shop/Recommendations';
import { useState } from 'react';

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = products.find((p) => p.slug === slug);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link href="/shop" className="text-pink-400">
          ← Back to shop
        </Link>
      </main>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  function handleAdd() {
    addToCart({
      id: product!.id,
      slug: product!.slug,
      name: product!.name,
      price: product!.price,
      isTokenOnly: product!.isTokenOnly,
      tokenPrice: product!.tokenPrice,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      {/* Breadcrumbs */}
      <nav className="text-sm text-neutral-500 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-pink-300">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-pink-300">
          Shop
        </Link>
        <span>/</span>
        <span className="text-neutral-300">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Image placeholder */}
        <div className="aspect-square rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center relative overflow-hidden">
          <div className="text-7xl opacity-30">
            {product.category === '3d-printed' && '🖨️'}
            {product.category === 'fidget-sensory' && '🧩'}
            {product.category === 'drinkware' && '🥤'}
            {product.category === 'home' && '🏠'}
          </div>
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.edition && <EditionBadge edition={product.edition} />}
            {product.badge && !product.edition && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-pink-500 text-white">
                {product.badge}
              </span>
            )}
          </div>
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            {product.name}
          </h1>

          <div className="text-2xl font-semibold text-yellow-300 mb-6">
            {product.isTokenOnly
              ? `${product.tokenPrice} tokens`
              : `$${product.price.toFixed(2)}`}
          </div>

          <p className="text-neutral-300 leading-relaxed mb-6">
            {product.description}
          </p>

          <dl className="space-y-3 text-sm mb-8">
            <div className="flex gap-3">
              <dt className="text-neutral-500 w-28 shrink-0">Materials</dt>
              <dd className="text-neutral-300">{product.materials}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-neutral-500 w-28 shrink-0">Turnaround</dt>
              <dd className="text-neutral-300">{product.turnaround}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-neutral-500 w-28 shrink-0">Made in</dt>
              <dd className="text-neutral-300">Cullman, Alabama</dd>
            </div>
          </dl>

          {/* CTA */}
          {!product.isTokenOnly ? (
            <button
              onClick={handleAdd}
              className="w-full sm:w-auto px-10 py-3.5 rounded-full bg-pink-500 text-white font-medium hover:bg-pink-400 transition shadow-[0_0_25px_rgba(236,72,153,0.35)]"
            >
              {added ? 'Added to cart ✓' : 'Add to cart'}
            </button>
          ) : (
            <Link
              href="/rewards"
              className="inline-flex px-10 py-3.5 rounded-full bg-yellow-400 text-black font-medium hover:bg-yellow-300 transition"
            >
              Unlock with tokens →
            </Link>
          )}

          {/* Shipping note near buy */}
          <div className="mt-6 p-4 rounded-xl border border-neutral-800 bg-neutral-950 text-sm text-neutral-400">
            <p>
              <span className="text-neutral-300">Shipping:</span> Made to order.
              Typical {product.turnaround}. Local Cullman pickup available.
            </p>
            <p className="mt-1">
              <Link href="/returns" className="text-pink-400 hover:text-pink-300">
                Returns policy
              </Link>
              {' · '}
              <Link href="/shipping" className="text-pink-400 hover:text-pink-300">
                Shipping details
              </Link>
            </p>
          </div>

          {/* Reviews slot */}
          <div className="mt-8 p-5 rounded-xl border border-neutral-800">
            <h3 className="font-medium mb-2">Reviews</h3>
            <p className="text-sm text-neutral-500">
              No reviews yet — be the first after your order ships.
            </p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-16">
        <h2 className="text-xl font-bold mb-6">You may also like</h2>
        <div className="mb-6">
          <Recommendations context={product.category} />
        </div>
        {related.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p) => (
              <Link
                key={p.id}
                href={`/shop/${p.slug}`}
                className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 hover:border-pink-500/40 transition"
              >
                <div className="font-medium text-sm mb-1 line-clamp-1">{p.name}</div>
                <div className="text-yellow-300 text-sm">
                  {p.isTokenOnly ? `${p.tokenPrice} tokens` : `$${p.price}`}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

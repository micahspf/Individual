import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, Package, Sparkles, Truck } from "lucide-react";
import { getCategories, getFeaturedProducts } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featured, categories] = await Promise.all([
    getFeaturedProducts(4),
    getCategories(),
  ]);

  return (
    <div className="overflow-x-hidden bg-black text-white">
      {/* Hero — zip design + real shop CTAs */}
      <section className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-10 lg:grid-cols-2">
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-pink-500/40 bg-pink-500/10 px-4 py-1.5 text-sm text-pink-300">
            <span>✦</span> MADE JUST FOR YOU
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
            Custom products
            <br />
            with a <span className="text-pink-400">bubbly</span>
            <br />
            <span className="text-yellow-400">twist</span>{" "}
            <span className="text-yellow-300">✦</span>
          </h1>

          <p className="mb-8 max-w-md text-lg leading-relaxed text-neutral-400">
            Personalize apparel, drinkware, and home goods.{" "}
            <span className="text-pink-300">Bright colors</span>,{" "}
            <span className="text-yellow-300">soft shapes</span>, and{" "}
            <span className="text-white">made-to-order</span> magic — no boring inventory.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/shop">
              <Button size="lg" className="px-7 py-3.5">
                Shop the fun stuff <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/shop?tag=customizable">
              <Button size="lg" variant="secondary" className="px-7 py-3.5">
                Start customizing
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-pink-500/20 blur-3xl" />
            <div className="absolute -left-10 bottom-0 h-48 w-48 rounded-full bg-yellow-400/15 blur-3xl" />

            <div className="relative z-20 mb-4 ml-12">
              <div className="glow-pink flex h-48 w-48 items-center justify-center overflow-hidden rounded-2xl border border-pink-500/30 bg-gradient-to-br from-neutral-900 to-black">
                <div className="text-center">
                  <div className="text-2xl font-black leading-tight tracking-tight text-pink-400">
                    GOOD
                    <br />
                    VIBES
                    <br />
                    ONLY
                  </div>
                  <div className="mt-1 text-2xl text-yellow-300">☺</div>
                </div>
              </div>
            </div>

            <div className="relative z-10 -mt-8">
              <div className="glow-yellow flex h-52 w-64 items-center justify-center rounded-2xl border border-yellow-400/20 bg-neutral-900">
                <div className="text-center">
                  <div className="text-lg font-semibold text-pink-400">made</div>
                  <div className="text-xl font-bold text-yellow-300">+ for +</div>
                  <div className="text-lg font-semibold text-pink-400">you ♥</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="grid gap-5 sm:grid-cols-3">
          <div className="card-dark p-6 text-center shadow-[0_0_25px_rgba(236,72,153,0.1)]">
            <div className="mb-2 text-2xl text-pink-400">★</div>
            <div className="mb-1 text-3xl font-bold text-pink-400">4.9★</div>
            <div className="mb-1 font-medium">Happy customers</div>
            <p className="text-sm text-neutral-500">Thousands of 5-star reviews from awesome people.</p>
          </div>
          <div className="card-dark-yellow p-6 text-center shadow-[0_0_25px_rgba(250,204,21,0.1)]">
            <div className="mb-2 text-2xl text-yellow-400">🚚</div>
            <div className="mb-1 text-3xl font-bold text-yellow-400">$75+</div>
            <div className="mb-1 font-medium">Free shipping</div>
            <p className="text-sm text-neutral-500">On all orders over $75. No code needed.</p>
          </div>
          <div className="card-dark p-6 text-center shadow-[0_0_25px_rgba(236,72,153,0.1)]">
            <div className="mb-2 text-2xl text-pink-400">↺</div>
            <div className="mb-1 text-3xl font-bold text-pink-400">30d</div>
            <div className="mb-1 font-medium">Easy returns</div>
            <p className="text-sm text-neutral-500">Love it or send it back. No hassle, promise.</p>
          </div>
        </div>
      </section>

      {/* Categories from DB */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 text-sm text-pink-400">
              <span>✦</span> SHOP BY CATEGORY
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Pick a playground</h2>
          </div>
          <Link href="/shop" className="text-sm font-medium text-pink-400 hover:text-pink-300">
            View all →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-neutral-800"
            >
              {cat.image && (
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width:1024px) 50vw, 25vw"
                />
              )}
              <div
                className={`absolute inset-0 ${
                  i % 2 === 0
                    ? "bg-gradient-to-t from-pink-600/90 via-black/30 to-transparent"
                    : "bg-gradient-to-t from-yellow-500/80 via-black/30 to-transparent"
                }`}
              />
              <div className="absolute bottom-0 p-5">
                <p className="text-lg font-bold">{cat.name}</p>
                <p className="text-xs text-white/80">{cat._count.products} products</p>
              </div>
            </Link>
          ))}
          {categories.length === 0 && (
            <div className="col-span-full rounded-2xl border border-neutral-800 bg-neutral-950 p-10 text-center">
              <p className="text-lg font-semibold">Products loading soon</p>
              <p className="mt-2 text-neutral-500">Connect Postgres + seed to fill the shop.</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured products from DB */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 text-sm text-yellow-400">
              <span>✦</span> FEATURED
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Customer favorites</h2>
          </div>
          <Link href="/shop" className="text-sm font-medium text-yellow-400 hover:text-yellow-300">
            Shop all →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Bottom CTA — zip copy + real links */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 lg:grid-cols-2">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 text-sm text-pink-400">
            <span>✦</span> FULLY PERSONALIZED
          </div>
          <h2 className="mb-5 text-4xl font-bold leading-tight">
            Made your way,
            <br />
            for <span className="text-pink-400">you</span>.{" "}
            <span className="text-pink-400">♥</span>
          </h2>
          <p className="mb-6 max-w-md text-lg leading-relaxed text-neutral-400">
            You dream it, we make it. From the perfect gift to something just for you — made with
            care and good vibes.
          </p>
          <Link href="/shop?tag=customizable" className="font-medium text-pink-400 hover:text-pink-300">
            How custom works →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: Package, title: "Made to order", body: "Printed only when you buy." },
            { icon: Truck, title: "Fast shipping", body: "Most customs in 3–5 days." },
            { icon: Heart, title: "Gift ready", body: "Names, colors, sweet details." },
            { icon: Sparkles, title: "Zero waste stock", body: "No leftover inventory." },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5"
            >
              <f.icon className="mb-2 h-5 w-5 text-pink-400" />
              <p className="font-semibold">{f.title}</p>
              <p className="mt-1 text-sm text-neutral-500">{f.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

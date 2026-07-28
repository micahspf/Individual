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
    <>
      <section className="relative overflow-hidden">
        <div className="hero-bubbles" aria-hidden="true">
          <span className="floaty left-[6%] top-[18%] h-16 w-16 bg-[#ffe14a]" />
          <span className="floaty-delay right-[8%] top-[22%] h-24 w-24 bg-[#ff8ec8]" />
          <span className="floaty left-[18%] bottom-[12%] h-12 w-12 bg-[#ffb6de]" />
          <span className="floaty-delay right-[18%] bottom-[18%] h-20 w-20 bg-[#fff08a]" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-[#ffb6de] bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-accent shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Made just for you
            </p>
            <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Custom products with a{" "}
              <span className="bg-gradient-to-r from-[#ff4fa3] to-[#ff9ad0] bg-clip-text text-transparent">
                bubbly
              </span>{" "}
              twist ✨
            </h1>
            <p className="mt-5 max-w-xl text-lg font-medium text-muted-foreground">
              Personalize apparel, drinkware, and home goods. Bright colors, soft shapes,
              and made-to-order magic — no boring inventory.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop">
                <Button size="lg">
                  Shop the fun stuff <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/shop?tag=customizable">
                <Button size="lg" variant="secondary">
                  Start customizing
                </Button>
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-3">
              {[
                { t: "4.9★", d: "Happy customers" },
                { t: "$75+", d: "Free shipping" },
                { t: "30d", d: "Easy returns" },
              ].map((s) => (
                <div key={s.t} className="bubble-card px-3 py-4 text-center">
                  <p className="text-xl font-extrabold text-accent">{s.t}</p>
                  <p className="mt-1 text-[11px] font-semibold text-muted-foreground">{s.d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-4 -top-4 h-24 w-24 blob bg-[#ffe14a]/80 floaty" />
            <div className="absolute -bottom-6 -right-2 h-28 w-28 blob-soft bg-[#ff8ec8]/70 floaty-delay" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border-4 border-white shadow-[0_20px_0_rgba(255,79,163,0.15)] lg:aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1400&q=80"
                alt="Colorful custom products"
                fill
                priority
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-3xl bg-white/90 p-4 backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-widest text-accent">Featured vibe</p>
                <p className="mt-1 text-lg font-extrabold">Pink lemonade edit</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Shop by category</h2>
            <p className="mt-1 font-medium text-muted-foreground">Pick a playground.</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-[2rem] border-4 border-white shadow-[0_12px_0_rgba(255,79,163,0.12)]"
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
                    ? "bg-gradient-to-t from-[#ff4fa3]/85 via-[#ff4fa3]/20 to-transparent"
                    : "bg-gradient-to-t from-[#f5c400]/90 via-[#ffe14a]/25 to-transparent"
                }`}
              />
              <div className="absolute bottom-0 p-5 text-white">
                <p className="text-lg font-extrabold drop-shadow">{cat.name}</p>
                <p className="text-xs font-semibold opacity-90">{cat._count.products} products</p>
              </div>
            </Link>
          ))}
          {categories.length === 0 && (
            <div className="col-span-full bubble-card p-10 text-center">
              <p className="text-lg font-extrabold">Products loading soon</p>
              <p className="mt-2 text-muted-foreground">
                Connect the database and seed to fill the shop.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Featured favorites</h2>
            <p className="mt-1 font-medium text-muted-foreground">Cute, customizable, ready to personalize.</p>
          </div>
          <Link href="/shop" className="text-sm font-extrabold text-accent hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-white bg-gradient-to-br from-[#ffe14a] via-[#ffb6de] to-[#ff4fa3] p-8 text-[#3b2148] shadow-[0_16px_0_rgba(255,79,163,0.2)] sm:p-12">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/30 blur-2xl" />
          <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
                Make it cute. Make it yours.
              </h2>
              <p className="mt-3 text-base font-medium opacity-90">
                Upload art, pick colors, add names — every eligible product is made to order
                with that bubbly Individual energy.
              </p>
              <Link href="/shop?tag=customizable" className="mt-6 inline-block">
                <Button variant="outline" size="lg" className="border-white bg-white">
                  Explore custom products
                </Button>
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: Package, title: "Made to order", body: "Printed only when you buy." },
                { icon: Truck, title: "Fast & fun", body: "Most customs ship in 3–5 days." },
                { icon: Heart, title: "Gift ready", body: "Names, colors, and sweet details." },
                { icon: Sparkles, title: "Zero waste stock", body: "No dusty leftover inventory." },
              ].map((f) => (
                <div key={f.title} className="rounded-3xl bg-white/75 p-4 backdrop-blur">
                  <f.icon className="mb-2 h-5 w-5 text-accent" />
                  <p className="font-extrabold">{f.title}</p>
                  <p className="mt-1 text-sm font-medium opacity-80">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

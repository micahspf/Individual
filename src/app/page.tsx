import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Package, Shield, Sparkles, Truck } from "lucide-react";
import { getCategories, getFeaturedProducts } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const [featured, categories] = await Promise.all([
    getFeaturedProducts(4),
    getCategories(),
  ]);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <Sparkles className="h-3.5 w-3.5" />
              Custom made · Premium quality
            </p>
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Products designed by you, crafted by Individual.com
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Personalize apparel, drinkware, and home goods with text, colors, and artwork.
              A conversion-focused shopping experience from browse to checkout.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop">
                <Button size="lg">
                  Shop collection <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/shop?tag=customizable">
                <Button size="lg" variant="secondary">
                  Start customizing
                </Button>
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-8">
              <div>
                <p className="text-2xl font-semibold">4.9★</p>
                <p className="text-xs text-muted-foreground">Avg. product rating</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">$75+</p>
                <p className="text-xs text-muted-foreground">Free shipping</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">30d</p>
                <p className="text-xs text-muted-foreground">Easy returns</p>
              </div>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-muted shadow-2xl lg:aspect-square">
            <Image
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&q=80"
              alt="Individual custom products lifestyle"
              fill
              priority
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
              <p className="text-xs uppercase tracking-widest opacity-80">Featured drop</p>
              <p className="mt-1 text-lg font-semibold">Engraved steel tumblers</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">Shop by category</h2>
            <p className="mt-1 text-muted-foreground">Find the right canvas for your idea.</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-5 text-white">
                <p className="font-semibold">{cat.name}</p>
                <p className="text-xs opacity-80">{cat._count.products} products</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">Featured products</h2>
            <p className="mt-1 text-muted-foreground">Customer favorites ready to personalize.</p>
          </div>
          <Link href="/shop" className="text-sm font-semibold text-accent hover:underline">
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
        <div className="grid gap-4 rounded-[2rem] bg-foreground px-6 py-10 text-background sm:px-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-display text-3xl font-semibold">Make it unmistakably yours</h2>
            <p className="mt-3 text-background/75">
              Upload artwork, choose colors, and add custom text. Every product is made to order
              with proof options on select items.
            </p>
            <Link href="/shop?tag=customizable" className="mt-6 inline-block">
              <Button className="bg-background text-foreground hover:bg-background/90">
                Explore custom products
              </Button>
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { icon: Package, title: "Made to order", body: "Personalization on every eligible SKU." },
              { icon: Truck, title: "Fast fulfillment", body: "Most custom orders ship in 3–5 days." },
              { icon: Shield, title: "Secure checkout", body: "Stripe payments with demo fallback." },
              { icon: Sparkles, title: "Premium materials", body: "Cotton, steel, canvas, and leather." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-background/15 bg-background/5 p-4">
                <f.icon className="mb-2 h-5 w-5" />
                <p className="font-semibold">{f.title}</p>
                <p className="mt-1 text-sm text-background/70">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

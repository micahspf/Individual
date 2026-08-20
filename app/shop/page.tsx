import type { Metadata } from "next";
import Link from "next/link";
import { shopProducts } from "@/lib/data/products";
import ProductImage from "@/components/shop/ProductImage";

/**
 * The catalog is paused while everything runs as custom commissions. The
 * finished pieces stay online as portfolio work (see app/shop/[slug]), so this
 * page links into them — otherwise those 29 URLs would only be reachable from
 * search results. components/shop/ShopClient.tsx is kept for when the shop
 * returns.
 */

export const metadata: Metadata = {
  title: "Shop",
  description:
    "The Individual catalog is coming soon. Everything is currently made to order as a custom commission — quoted before anything is produced, in Cullman, Alabama.",
  alternates: { canonical: "https://www.madebyindividual.com/shop" },
};

export default function ShopPage() {
  const examples = shopProducts.slice(0, 6);

  return (
    <main>
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center lg:py-28">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-[#ff7ab8] sm:text-xs">
            Catalog · Cullman, Alabama
          </p>
          <h1 className="font-display text-4xl font-medium leading-[1.12] tracking-tight text-zinc-50 sm:text-5xl">
            Shop coming soon.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Right now every piece is a custom commission — you describe what you want,
            you get a price and a timeline, and nothing is produced until you say go.
          </p>

          <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-[#ffe14a]/25 bg-[#ffe14a]/[0.06] p-5">
            <p className="text-sm leading-relaxed text-zinc-300">
              <span className="font-medium text-[#ffe14a]">First piece may be free.</span>{" "}
              On custom projects and prototypes the first sample is on me — ask when you
              send the details.
            </p>
          </div>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/#request" className="btn-pill-pink px-7 py-3.5 text-sm">
              Request a commission
            </Link>
            <a
              href="tel:+12565906534"
              className="rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-medium text-zinc-100 transition hover:border-[#ffe14a]/40 hover:bg-[#ffe14a]/10"
            >
              Call 256-590-6534
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
          Work we&rsquo;ve made
        </p>
        <h2 className="font-display text-3xl font-medium tracking-tight text-zinc-50 sm:text-4xl">
          Examples, not stock.
        </h2>
        <p className="mt-3 max-w-xl text-zinc-400">
          Pieces produced for previous commissions. Anything here can be made again in
          your name, your wording, your material — priced per job.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3">
          {examples.map((p) => (
            <Link
              key={p.id}
              href={`/shop/${p.slug}`}
              className="glass group overflow-hidden transition hover:border-pink-500/35"
            >
              <div className="relative aspect-square overflow-hidden">
                <ProductImage
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <div className="font-medium text-zinc-100 transition group-hover:text-pink-300">
                  {p.name}
                </div>
                <div className="mt-1 text-sm text-zinc-400">{p.materials}</div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/#request" className="btn-pill-yellow px-7 py-3.5 text-sm">
            Request something like this
          </Link>
        </div>
      </section>
    </main>
  );
}

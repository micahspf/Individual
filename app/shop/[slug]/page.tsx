import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { shopProducts, products } from "@/lib/data/products";
import Recommendations from "@/components/shop/Recommendations";
import ProductImage from "@/components/shop/ProductImage";
import TrackView from "@/components/shop/TrackView";

/** ISR: rebuild product pages at most once per hour */
export const revalidate = 3600;

export async function generateStaticParams() {
  return shopProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = shopProducts.find((p) => p.slug === slug);
  if (!product) {
    return { title: "Product not found" };
  }
  const url = `https://www.madebyindividual.com/shop/${product.slug}`;
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: url },
    openGraph: {
      title: product.name,
      description: product.description,
      url,
      type: "website",
      images: [{ url: product.image, width: 800, height: 1000, alt: product.name }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product || product.isTokenOnly) {
    notFound();
  }

  const related = shopProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Portfolio examples while the shop is paused. There is no purchasable offer,
  // so no `offers` block — publishing a price (or a zero) for something nobody
  // can buy would misrepresent the page in search results.
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `https://www.madebyindividual.com${product.image}`,
    brand: { "@type": "Brand", name: "Individual" },
    material: product.materials,
    url: `https://www.madebyindividual.com/shop/${product.slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.madebyindividual.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Work",
        item: "https://www.madebyindividual.com/shop",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `https://www.madebyindividual.com/shop/${product.slug}`,
      },
    ],
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <TrackView productId={product.id} category={product.category} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <nav className="mb-8 flex items-center gap-2 text-sm text-zinc-400">
        <Link href="/" className="hover:text-pink-300">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-pink-300">
          Work
        </Link>
        <span>/</span>
        <span className="text-zinc-300">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2">
        <div className="glass relative aspect-square overflow-hidden">
          <ProductImage
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div>
          <h1 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {product.name}
          </h1>

          <div className="mb-6">
            <div className="text-lg font-medium text-yellow-300">
              Example of past work
            </div>
            <p className="mt-1 text-sm text-zinc-400">
              Priced per commission — tell me the details and you get a quote before
              anything is made.
            </p>
          </div>

          <p className="mb-6 leading-relaxed text-zinc-300">{product.description}</p>

          {product.occasions && product.occasions.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {product.occasions.map((o) => (
                <span
                  key={o}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-400"
                >
                  {o}
                </span>
              ))}
            </div>
          )}

          <dl className="mb-8 space-y-3 text-sm">
            <div className="flex gap-3">
              <dt className="w-28 shrink-0 text-zinc-400">Materials</dt>
              <dd className="text-zinc-300">{product.materials}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-28 shrink-0 text-zinc-400">Turnaround</dt>
              <dd className="text-zinc-300">{product.turnaround}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-28 shrink-0 text-zinc-400">Made in</dt>
              <dd className="text-zinc-300">Cullman, Alabama</dd>
            </div>
          </dl>

          {product.personalize && product.personalize.length > 0 && !product.personalizable && (
            <div className="glass mb-8 p-5">
              <h3 className="font-display mb-2 text-lg font-medium text-zinc-50">
                Options
              </h3>
              <ul className="space-y-1.5 text-sm text-zinc-300">
                {product.personalize.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="text-pink-400">—</span>
                    {line}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-zinc-400">
                Include your preferences in the commission request and they get quoted with it.
              </p>
            </div>
          )}

          <div className="glass-pink p-6">
            <h3 className="font-display text-xl font-medium text-zinc-50">
              Request one like this
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Your name, your wording, your material. Say what you want changed and you
              get a price and a timeline before anything is produced.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              <span className="font-medium text-[#ffe14a]">First piece may be free.</span>{" "}
              On custom projects and prototypes the first sample is on me — ask when you
              send the details.
            </p>
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <Link
                href="/#request"
                className="btn-pill-pink px-7 py-3.5 text-center text-sm"
              >
                Request a quote
              </Link>
              <a
                href="tel:+12565906534"
                className="rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-center text-sm font-medium text-zinc-100 transition hover:border-[#ffe14a]/40 hover:bg-[#ffe14a]/10"
              >
                Call 256-590-6534
              </a>
            </div>
          </div>

          <div className="glass mt-6 p-4 text-sm text-zinc-400">
            <p>
              <span className="text-zinc-200">Shipping:</span> Made to order.
              Typical {product.turnaround}. Local Cullman pickup available.
            </p>
            <p className="mt-1">
              <Link href="/returns" className="text-pink-400 hover:text-pink-300">
                Returns policy
              </Link>
              {" · "}
              <Link href="/shipping" className="text-pink-400 hover:text-pink-300">
                Shipping details
              </Link>
              {" · "}
              <Link href="/#request" className="text-pink-400 hover:text-pink-300">
                Custom commission
              </Link>
            </p>
          </div>

          <div className="glass mt-8 p-5">
            <h3 className="mb-2 font-medium">Reviews</h3>
            <p className="text-sm text-zinc-400">
              No reviews yet — be the first after your order ships.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="mb-6 text-xl font-bold">You may also like</h2>
        <div className="mb-6">
          <Recommendations context={product.category} />
        </div>
        {related.length > 0 && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((p) => (
              <Link
                key={p.id}
                href={`/shop/${p.slug}`}
                className="glass p-4 transition hover:border-pink-500/40"
              >
                <div className="mb-1 line-clamp-1 text-sm font-medium">{p.name}</div>
                <div className="text-sm text-zinc-400">{p.materials}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

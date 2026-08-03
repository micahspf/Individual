import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { shopProducts, products } from "@/lib/data/products";
import Recommendations from "@/components/shop/Recommendations";
import AddToCartButton from "@/components/shop/AddToCartButton";
import ProductImage from "@/components/shop/ProductImage";

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

  const priceValidUntil = new Date();
  priceValidUntil.setFullYear(priceValidUntil.getFullYear() + 1);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `https://www.madebyindividual.com${product.image}`,
    brand: { "@type": "Brand", name: "Individual" },
    offers: {
      "@type": "Offer",
      url: `https://www.madebyindividual.com/shop/${product.slug}`,
      priceCurrency: "USD",
      price: product.price.toFixed(2),
      availability: "https://schema.org/MadeToOrder",
      priceValidUntil: priceValidUntil.toISOString().slice(0, 10),
      itemCondition: "https://schema.org/NewCondition",
    },
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
        name: "Shop",
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
    <main className="max-w-7xl mx-auto px-6 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <nav className="text-sm text-zinc-500 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-pink-300">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-pink-300">
          Shop
        </Link>
        <span>/</span>
        <span className="text-zinc-300">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="glass aspect-square relative overflow-hidden">
          <ProductImage
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          {product.badge && (
            <div className="absolute top-4 left-4 z-10">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-pink-500 text-white">
                {product.badge}
              </span>
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            {product.name}
          </h1>

          <div className="text-2xl font-semibold text-yellow-300 mb-6">
            ${product.price.toFixed(2)}
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
              <dt className="w-28 shrink-0 text-zinc-500">Materials</dt>
              <dd className="text-zinc-300">{product.materials}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-28 shrink-0 text-zinc-500">Turnaround</dt>
              <dd className="text-zinc-300">{product.turnaround}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-28 shrink-0 text-zinc-500">Made in</dt>
              <dd className="text-zinc-300">Cullman, Alabama</dd>
            </div>
          </dl>

          {product.personalize && product.personalize.length > 0 && (
            <div className="glass-pink mb-8 p-5">
              <h3 className="font-display mb-1 text-lg font-medium text-zinc-50">
                Personalize this piece
              </h3>
              <p className="mb-3 text-sm text-zinc-400">
                After checkout, reply with your details — or note them at checkout if available.
                We confirm engraving text before production.
              </p>
              <ul className="space-y-1.5 text-sm text-zinc-300">
                {product.personalize.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="text-pink-400">—</span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <AddToCartButton
            id={product.id}
            slug={product.slug}
            name={product.name}
            price={product.price}
          />

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
            <p className="text-sm text-zinc-500">
              No reviews yet — be the first after your order ships.
            </p>
          </div>
        </div>
      </div>

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
                className="glass p-4 transition hover:border-pink-500/40"
              >
                <div className="font-medium text-sm mb-1 line-clamp-1">{p.name}</div>
                <div className="text-yellow-300 text-sm">${p.price}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

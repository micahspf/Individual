import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryLabel, getProductBySlug, ALL_PRODUCTS } from "@/lib/products-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ALL_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const emoji =
    product.category === "3d-printed"
      ? "🖨️"
      : product.category === "viral-toys"
        ? "🧸"
        : product.category === "apparel"
          ? "👕"
          : product.category === "drinkware"
            ? "🥤"
            : product.category === "home"
              ? "🏠"
              : "✨";

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <p className="mb-6 text-sm text-neutral-500">
          <Link href="/shop" className="hover:text-pink-400">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-neutral-300">{product.name}</span>
        </p>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex aspect-square items-center justify-center rounded-3xl border border-neutral-800 bg-neutral-950 text-8xl">
            {emoji}
          </div>

          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-pink-400">
              {getCategoryLabel(product.category)}
            </p>
            <h1 className="text-4xl font-bold tracking-tight">{product.name}</h1>
            {product.badge && (
              <span className="mt-3 inline-block rounded-full bg-pink-500/20 px-3 py-1 text-xs font-semibold text-pink-300">
                {product.badge}
              </span>
            )}
            <p className="mt-4 text-3xl font-semibold text-yellow-300">
              ${product.price.toFixed(2)}
            </p>
            <p className="mt-6 leading-relaxed text-neutral-400">{product.description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/#request?product=${encodeURIComponent(product.name)}`}
                className="inline-flex rounded-full bg-pink-500 px-7 py-3.5 font-medium text-white transition hover:bg-pink-400"
              >
                Request this custom
              </Link>
              <Link
                href="/shop"
                className="inline-flex rounded-full border border-neutral-700 px-7 py-3.5 font-medium text-neutral-200 transition hover:border-pink-500/40 hover:text-pink-300"
              >
                Back to shop
              </Link>
            </div>

            <ul className="mt-8 space-y-2 text-sm text-neutral-500">
              <li>• Made to order — no waste inventory</li>
              <li>• Free shipping on orders $75+</li>
              <li>• Questions? Use the custom request form</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

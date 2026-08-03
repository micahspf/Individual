import Link from "next/link";
import { notFound } from "next/navigation";
import { shopProducts, products } from "@/lib/data/products";
import Recommendations from "@/components/shop/Recommendations";
import AddToCartButton from "@/components/shop/AddToCartButton";

/** ISR: rebuild product pages at most once per hour */
export const revalidate = 3600;

export async function generateStaticParams() {
  return shopProducts.map((p) => ({ slug: p.slug }));
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

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
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
        <div className="glass aspect-square flex items-center justify-center relative overflow-hidden">
          <div className="text-7xl opacity-30">
            {product.category === "3d-printed" && "🖨️"}
            {product.category === "fidget-sensory" && "🧩"}
            {product.category === "drinkware" && "🥤"}
            {product.category === "home" && "🏠"}
          </div>
          {product.badge && (
            <div className="absolute top-4 left-4">
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

          <p className="text-zinc-300 leading-relaxed mb-6">{product.description}</p>

          <dl className="space-y-3 text-sm mb-8">
            <div className="flex gap-3">
              <dt className="text-zinc-500 w-28 shrink-0">Materials</dt>
              <dd className="text-zinc-300">{product.materials}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-zinc-500 w-28 shrink-0">Turnaround</dt>
              <dd className="text-zinc-300">{product.turnaround}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-zinc-500 w-28 shrink-0">Made in</dt>
              <dd className="text-zinc-300">Cullman, Alabama</dd>
            </div>
          </dl>

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
            </p>
          </div>

          <div className="glass mt-8 p-5">
            <h3 className="font-medium mb-2">Reviews</h3>
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

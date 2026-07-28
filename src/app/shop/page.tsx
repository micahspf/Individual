import { Suspense } from "react";
import { getCatalogProducts, getCategories } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { ShopFilters } from "@/components/shop-filters";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Shop",
  description: "Browse and filter Individual.com custom products.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : undefined;
  const category = typeof params.category === "string" ? params.category : undefined;
  const sort = typeof params.sort === "string" ? params.sort : "featured";
  const tag = typeof params.tag === "string" ? params.tag : undefined;

  const [products, categories] = await Promise.all([
    getCatalogProducts({ q, category, sort, tag }),
    getCategories(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Shop</h1>
        <p className="mt-2 text-muted-foreground">
          {products.length} product{products.length === 1 ? "" : "s"}
          {category ? ` in ${category}` : ""}
          {tag ? ` · tag: ${tag}` : ""}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <Suspense fallback={null}>
          <ShopFilters categories={categories} />
        </Suspense>
        <div>
          {products.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center">
              <h2 className="text-lg font-semibold">No products found</h2>
              <p className="mt-2 text-muted-foreground">Try a different search or filter.</p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

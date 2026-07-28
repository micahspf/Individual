import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { parseJsonArray } from "@/lib/utils";
import { ProductForm } from "@/components/admin/product-form";

type Props = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);
  if (!product) notFound();

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-semibold">Edit product</h1>
      <ProductForm
        categories={categories}
        initial={{
          id: product.id,
          name: product.name,
          slug: product.slug,
          description: product.description,
          longDescription: product.longDescription || "",
          price: product.price,
          compareAtPrice: product.compareAtPrice?.toString() ?? "",
          images: parseJsonArray(product.images).join("\n"),
          inventory: product.inventory,
          categoryId: product.categoryId,
          featured: product.featured,
          active: product.active,
          tags: parseJsonArray(product.tags).join(", "),
          customizationJson: (() => {
            try {
              return JSON.stringify(JSON.parse(product.customization), null, 2);
            } catch {
              return product.customization;
            }
          })(),
        }}
      />
    </div>
  );
}

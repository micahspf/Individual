import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/product-form";

export const metadata = { title: "Admin · New product" };

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-semibold">New product</h1>
      <ProductForm categories={categories} />
    </div>
  );
}

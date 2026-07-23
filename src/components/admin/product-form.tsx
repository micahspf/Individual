"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toaster";

type Category = { id: string; name: string };

type ProductFormValues = {
  id?: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  price: number;
  compareAtPrice: string;
  images: string;
  inventory: number;
  categoryId: string;
  featured: boolean;
  active: boolean;
  tags: string;
  customizationJson: string;
};

export function ProductForm({
  categories,
  initial,
}: {
  categories: Category[];
  initial?: Partial<ProductFormValues>;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<ProductFormValues>({
    name: initial?.name || "",
    slug: initial?.slug || "",
    description: initial?.description || "",
    longDescription: initial?.longDescription || "",
    price: initial?.price ?? 0,
    compareAtPrice: initial?.compareAtPrice ?? "",
    images: initial?.images || "",
    inventory: initial?.inventory ?? 0,
    categoryId: initial?.categoryId || categories[0]?.id || "",
    featured: initial?.featured ?? false,
    active: initial?.active ?? true,
    tags: initial?.tags || "customizable",
    customizationJson:
      initial?.customizationJson ||
      JSON.stringify(
        {
          allowText: true,
          allowImage: true,
          allowColor: true,
          textMaxLength: 40,
          colors: ["#111111", "#ffffff", "#c45c26"],
        },
        null,
        2
      ),
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      let customization = {};
      try {
        customization = JSON.parse(form.customizationJson);
      } catch {
        throw new Error("Customization JSON is invalid");
      }

      const payload = {
        name: form.name,
        slug: form.slug,
        description: form.description,
        longDescription: form.longDescription,
        price: Number(form.price),
        compareAtPrice: form.compareAtPrice ? Number(form.compareAtPrice) : null,
        images: form.images
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        inventory: Number(form.inventory),
        categoryId: form.categoryId,
        featured: form.featured,
        active: form.active,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        customization,
      };

      const url = initial?.id ? `/api/admin/products/${initial.id}` : "/api/admin/products";
      const method = initial?.id ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      toast(initial?.id ? "Product updated" : "Product created");
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      toast(err instanceof Error ? err.message : "Save failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-3xl space-y-5 rounded-2xl border border-border bg-card p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            required
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
                slug: initial?.id
                  ? form.slug
                  : e.target.value
                      .toLowerCase()
                      .replace(/[^\w\s-]/g, "")
                      .replace(/\s+/g, "-"),
              })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            required
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="categoryId">Category</Label>
          <select
            id="categoryId"
            className="flex h-11 w-full rounded-xl border border-border bg-background px-3 text-sm"
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            required
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="compareAtPrice">Compare-at price</Label>
          <Input
            id="compareAtPrice"
            type="number"
            step="0.01"
            value={form.compareAtPrice}
            onChange={(e) => setForm({ ...form, compareAtPrice: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="inventory">Inventory</Label>
          <Input
            id="inventory"
            type="number"
            required
            value={form.inventory}
            onChange={(e) => setForm({ ...form, inventory: Number(e.target.value) })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="description">Short description</Label>
          <Textarea
            id="description"
            required
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="longDescription">Long description</Label>
          <Textarea
            id="longDescription"
            value={form.longDescription}
            onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="images">Image URLs (one per line)</Label>
          <Textarea
            id="images"
            required
            value={form.images}
            onChange={(e) => setForm({ ...form, images: e.target.value })}
            placeholder="https://..."
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="customizationJson">Customization config (JSON)</Label>
          <Textarea
            id="customizationJson"
            className="min-h-[160px] font-mono text-xs"
            value={form.customizationJson}
            onChange={(e) => setForm({ ...form, customizationJson: e.target.value })}
          />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => setForm({ ...form, active: e.target.checked })}
          />
          Active
        </label>
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Saving…" : initial?.id ? "Update product" : "Create product"}
      </Button>
    </form>
  );
}

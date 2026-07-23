import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  longDescription: z.string().optional(),
  price: z.number().positive().optional(),
  compareAtPrice: z.number().positive().nullable().optional(),
  images: z.array(z.string()).optional(),
  inventory: z.number().int().min(0).optional(),
  categoryId: z.string().optional(),
  featured: z.boolean().optional(),
  active: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  customization: z.record(z.string(), z.unknown()).optional(),
});

async function requireAdminApi() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return null;
  return session;
}

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, ctx: Ctx) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid product data" }, { status: 400 });
    }

    const d = parsed.data;
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(d.name != null ? { name: d.name } : {}),
        ...(d.slug != null ? { slug: d.slug } : {}),
        ...(d.description != null ? { description: d.description } : {}),
        ...(d.longDescription != null ? { longDescription: d.longDescription } : {}),
        ...(d.price != null ? { price: d.price } : {}),
        ...(d.compareAtPrice !== undefined ? { compareAtPrice: d.compareAtPrice } : {}),
        ...(d.images ? { images: JSON.stringify(d.images) } : {}),
        ...(d.inventory != null ? { inventory: d.inventory } : {}),
        ...(d.categoryId ? { categoryId: d.categoryId } : {}),
        ...(d.featured != null ? { featured: d.featured } : {}),
        ...(d.active != null ? { active: d.active } : {}),
        ...(d.tags ? { tags: JSON.stringify(d.tags) } : {}),
        ...(d.customization ? { customization: JSON.stringify(d.customization) } : {}),
      },
    });

    return NextResponse.json({ product });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, ctx: Ctx) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

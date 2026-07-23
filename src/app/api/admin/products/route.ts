import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1).optional(),
  description: z.string().min(1),
  longDescription: z.string().optional(),
  price: z.number().positive(),
  compareAtPrice: z.number().positive().nullable().optional(),
  images: z.array(z.string()).min(1),
  inventory: z.number().int().min(0),
  categoryId: z.string(),
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

export async function POST(req: Request) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid product data" }, { status: 400 });
    }

    const data = parsed.data;
    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug || slugify(data.name),
        description: data.description,
        longDescription: data.longDescription,
        price: data.price,
        compareAtPrice: data.compareAtPrice ?? null,
        images: JSON.stringify(data.images),
        inventory: data.inventory,
        categoryId: data.categoryId,
        featured: data.featured ?? false,
        active: data.active ?? true,
        tags: JSON.stringify(data.tags ?? []),
        customization: JSON.stringify(data.customization ?? {}),
      },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Create failed" }, { status: 500 });
  }
}

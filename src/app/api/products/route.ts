import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { mapProduct } from "@/lib/products";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ids = (searchParams.get("ids") || "").split(",").filter(Boolean);

  if (ids.length === 0) {
    return NextResponse.json({ products: [] });
  }

  const products = await prisma.product.findMany({
    where: { id: { in: ids }, active: true },
    include: { category: true, variants: true, reviews: { select: { rating: true } } },
  });

  return NextResponse.json({ products: products.map(mapProduct) });
}

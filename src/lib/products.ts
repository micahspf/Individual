import { prisma } from "@/lib/prisma";
import { parseJsonArray, parseJsonObject } from "@/lib/utils";

export type CustomizationConfig = {
  allowText?: boolean;
  allowImage?: boolean;
  allowColor?: boolean;
  textMaxLength?: number;
  colors?: string[];
  notes?: string;
};

export type ProductDTO = {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string | null;
  price: number;
  compareAtPrice: number | null;
  images: string[];
  featured: boolean;
  active: boolean;
  inventory: number;
  tags: string[];
  customization: CustomizationConfig;
  category: { id: string; name: string; slug: string };
  variants: {
    id: string;
    name: string;
    value: string;
    priceDiff: number;
    inventory: number;
    sku: string | null;
  }[];
  averageRating?: number;
  reviewCount?: number;
};

export function mapProduct(
  product: {
    id: string;
    name: string;
    slug: string;
    description: string;
    longDescription: string | null;
    price: number;
    compareAtPrice: number | null;
    images: string;
    featured: boolean;
    active: boolean;
    inventory: number;
    tags: string;
    customization: string;
    category: { id: string; name: string; slug: string };
    variants?: {
      id: string;
      name: string;
      value: string;
      priceDiff: number;
      inventory: number;
      sku: string | null;
    }[];
    reviews?: { rating: number }[];
  }
): ProductDTO {
  const reviews = product.reviews ?? [];
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
      : undefined;

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    longDescription: product.longDescription,
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    images: parseJsonArray(product.images),
    featured: product.featured,
    active: product.active,
    inventory: product.inventory,
    tags: parseJsonArray(product.tags),
    customization: parseJsonObject<CustomizationConfig>(product.customization, {}),
    category: product.category,
    variants: product.variants ?? [],
    averageRating,
    reviewCount: reviews.length || undefined,
  };
}

export async function getFeaturedProducts(limit = 8) {
  const products = await prisma.product.findMany({
    where: { active: true, featured: true },
    include: { category: true, variants: true, reviews: { select: { rating: true } } },
    take: limit,
    orderBy: { createdAt: "desc" },
  });
  return products.map(mapProduct);
}

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { products: true } } },
  });
}

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      variants: true,
      reviews: { select: { rating: true } },
    },
  });
  return product ? mapProduct(product) : null;
}

export type CatalogQuery = {
  q?: string;
  category?: string;
  sort?: string;
  min?: number;
  max?: number;
  tag?: string;
};

export async function getCatalogProducts(query: CatalogQuery = {}) {
  const where: Record<string, unknown> = { active: true };

  if (query.category) {
    where.category = { slug: query.category };
  }
  if (query.q) {
    where.OR = [
      { name: { contains: query.q } },
      { description: { contains: query.q } },
      { tags: { contains: query.q } },
    ];
  }
  if (query.min != null || query.max != null) {
    where.price = {
      ...(query.min != null ? { gte: query.min } : {}),
      ...(query.max != null ? { lte: query.max } : {}),
    };
  }
  if (query.tag) {
    where.tags = { contains: query.tag };
  }

  let orderBy: Record<string, string> = { createdAt: "desc" };
  switch (query.sort) {
    case "price-asc":
      orderBy = { price: "asc" };
      break;
    case "price-desc":
      orderBy = { price: "desc" };
      break;
    case "name":
      orderBy = { name: "asc" };
      break;
    case "featured":
      orderBy = { featured: "desc" };
      break;
    default:
      orderBy = { createdAt: "desc" };
  }

  const products = await prisma.product.findMany({
    where,
    include: { category: true, variants: true, reviews: { select: { rating: true } } },
    orderBy,
  });

  return products.map(mapProduct);
}

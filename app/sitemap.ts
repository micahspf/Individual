import type { MetadataRoute } from "next";
import { shopProducts } from "@/lib/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.madebyindividual.com";
  const now = new Date();

  const staticRoutes = [
    "",
    "/shop",
    "/about",
    "/contact",
    "/faq",
    "/shipping",
    "/returns",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" || path === "/shop" ? 1 : 0.7,
  }));

  const productRoutes = shopProducts.map((p) => ({
    url: `${base}/shop/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}

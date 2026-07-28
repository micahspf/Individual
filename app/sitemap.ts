import type { MetadataRoute } from "next";

const base = "https://www.madebyindividual.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}

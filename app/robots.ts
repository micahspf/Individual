import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/account", "/checkout", "/orders/track", "/api/"],
    },
    sitemap: "https://www.madebyindividual.com/sitemap.xml",
  };
}

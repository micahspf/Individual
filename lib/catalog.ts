/**
 * Catalog tab definitions for /shop and the homepage strip.
 *
 * Three kinds of tab:
 *  - "all"      → every shop product
 *  - "computed" → Trending (curated flag) and For You (on-device history)
 *  - "category" → filters products by `category`; tabs whose category has no
 *                 products yet render a made-to-order invite instead of a grid
 *
 * The `cat` URL param on /shop accepts any tab id here, plus legacy ids
 * (drinkware, 3d-printed, custom) that keep old links working.
 */

export interface CatalogTab {
  id: string;
  label: string;
  /** Emoji — big, friendly, readable at a glance */
  icon: string;
  kind: "all" | "computed" | "category";
  /** For kind "category": the Product.category value this tab filters on */
  category?: string;
}

export const catalogTabs: CatalogTab[] = [
  { id: "all", label: "Everything", icon: "✨", kind: "all" },
  { id: "trending", label: "Trending", icon: "🔥", kind: "computed" },
  { id: "for-you", label: "For You", icon: "💖", kind: "computed" },
  { id: "home-office", label: "Home / Office", icon: "🏠", kind: "category", category: "home" },
  { id: "fidget-sensory", label: "Fidget / Sensory", icon: "🌀", kind: "category", category: "fidget-sensory" },
  { id: "mystery-boxes", label: "Mystery Boxes", icon: "🎁", kind: "category", category: "mystery-boxes" },
  { id: "tools", label: "Tools", icon: "🔧", kind: "category", category: "tools" },
  { id: "hobby-diy", label: "Hobby & DIY", icon: "🎨", kind: "category", category: "hobby-diy" },
  { id: "art", label: "Art", icon: "🖼️", kind: "category", category: "art" },
  { id: "miniatures", label: "Miniatures", icon: "🏰", kind: "category", category: "miniatures" },
  { id: "props-cosplay", label: "Props & Cosplay", icon: "⚔️", kind: "category", category: "props-cosplay" },
];

/** Legacy ?cat= values from older links (homepage, footer, emails). */
export const legacyCategoryParams: Record<string, string> = {
  drinkware: "drinkware",
  home: "home",
  "3d-printed": "3d-printed",
};

export function findTab(id: string): CatalogTab | undefined {
  return catalogTabs.find((t) => t.id === id);
}

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  badge?: string;
  slug: string;
  createdAt?: number;
  description: string;
};

export const ALL_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Custom Name Plate",
    price: 28,
    category: "3d-printed",
    badge: "Bestseller",
    slug: "custom-name-plate",
    createdAt: 12,
    description:
      "3D-printed name plate made to order. Choose name, size, and color — we print only yours.",
  },
  {
    id: "2",
    name: "Soft Squishy Buddy",
    price: 18,
    category: "viral-toys",
    badge: "Viral",
    slug: "soft-squishy-buddy",
    createdAt: 11,
    description: "Soft, squishy desk buddy with that bubbly Individual energy.",
  },
  {
    id: "3",
    name: "Bubbly Hoodie",
    price: 52,
    category: "apparel",
    badge: "New",
    slug: "bubbly-hoodie",
    createdAt: 10,
    description: "Cozy hoodie ready for custom text or artwork. Made to order.",
  },
  {
    id: "4",
    name: "Good Vibes Mug",
    price: 24,
    category: "drinkware",
    slug: "good-vibes-mug",
    createdAt: 9,
    description: "Ceramic mug with custom print options. Perfect gift energy.",
  },
  {
    id: "5",
    name: "Desk Organizer Pro",
    price: 34,
    category: "home",
    slug: "desk-organizer-pro",
    createdAt: 8,
    description: "3D-printed desk organizer — tidy, custom, and made only when ordered.",
  },
  {
    id: "6",
    name: "Mini Articulated Dragon",
    price: 22,
    category: "3d-printed",
    badge: "Popular",
    slug: "mini-dragon",
    createdAt: 7,
    description: "Flexi articulated dragon print. Fun display piece, printed to order.",
  },
  {
    id: "7",
    name: "Stress Blob",
    price: 14,
    category: "viral-toys",
    slug: "stress-blob",
    createdAt: 6,
    description: "Squishable stress blob for desks, bags, and good vibes only.",
  },
  {
    id: "8",
    name: "Custom Cap",
    price: 29,
    category: "apparel",
    slug: "custom-cap",
    createdAt: 5,
    description: "Cap with room for custom embroidery or print. Made when you order.",
  },
  {
    id: "9",
    name: "Personal Tumbler",
    price: 32,
    category: "drinkware",
    badge: "Gift Ready",
    slug: "personal-tumbler",
    createdAt: 4,
    description: "Insulated tumbler with custom name or design options.",
  },
  {
    id: "10",
    name: "LED Name Light",
    price: 45,
    category: "home",
    badge: "Premium",
    slug: "led-name-light",
    createdAt: 3,
    description: "LED name light for shelves and rooms. Custom spelling, made to order.",
  },
  {
    id: "11",
    name: "Flexi Octopus",
    price: 16,
    category: "3d-printed",
    slug: "flexi-octopus",
    createdAt: 2,
    description: "Flexible octopus print — fidget-friendly and cute.",
  },
  {
    id: "12",
    name: "Mystery Squish Pack",
    price: 27,
    category: "viral-toys",
    badge: "Limited",
    slug: "mystery-squish",
    createdAt: 1,
    description: "Surprise pack of squishy fun. Limited drops, made in small batches.",
  },
];

export function getProductBySlug(slug: string) {
  return ALL_PRODUCTS.find((p) => p.slug === slug) || null;
}

export function getCategoryLabel(category: string) {
  const map: Record<string, string> = {
    "3d-printed": "3D Printed",
    "viral-toys": "Viral Toys",
    apparel: "Apparel",
    drinkware: "Drinkware",
    home: "Home",
  };
  return map[category] || category;
}

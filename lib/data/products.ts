export type EditionType = 'founders' | 'nova' | 'one-time' | null;

export const PRODUCT_IMAGE_PLACEHOLDER = '/products/placeholder.avif';

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  badge?: string;
  description: string;
  materials: string;
  turnaround: string;
  /** Local path under /public, e.g. /products/{slug}.avif */
  image: string;
  isTokenOnly?: boolean;
  tokenPrice?: number;
  edition?: EditionType;
  /** Real remaining count only — never invent scarcity. */
  remainingQuantity?: number;
}

function img(slug: string): string {
  return `/products/${slug}.avif`;
}

/**
 * Shop catalog — made to order in Cullman, AL.
 * Turnarounds: 7–10 days. Images: drop raw into raw-photos/{slug}.jpg → npm run images.
 * Until a product photo exists, next/image falls back to placeholder via onError or shared path.
 */
export const products: Product[] = [
  {
    id: '1',
    name: 'Personalized Tumbler',
    slug: 'personalized-tumbler',
    price: 32,
    category: 'drinkware',
    badge: 'Signature',
    description:
      'Stainless tumbler with permanent engraved personalization — name, date, short message, or coordinates. Built for daily use and gifting.',
    materials: 'Stainless steel, precision engraved',
    turnaround: '7–10 days',
    image: img('personalized-tumbler'),
  },
  {
    id: '2',
    name: 'Personalized Can Cooler',
    slug: 'personalized-can-cooler',
    price: 28,
    category: 'drinkware',
    description:
      'Slim can cooler with custom engraving. Clean finish for outdoor use and corporate or personal gifts.',
    materials: 'Stainless steel, precision engraved',
    turnaround: '7–10 days',
    image: img('personalized-can-cooler'),
  },
  {
    id: '3',
    name: 'Custom Wood Sign',
    slug: 'custom-wood-sign',
    price: 45,
    category: 'home',
    badge: 'Popular',
    description:
      'Cut and engraved wood sign for home or business. Family name, location, scripture, or custom typography.',
    materials: 'Basswood / birch, cut + engraved',
    turnaround: '7–10 days',
    image: img('custom-wood-sign'),
  },
  {
    id: '4',
    name: 'Smith Lake Sign',
    slug: 'smith-lake-sign',
    price: 38,
    category: 'home',
    description:
      'Lake-house wood sign for Smith Lake. Personalize with dock name or coordinates.',
    materials: 'Basswood, precision engraved',
    turnaround: '7–10 days',
    image: img('smith-lake-sign'),
  },
  {
    id: '5',
    name: 'Articulated Form Set (12)',
    slug: 'flexi-animal-multipack-12',
    price: 18,
    category: '3d-printed',
    badge: 'Small batch',
    description:
      'Set of twelve articulated forms in durable polymer. Suitable for display, events, or bulk gifts.',
    materials: 'Polymer (single-piece fabrication)',
    turnaround: '7–10 days',
    image: img('flexi-animal-multipack-12'),
  },
  {
    id: '6',
    name: 'Articulated Form Set (25)',
    slug: 'flexi-animal-multipack-25',
    price: 24,
    category: '3d-printed',
    description:
      'Larger set of articulated polymer forms for events, offices, or wholesale-style gifting.',
    materials: 'Polymer (single-piece fabrication)',
    turnaround: '7–10 days',
    image: img('flexi-animal-multipack-25'),
  },
  {
    id: '7',
    name: 'Pet ID Tag',
    slug: 'pet-id-tag',
    price: 16,
    category: 'home',
    description:
      'Metal pet ID tag with engraved name and phone number. Local Cullman pickup available.',
    materials: 'Anodized aluminum, precision engraved',
    turnaround: '7–10 days',
    image: img('pet-id-tag'),
  },
  {
    id: '8',
    name: 'Desk Slider',
    slug: 'fidget-slider',
    price: 12,
    category: 'fidget-sensory',
    description:
      'Smooth single-piece desk slider. Compact polymer tool for focus at the desk. Ages 13+.',
    materials: 'Polymer or flexible polymer',
    turnaround: '7–10 days',
    image: img('fidget-slider'),
  },
  {
    id: '9',
    name: 'Multi-Mechanism Desk Board',
    slug: 'fidget-board',
    price: 18,
    category: 'fidget-sensory',
    description: 'Compact desk board with multiple mechanisms. Ages 13+.',
    materials: 'Polymer',
    turnaround: '7–10 days',
    image: img('fidget-board'),
  },
  {
    id: '10',
    name: 'Founders Name Plate',
    slug: 'founders-name-plate',
    price: 0,
    category: '3d-printed',
    isTokenOnly: true,
    tokenPrice: 80,
    edition: 'founders',
    description:
      'Founders Edition name plate for early customers. Token exclusives return when rewards launches with a real database.',
    materials: 'Polymer / specialty filament',
    turnaround: '7–10 days',
    image: img('founders-name-plate'),
  },
  {
    id: '11',
    name: 'Nova Desk Piece',
    slug: 'nova-desk-piece',
    price: 0,
    category: '3d-printed',
    isTokenOnly: true,
    tokenPrice: 120,
    edition: 'nova',
    description: 'Nova Edition desk piece. Token-only drop — paused until rewards storage ships.',
    materials: 'Premium polymer',
    turnaround: '7–10 days',
    image: img('nova-desk-piece'),
  },
];

/** Products visible in the shop (cash catalog only). */
export const shopProducts = products.filter((p) => !p.isTokenOnly);

export const categories = [
  { id: 'all', label: 'All', icon: '·' },
  { id: 'drinkware', label: 'Drinkware', icon: '·' },
  { id: 'home', label: 'Home', icon: '·' },
  { id: '3d-printed', label: 'Fabricated', icon: '·' },
  { id: 'fidget-sensory', label: 'Accessories', icon: '·' },
  { id: 'custom', label: 'Commission', icon: '·' },
];

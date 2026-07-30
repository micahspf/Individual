export type EditionType = 'founders' | 'nova' | 'one-time' | null;

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
  isTokenOnly?: boolean;
  tokenPrice?: number;
  edition?: EditionType;
  remainingQuantity?: number;
}

export const products: Product[] = [
  // 1. Lead product — Personalized Drinkware
  {
    id: '1',
    name: 'Personalized Tumbler',
    slug: 'personalized-tumbler',
    price: 32,
    category: 'drinkware',
    badge: 'Lead Product',
    description: 'Custom laser-engraved tumbler. Add a name, date, short message, or lake coordinates. Perfect for Smith Lake days, tailgates, and gifts.',
    materials: 'Stainless steel, laser engraved',
    turnaround: '2–4 days',
  },
  {
    id: '2',
    name: 'Personalized Can Cooler',
    slug: 'personalized-can-cooler',
    price: 28,
    category: 'drinkware',
    description: 'Slim can cooler with your custom engraving. Ideal for boat days and game-day gifting.',
    materials: 'Stainless steel, laser engraved',
    turnaround: '2–4 days',
  },

  // 2. Custom wood signs
  {
    id: '3',
    name: 'Custom Wood Sign',
    slug: 'custom-wood-sign',
    price: 45,
    category: 'home',
    badge: 'Popular',
    description: 'Laser-cut and engraved wood sign. Family name, Smith Lake, Scripture, or German-heritage designs available.',
    materials: 'Basswood / birch, laser cut + engraved',
    turnaround: '3–5 days',
  },
  {
    id: '4',
    name: 'Smith Lake Sign',
    slug: 'smith-lake-sign',
    price: 38,
    category: 'home',
    description: 'Lake-house ready wood sign celebrating Smith Lake. Personalize with your dock name or coordinates.',
    materials: 'Basswood, laser engraved',
    turnaround: '3–5 days',
  },

  // 3. Flexi animal multipacks
  {
    id: '5',
    name: 'Flexi Animal Multipack (12 pc)',
    slug: 'flexi-animal-multipack-12',
    price: 18,
    category: '3d-printed',
    badge: 'Party Favors',
    description: 'Articulated flexi animals printed in colorful PLA. Perfect for birthday goodie bags, classroom rewards, and VBS.',
    materials: 'PLA (print-in-place)',
    turnaround: '3–5 days',
  },
  {
    id: '6',
    name: 'Flexi Animal Multipack (25 pc)',
    slug: 'flexi-animal-multipack-25',
    price: 24,
    category: '3d-printed',
    description: 'Larger multipack of articulated animals. Great for parties and teacher gifts.',
    materials: 'PLA (print-in-place)',
    turnaround: '4–6 days',
  },

  // 4. Pet ID tags
  {
    id: '7',
    name: 'Pet ID Tag',
    slug: 'pet-id-tag',
    price: 16,
    category: 'home',
    badge: 'High Margin',
    description: 'Laser-engraved metal pet ID tag. Name + phone number. Fast local turnaround.',
    materials: 'Anodized aluminum, laser engraved',
    turnaround: '1–2 days',
  },

  // 5. 13+ Fidget & Sensory
  {
    id: '8',
    name: 'Print-in-Place Fidget Slider',
    slug: 'fidget-slider',
    price: 12,
    category: 'fidget-sensory',
    description: 'Smooth print-in-place fidget slider. Marketed for ages 13+. Great desk or backpack item.',
    materials: 'PLA or TPU',
    turnaround: '2–4 days',
  },
  {
    id: '9',
    name: 'Multi-Mechanism Fidget Board',
    slug: 'fidget-board',
    price: 18,
    category: 'fidget-sensory',
    description: 'Compact fidget board with multiple mechanisms. Ages 13+.',
    materials: 'PLA',
    turnaround: '3–5 days',
  },

  // Token / exclusive examples
  {
    id: '10',
    name: 'Founders Name Plate',
    slug: 'founders-name-plate',
    price: 0,
    category: '3d-printed',
    isTokenOnly: true,
    tokenPrice: 80,
    edition: 'founders',
    remainingQuantity: 47,
    description: 'Exclusive Founders Edition name plate. Available only with Individual Tokens.',
    materials: 'PLA / specialty filament',
    turnaround: '4–7 days',
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
    remainingQuantity: 18,
    description: 'Limited Nova Edition desk piece. Token-only drop.',
    materials: 'Premium filament',
    turnaround: '5–8 days',
  },
];

export const categories = [
  { id: 'all', label: 'All', icon: '✦' },
  { id: '3d-printed', label: '3D Printed', icon: '🖨️' },
  { id: 'fidget-sensory', label: 'Fidget & Sensory', icon: '🧩' },
  { id: 'drinkware', label: 'Drinkware', icon: '🥤' },
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'custom', label: 'Custom Request', icon: '✨' },
];

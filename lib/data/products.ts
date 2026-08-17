export type EditionType = "founders" | "nova" | "one-time" | null;

export const PRODUCT_IMAGE_PLACEHOLDER = "/products/placeholder.avif";

/**
 * Catalog inspired by personalization gift categories (occasions, home, drinkware, keepsakes)
 * but produced as made-to-order manufacturing by Individual — not mass retail stock.
 */
export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  description: string;
  materials: string;
  turnaround: string;
  /** Local path under /public, e.g. /products/{slug}.avif */
  image: string;
  /** What the customer can personalize — gift-site idea, manufacturer execution */
  personalize?: string[];
  /** When true, Line 1 engraving is required at add-to-cart */
  personalizable?: boolean;
  /** With personalizable: engraving is an optional add-on — blank Line 1 is allowed */
  personalizationOptional?: boolean;
  maxChars?: number;
  /** Occasion / gift framing (display only) */
  occasions?: string[];
  isTokenOnly?: boolean;
  tokenPrice?: number;
  edition?: EditionType;
  /** Real remaining count only — never invent scarcity. */
  remainingQuantity?: number;
  /** Curated: shown in the Trending catalog tab. Edit freely — no data behind it yet. */
  trending?: boolean;
}

import availableImages from "./product-images.json";

/** Slugs that actually have a photo in /public/products (see npm run images). */
const imageSet = new Set<string>(availableImages);

/**
 * Product photo path, or the neutral placeholder when no photo exists yet —
 * avoids a guaranteed 404 per card. `npm run images` regenerates the manifest.
 */
function img(slug: string): string {
  return imageSet.has(slug) ? `/products/${slug}.avif` : PRODUCT_IMAGE_PLACEHOLDER;
}

/**
 * Shop catalog — made to order in Cullman, AL.
 * Turnarounds: 7–10 days. Images: drop raw into raw-photos/{slug}.jpg → npm run images.
 */
export const products: Product[] = [
  {
    id: "1",
    name: "Personalized Tumbler",
    slug: "personalized-tumbler",
    trending: true,
    price: 32,
    category: "drinkware",
    description:
      "Insulated stainless tumbler with permanent engraved personalization — the everyday gift that feels intentional. Name, monogram, short message, date, or lake coordinates.",
    materials: "Stainless steel, precision engraved",
    turnaround: "7–10 days",
    image: img("personalized-tumbler"),
    personalizable: true,
    maxChars: 30,
    personalize: ["Name or monogram", "Short message (up to ~30 characters)", "Date or coordinates", "Optional second line"],
    occasions: ["Birthday", "Wedding party", "Corporate", "Everyday"],
  },
  {
    id: "2",
    name: "Personalized Can Cooler",
    slug: "personalized-can-cooler",
    trending: true,
    price: 28,
    category: "drinkware",
    description:
      "Slim can cooler with clean custom engraving. Strong for outdoor days, tailgates, groomsmen sets, and host gifts.",
    materials: "Stainless steel, precision engraved",
    turnaround: "7–10 days",
    image: img("personalized-can-cooler"),
    personalizable: true,
    maxChars: 30,
    personalize: ["Name or monogram", "Event or team line", "Year or date"],
    occasions: ["Groomsmen", "Father’s Day", "Outdoor", "Party favors"],
  },
  {
    id: "12",
    name: "Insulated Water Bottle",
    slug: "insulated-water-bottle",
    price: 34,
    category: "drinkware",
    description:
      "Everyday water bottle with engraved name or monogram. A practical personalized gift for work, school, travel, and the gym.",
    materials: "Stainless steel, precision engraved",
    turnaround: "7–10 days",
    image: img("insulated-water-bottle"),
    personalizable: true,
    maxChars: 30,
    personalize: ["Name or monogram", "Optional short motto", "Icon style (simple mark)"],
    occasions: ["Back to school", "Corporate", "Fitness", "Everyday"],
  },
  {
    id: "13",
    name: "Engraved Coffee Mug",
    slug: "engraved-coffee-mug",
    price: 22,
    category: "drinkware",
    description:
      "Ceramic or stainless mug options with permanent engraving or marking. Classic personalized gift for desk, kitchen, and “world’s best…” moments — without the cliché if you prefer understated type.",
    materials: "Ceramic or stainless, precision marked",
    turnaround: "7–10 days",
    image: img("engraved-coffee-mug"),
    personalizable: true,
    maxChars: 30,
    personalize: ["Name or monogram", "Title or role", "Short phrase", "Date"],
    occasions: ["Teacher", "Office", "Birthday", "Housewarming"],
  },
  {
    id: "3",
    name: "Family Name Wood Sign",
    slug: "custom-wood-sign",
    trending: true,
    price: 45,
    category: "home",
    description:
      "Cut and engraved wood sign for the entry, mantle, or lake house. Family name, established year, scripture line, or custom typography — housewarming and wedding favorites.",
    materials: "Basswood / birch, cut + engraved",
    turnaround: "7–10 days",
    image: img("custom-wood-sign"),
    personalizable: true,
    maxChars: 30,
    personalize: ["Family or last name", "Established year", "Optional subtitle", "Scripture or short quote"],
    occasions: ["Housewarming", "Wedding", "Anniversary", "Holiday"],
  },
  {
    id: "4",
    name: "Smith Lake Sign",
    slug: "smith-lake-sign",
    price: 38,
    category: "home",
    description:
      "Lake-house wood sign celebrating Smith Lake. Personalize with dock name, family name, or coordinates — local keepsake energy with clean manufacturer finish.",
    materials: "Basswood, precision engraved",
    turnaround: "7–10 days",
    image: img("smith-lake-sign"),
    personalizable: true,
    maxChars: 30,
    personalize: ["Dock or family name", "Coordinates", "Optional year"],
    occasions: ["Lake house", "Housewarming", "Anniversary"],
  },
  {
    id: "14",
    name: "Engraved Cutting Board",
    slug: "engraved-cutting-board",
    price: 48,
    category: "home",
    description:
      "Hardwood cutting board with deep engraved monogram, couple names, or recipe dedication. Kitchen gift that looks custom without looking mass-market.",
    materials: "Maple or birch, precision engraved",
    turnaround: "7–10 days",
    image: img("engraved-cutting-board"),
    personalizable: true,
    maxChars: 30,
    personalize: ["Monogram or names", "Established date", "Optional short dedication"],
    occasions: ["Wedding", "Anniversary", "Housewarming", "Host gift"],
  },
  {
    id: "15",
    name: "Monogram Coaster Set (4)",
    slug: "monogram-coaster-set",
    price: 28,
    category: "home",
    description:
      "Set of four coasters with matching monogram or family initial. Entertaining essential and easy multi-pack gift.",
    materials: "Wood or polymer, precision engraved",
    turnaround: "7–10 days",
    image: img("monogram-coaster-set"),
    personalizable: true,
    maxChars: 30,
    personalize: ["Initial or monogram", "Optional family name on reverse style note"],
    occasions: ["Housewarming", "Wedding", "Bar cart", "Host gift"],
  },
  {
    id: "16",
    name: "Welcome Doormat Plate",
    slug: "welcome-doormat-plate",
    price: 36,
    category: "home",
    description:
      "Durable outdoor-ready name plate for the porch or entry — family name, house number, or short welcome line. Manufactured to order for a personalized first impression.",
    materials: "Weather-resistant polymer or aluminum, precision marked",
    turnaround: "7–10 days",
    image: img("welcome-doormat-plate"),
    personalizable: true,
    maxChars: 30,
    personalize: ["Family name", "House number", "Short welcome line"],
    occasions: ["Housewarming", "Wedding gift", "New home"],
  },
  {
    id: "17",
    name: "Couple Keepsake Sign",
    slug: "couple-keepsake-sign",
    price: 42,
    category: "home",
    description:
      "Two names, a date, and optional coordinates or venue city — engagement, anniversary, and wedding gift ready. Clean type, permanent finish.",
    materials: "Basswood or birch, precision engraved",
    turnaround: "7–10 days",
    image: img("couple-keepsake-sign"),
    personalizable: true,
    maxChars: 30,
    personalize: ["Two names", "Wedding or anniversary date", "City or coordinates", "Optional short line"],
    occasions: ["Engagement", "Wedding", "Anniversary"],
  },
  {
    id: "18",
    name: "Memorial Garden Plaque",
    slug: "memorial-garden-plaque",
    price: 40,
    category: "home",
    description:
      "Thoughtful outdoor or garden plaque with name, dates, and a short remembrance line. Quiet design, permanent engraving — made only when ordered.",
    materials: "Weather-resistant material, precision engraved",
    turnaround: "7–10 days",
    image: img("memorial-garden-plaque"),
    personalizable: true,
    maxChars: 30,
    personalize: ["Name", "Years", "Short remembrance line (optional)"],
    occasions: ["Memorial", "Sympathy", "Pet memorial"],
  },
  {
    id: "7",
    name: "Pet ID Tag",
    slug: "pet-id-tag",
    trending: true,
    price: 16,
    category: "home",
    description:
      "Metal pet ID tag with engraved name and phone number. Practical personalization for everyday wear; local Cullman pickup available.",
    materials: "Anodized aluminum, precision engraved",
    turnaround: "7–10 days",
    image: img("pet-id-tag"),
    personalizable: true,
    maxChars: 30,
    personalize: ["Pet name", "Phone number", "Optional second contact line"],
    occasions: ["Pet gift", "Everyday"],
  },
  {
    id: "19",
    name: "Bag Tag / Keychain",
    slug: "bag-tag-keychain",
    price: 14,
    category: "home",
    description:
      "Engraved bag tag or keychain with name, monogram, or short ID line. Backpack, luggage, keys, and party-favor friendly in small batches.",
    materials: "Aluminum or polymer, precision engraved",
    turnaround: "7–10 days",
    image: img("bag-tag-keychain"),
    personalizable: true,
    maxChars: 30,
    personalize: ["Name or monogram", "Phone or short ID", "Optional icon mark"],
    occasions: ["Back to school", "Travel", "Team gifts", "Party favors"],
  },
  {
    id: "20",
    name: "Desk Name Plate",
    slug: "desk-name-plate",
    price: 26,
    category: "home",
    description:
      "Professional desk name plate with engraved name and optional title. Office, reception, and graduation gift that reads manufacturer-made, not novelty.",
    materials: "Wood or polymer base, precision engraved plate",
    turnaround: "7–10 days",
    image: img("desk-name-plate"),
    personalizable: true,
    maxChars: 30,
    personalize: ["Full name", "Title or role", "Optional company line"],
    occasions: ["Office", "Graduation", "Promotion", "Corporate"],
  },

  // —— Fidget & Sensory (custom / blank-friendly ideas you can source + finish) ——
  {
    id: "8",
    name: "Click Slider",
    slug: "fidget-slider",
    price: 14,
    category: "fidget-sensory",
    description:
      "Smooth single-piece click slider for quiet desk focus. Optional engraved initials. Ages 13+.",
    materials: "Polymer or flexible polymer",
    turnaround: "7–10 days",
    image: img("fidget-slider"),
    personalizable: true,
    personalizationOptional: true,
    maxChars: 30,
    personalize: ["Optional monogram or initials", "Color preference"],
    occasions: ["Desk", "Office", "Everyday"],
  },
  {
    id: "9",
    name: "Multi-Mechanism Fidget Board",
    slug: "fidget-board",
    price: 22,
    category: "fidget-sensory",
    description:
      "Compact board with several click / slide / spin mechanisms in one tool. Built for focus at work or study. Ages 13+.",
    materials: "Polymer + metal hardware",
    turnaround: "7–10 days",
    image: img("fidget-board"),
    personalize: ["Optional engraved initials on base", "Color preference"],
    occasions: ["Desk", "Office", "Study"],
  },
  {
    id: "30",
    name: "Custom Squish — Choice Fill",
    slug: "custom-squish-choice-fill",
    trending: true,
    price: 18,
    category: "fidget-sensory",
    description:
      "Soft silicone squish shell with your choice of fill: foam beads, microbeads, cotton puff, or weighted sand-style fill. Pick shell color and optional name/initials tag. Sourced blank, finished and labeled to order. Ages 13+ (small parts).",
    materials: "Silicone shell + selected fill (FOAM · BEADS · COTTON · WEIGHTED)",
    turnaround: "7–10 days",
    image: img("custom-squish-choice-fill"),
    personalize: [
      "Shell color",
      "Fill type: foam beads / microbeads / cotton / weighted",
      "Optional name or initials tag",
      "Firmness preference (soft / medium / firm)",
    ],
    occasions: ["Sensory", "Desk", "Party favor", "Gift"],
  },
  {
    id: "31",
    name: "Custom Stress Ball",
    slug: "custom-stress-ball",
    price: 12,
    category: "fidget-sensory",
    description:
      "Classic stress ball with optional monogram, short word, or simple mark. Great for teams, offices, and events. Blank-friendly wholesale base, personalized on order.",
    materials: "Soft polyurethane or TPR fill",
    turnaround: "7–10 days",
    image: img("custom-stress-ball"),
    personalizable: true,
    personalizationOptional: true,
    maxChars: 30,
    personalize: ["Color", "Name / monogram / short word", "Optional simple icon"],
    occasions: ["Corporate", "Events", "Desk", "Favor packs"],
  },
  {
    id: "32",
    name: "Pop Case Fidget",
    slug: "pop-case-fidget",
    price: 16,
    category: "fidget-sensory",
    description:
      "Pop-bubble style case or tile with a custom shell color and optional engraved or printed name plate on the frame. Pocket sensory tool. Ages 8+ with supervision for younger users; we market 13+ for small parts.",
    materials: "Silicone + polymer frame",
    turnaround: "7–10 days",
    image: img("pop-case-fidget"),
    personalize: ["Shell color", "Optional name plate", "Size (pocket / full)"],
    occasions: ["Sensory", "Travel", "Back to school"],
  },
  {
    id: "33",
    name: "Sensory Putty Tin",
    slug: "sensory-putty-tin",
    price: 15,
    category: "fidget-sensory",
    description:
      "Therapy-style putty in a metal or polymer tin. Lid engraved or labeled with name, monogram, or short phrase. Choose soft / medium / firm putty. Ages 13+ (not for mouthing).",
    materials: "Putty + tin / polymer lid (engrave-ready)",
    turnaround: "7–10 days",
    image: img("sensory-putty-tin"),
    personalizable: true,
    personalizationOptional: true,
    maxChars: 30,
    personalize: ["Lid name or monogram", "Putty firmness", "Optional scent note (if available)"],
    occasions: ["Sensory", "Desk", "Gift"],
  },
  {
    id: "34",
    name: "Marble Mesh Duo",
    slug: "marble-mesh-duo",
    price: 11,
    category: "fidget-sensory",
    description:
      "Two mesh-and-marble sensory tubes — quiet, pocketable, endless roll. Optional custom color pair and small ID tag. Wholesale-friendly base with our finish. Ages 13+ (choking hazard).",
    materials: "Mesh sleeve + marble",
    turnaround: "7–10 days",
    image: img("marble-mesh-duo"),
    personalize: ["Color pair", "Optional small name tag"],
    occasions: ["Sensory", "Travel", "Classroom reward (13+)"],
  },
  {
    id: "35",
    name: "Infinity Cube",
    slug: "infinity-cube",
    price: 14,
    category: "fidget-sensory",
    description:
      "Folding infinity cube in your color choice. Optional engraved side plate with initials. Solid desk fidget, ages 13+.",
    materials: "ABS polymer (optional metal pin set)",
    turnaround: "7–10 days",
    image: img("infinity-cube"),
    personalize: ["Color", "Optional initials plate"],
    occasions: ["Desk", "Office", "Gift"],
  },
  {
    id: "36",
    name: "Magnetic Fidget Slider",
    slug: "magnetic-fidget-slider",
    price: 20,
    category: "fidget-sensory",
    description:
      "Metal or polymer magnetic slider with satisfying click and glide. Optional monogram plate. Quiet enough for meetings. Ages 13+.",
    materials: "Polymer / aluminum + magnets",
    turnaround: "7–10 days",
    image: img("magnetic-fidget-slider"),
    personalizable: true,
    personalizationOptional: true,
    maxChars: 30,
    personalize: ["Finish color", "Optional monogram plate"],
    occasions: ["Desk", "Office", "Gift"],
  },
  {
    id: "37",
    name: "Character Squish Kit",
    slug: "character-squish-kit",
    price: 22,
    category: "fidget-sensory",
    description:
      "Blank character-style squish body (wholesale-friendly shapes) finished with your colorway, face style, and fill choice. Original / generic characters only — no licensed IPs. Ages 13+.",
    materials: "Silicone or TPR + choice fill",
    turnaround: "7–10 days",
    image: img("character-squish-kit"),
    personalize: [
      "Shape / blank style",
      "Fill type",
      "Colorway",
      "Face style (simple painted or sticker-safe)",
      "Optional name tag",
    ],
    occasions: ["Gift", "Party favor", "Sensory"],
  },
  {
    id: "38",
    name: "Quiet Click Pad",
    slug: "quiet-click-pad",
    price: 16,
    category: "fidget-sensory",
    description:
      "Low-profile click pad for under-desk or pocket use — soft tactile feedback without loud snaps. Optional engraved top plate. Ages 13+.",
    materials: "Silicone + polymer plate",
    turnaround: "7–10 days",
    image: img("quiet-click-pad"),
    personalizable: true,
    personalizationOptional: true,
    maxChars: 30,
    personalize: ["Top plate initials", "Color"],
    occasions: ["Desk", "Classroom quiet use", "Travel"],
  },
  {
    id: "39",
    name: "Sensory Favor Pack (6)",
    slug: "sensory-favor-pack-6",
    price: 36,
    category: "fidget-sensory",
    description:
      "Mixed six-pack for parties or small groups: mix of mesh, mini squish, and stress balls. One shared color theme and optional name tags. Ideal when you want bulk without a full custom quote.",
    materials: "Assorted sensory blanks + tags",
    turnaround: "7–10 days",
    image: img("sensory-favor-pack-6"),
    personalize: ["Theme color", "Mix preference", "Optional name tags (list)"],
    occasions: ["Party favors", "Events", "Bulk gifts"],
  },
  {
    id: "5",
    name: "Articulated Form Set (12)",
    slug: "flexi-animal-multipack-12",
    trending: true,
    price: 18,
    category: "3d-printed",
    description:
      "Set of twelve articulated forms in durable polymer. Useful for event favors, display, and bulk gifts when you need a consistent small-batch set.",
    materials: "Polymer (single-piece fabrication)",
    turnaround: "7–10 days",
    image: img("flexi-animal-multipack-12"),
    personalize: ["Color preference", "Optional bulk label card (separate)"],
    occasions: ["Events", "Favors", "Bulk gifts"],
  },
  {
    id: "6",
    name: "Articulated Form Set (25)",
    slug: "flexi-animal-multipack-25",
    price: 24,
    category: "3d-printed",
    description:
      "Larger set of articulated polymer forms for events, offices, or wholesale-style gifting.",
    materials: "Polymer (single-piece fabrication)",
    turnaround: "7–10 days",
    image: img("flexi-animal-multipack-25"),
    personalize: ["Color preference", "Optional bulk label card (separate)"],
    occasions: ["Events", "Favors", "Bulk gifts"],
  },
  {
    id: "21",
    name: "Custom Part / Prototype",
    slug: "custom-part-prototype",
    price: 35,
    category: "3d-printed",
    description:
      "One-off or small-run fabricated part from your brief or file. Functional shapes, jigs, brackets, and display forms — quoted when complexity exceeds this starting price.",
    materials: "Polymer (or as specified)",
    turnaround: "7–10 days",
    image: img("custom-part-prototype"),
    personalize: ["Dimensions", "Material preference", "File or sketch", "Quantity"],
    occasions: ["Commission", "Business", "Repair / replace"],
  },
  {
    id: "10",
    name: "Founders Name Plate",
    slug: "founders-name-plate",
    price: 0,
    category: "3d-printed",
    isTokenOnly: true,
    tokenPrice: 80,
    edition: "founders",
    description:
      "Founders Edition name plate for early customers. Token exclusives return when rewards launches with a real database.",
    materials: "Polymer / specialty filament",
    turnaround: "7–10 days",
    image: img("founders-name-plate"),
  },
  {
    id: "11",
    name: "Nova Desk Piece",
    slug: "nova-desk-piece",
    price: 0,
    category: "3d-printed",
    isTokenOnly: true,
    tokenPrice: 120,
    edition: "nova",
    description:
      "Nova Edition desk piece. Token-only drop — paused until rewards storage ships.",
    materials: "Premium polymer",
    turnaround: "7–10 days",
    image: img("nova-desk-piece"),
  },
];

/** Products visible in the shop (cash catalog only). */
export const shopProducts = products.filter((p) => !p.isTokenOnly);

export const categories = [
  { id: "all", label: "All", icon: "·" },
  { id: "drinkware", label: "Drinkware", icon: "·" },
  { id: "home", label: "Home & gifts", icon: "·" },
  { id: "fidget-sensory", label: "Fidget & Sensory", icon: "·" },
  { id: "3d-printed", label: "Fabricated", icon: "·" },
  { id: "custom", label: "Commission", icon: "·" },
];

/** Occasion chips for homepage / shop inspiration (Personal Creations style, our layout) */
export const giftOccasions = [
  { label: "Wedding & anniversary", href: "/shop?cat=home", hint: "Signs, boards, drinkware sets" },
  { label: "Housewarming", href: "/shop?cat=home", hint: "Family name, coasters, entry plate" },
  { label: "Corporate & bulk", href: "/shop?cat=drinkware", hint: "Tumblers, bottles, name plates" },
  { label: "Fidget & sensory", href: "/shop?cat=fidget-sensory", hint: "Custom squish, stress balls, desk tools" },
  { label: "Memorial", href: "/shop?q=memorial", hint: "Garden plaque, quiet keepsakes" },
  { label: "Full commission", href: "/#request", hint: "Your exact brief, quoted first" },
];

import { PrismaClient, Role, OrderStatus, PaymentStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const categories = [
  {
    name: "Apparel",
    slug: "apparel",
    description: "Premium custom apparel with full personalization.",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80",
  },
  {
    name: "Drinkware",
    slug: "drinkware",
    description: "Mugs, bottles, and tumblers made to order.",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80",
  },
  {
    name: "Home",
    slug: "home",
    description: "Custom prints and home accents.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
  },
  {
    name: "Accessories",
    slug: "accessories",
    description: "Bags, cases, and everyday carry.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
  },
];

type SeedProduct = {
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  featured: boolean;
  inventory: number;
  categorySlug: string;
  tags: string[];
  customization: Record<string, unknown>;
  variants: { name: string; value: string; priceDiff?: number; inventory?: number }[];
};

const products: SeedProduct[] = [
  {
    name: "Custom Premium Tee",
    slug: "custom-premium-tee",
    description: "Soft organic cotton tee with front print personalization.",
    longDescription:
      "Our signature midweight organic cotton tee, cut for a modern fit. Upload your artwork or add custom text — we print with eco-friendly water-based inks that stay vivid wash after wash.",
    price: 38,
    compareAtPrice: 48,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1200&q=80",
    ],
    featured: true,
    inventory: 120,
    categorySlug: "apparel",
    tags: ["bestseller", "customizable"],
    customization: {
      allowText: true,
      allowImage: true,
      allowColor: true,
      textMaxLength: 40,
      colors: ["#111111", "#ffffff", "#1e3a5f", "#8b2942", "#2d6a4f"],
      notes: "Text prints centered on the chest.",
    },
    variants: [
      { name: "Size", value: "S", inventory: 25 },
      { name: "Size", value: "M", inventory: 40 },
      { name: "Size", value: "L", inventory: 35 },
      { name: "Size", value: "XL", inventory: 20 },
    ],
  },
  {
    name: "Monogram Hoodie",
    slug: "monogram-hoodie",
    description: "Heavyweight fleece hoodie with embroidered monogram.",
    longDescription:
      "Brushed interior fleece, reinforced seams, and optional monogram embroidery on the chest or sleeve. Built for cool mornings and brand-worthy gifting.",
    price: 78,
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200&q=80",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=1200&q=80",
    ],
    featured: true,
    inventory: 80,
    categorySlug: "apparel",
    tags: ["new", "embroidery"],
    customization: {
      allowText: true,
      allowImage: false,
      allowColor: true,
      textMaxLength: 12,
      colors: ["#1a1a1a", "#4a5568", "#f5f0e8", "#2c5282"],
      notes: "Monogram up to 3 characters recommended.",
    },
    variants: [
      { name: "Size", value: "S", inventory: 15 },
      { name: "Size", value: "M", inventory: 25 },
      { name: "Size", value: "L", inventory: 25 },
      { name: "Size", value: "XL", inventory: 15 },
    ],
  },
  {
    name: "Engraved Steel Tumbler",
    slug: "engraved-steel-tumbler",
    description: "20oz insulated tumbler with laser engraving.",
    longDescription:
      "Double-wall vacuum insulation keeps drinks cold for 24 hours or hot for 12. Choose finish color and add a name, date, or short message — engraved permanently into the steel.",
    price: 42,
    compareAtPrice: 52,
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=1200&q=80",
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=1200&q=80",
    ],
    featured: true,
    inventory: 200,
    categorySlug: "drinkware",
    tags: ["bestseller", "gift"],
    customization: {
      allowText: true,
      allowImage: false,
      allowColor: true,
      textMaxLength: 30,
      colors: ["#1a1a1a", "#c0c0c0", "#1e3a5f", "#8b4513"],
      notes: "Engraving is permanent and cannot be removed.",
    },
    variants: [
      { name: "Finish", value: "Matte Black", inventory: 80 },
      { name: "Finish", value: "Brushed Steel", inventory: 60 },
      { name: "Finish", value: "Navy", inventory: 40 },
    ],
  },
  {
    name: "Photo Ceramic Mug",
    slug: "photo-ceramic-mug",
    description: "11oz ceramic mug with full-wrap photo print.",
    longDescription:
      "Dishwasher-safe ceramic with vivid sublimation printing. Upload a photo or logo for a wrap-around design — perfect for offices and gifts.",
    price: 24,
    images: [
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=1200&q=80",
      "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=1200&q=80",
    ],
    featured: false,
    inventory: 150,
    categorySlug: "drinkware",
    tags: ["photo", "gift"],
    customization: {
      allowText: true,
      allowImage: true,
      allowColor: false,
      textMaxLength: 50,
      notes: "High-resolution images recommended (min 1500px).",
    },
    variants: [
      { name: "Style", value: "Classic White", inventory: 100 },
      { name: "Style", value: "Black Rim", priceDiff: 4, inventory: 50 },
    ],
  },
  {
    name: "Custom Canvas Print",
    slug: "custom-canvas-print",
    description: "Gallery-wrapped canvas from your photo or design.",
    longDescription:
      "Archival-quality canvas stretched on solid wood frames. Ready to hang with hardware included. Multiple sizes available.",
    price: 68,
    images: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&q=80",
      "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=1200&q=80",
    ],
    featured: true,
    inventory: 60,
    categorySlug: "home",
    tags: ["photo", "wall-art"],
    customization: {
      allowText: true,
      allowImage: true,
      allowColor: false,
      textMaxLength: 80,
      notes: "We will email a proof before printing.",
    },
    variants: [
      { name: "Size", value: '12" × 16"', inventory: 20 },
      { name: "Size", value: '18" × 24"', priceDiff: 30, inventory: 20 },
      { name: "Size", value: '24" × 36"', priceDiff: 70, inventory: 20 },
    ],
  },
  {
    name: "Embroidered Tote",
    slug: "embroidered-tote",
    description: "Heavy canvas tote with custom embroidery.",
    longDescription:
      "14oz canvas, reinforced handles, interior pocket. Add a monogram or short phrase embroidered in your choice of thread color.",
    price: 36,
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1200&q=80",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=1200&q=80",
    ],
    featured: false,
    inventory: 90,
    categorySlug: "accessories",
    tags: ["everyday", "embroidery"],
    customization: {
      allowText: true,
      allowImage: false,
      allowColor: true,
      textMaxLength: 24,
      colors: ["#111111", "#c45c26", "#1e3a5f", "#ffffff"],
      notes: "Embroidery on front panel only.",
    },
    variants: [
      { name: "Color", value: "Natural", inventory: 45 },
      { name: "Color", value: "Black", inventory: 45 },
    ],
  },
  {
    name: "Leather Key Fob",
    slug: "leather-key-fob",
    description: "Full-grain leather fob with stamped initials.",
    longDescription:
      "Vegetable-tanned leather that develops a rich patina. Stamped with up to 3 initials and finished with a solid brass hardware ring.",
    price: 28,
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=1200&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&q=80",
    ],
    featured: false,
    inventory: 110,
    categorySlug: "accessories",
    tags: ["gift", "leather"],
    customization: {
      allowText: true,
      allowImage: false,
      allowColor: false,
      textMaxLength: 3,
      notes: "Initials only — uppercase letters recommended.",
    },
    variants: [
      { name: "Leather", value: "Cognac", inventory: 40 },
      { name: "Leather", value: "Black", inventory: 40 },
      { name: "Leather", value: "Olive", inventory: 30 },
    ],
  },
  {
    name: "Studio Desk Mat",
    slug: "studio-desk-mat",
    description: "Extended desk mat with custom print edge-to-edge.",
    longDescription:
      "Smooth fabric surface, non-slip rubber base. Upload a full-bleed design or choose a solid color with monogram.",
    price: 48,
    images: [
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=1200&q=80",
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=1200&q=80",
    ],
    featured: true,
    inventory: 70,
    categorySlug: "home",
    tags: ["workspace", "customizable"],
    customization: {
      allowText: true,
      allowImage: true,
      allowColor: true,
      textMaxLength: 40,
      colors: ["#111111", "#1e3a5f", "#2d6a4f", "#4a3728"],
      notes: "Image files should be at least 3000×1400px.",
    },
    variants: [
      { name: "Size", value: "Large (36×18)", inventory: 40 },
      { name: "Size", value: "XL (48×20)", priceDiff: 12, inventory: 30 },
    ],
  },
];

async function main() {
  console.log("Seeding Individual database...");

  await prisma.review.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.address.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("password123", 10);

  const admin = await prisma.user.create({
    data: {
      name: "Individual Admin",
      email: "admin@individual.com",
      passwordHash,
      role: Role.ADMIN,
    },
  });

  const customer = await prisma.user.create({
    data: {
      name: "Alex Rivera",
      email: "customer@individual.com",
      passwordHash,
      role: Role.CUSTOMER,
      addresses: {
        create: {
          label: "Home",
          fullName: "Alex Rivera",
          line1: "123 Market Street",
          city: "San Francisco",
          state: "CA",
          postalCode: "94103",
          country: "US",
          phone: "+1 415 555 0100",
          isDefault: true,
        },
      },
    },
  });

  const categoryMap = new Map<string, string>();
  for (const cat of categories) {
    const created = await prisma.category.create({ data: cat });
    categoryMap.set(cat.slug, created.id);
  }

  const createdProducts = [];
  for (const p of products) {
    const categoryId = categoryMap.get(p.categorySlug)!;
    const product = await prisma.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        longDescription: p.longDescription,
        price: p.price,
        compareAtPrice: p.compareAtPrice,
        images: JSON.stringify(p.images),
        featured: p.featured,
        inventory: p.inventory,
        categoryId,
        tags: JSON.stringify(p.tags),
        customization: JSON.stringify(p.customization),
        variants: {
          create: p.variants.map((v) => ({
            name: v.name,
            value: v.value,
            priceDiff: v.priceDiff ?? 0,
            inventory: v.inventory ?? 0,
            sku: `${p.slug}-${v.value}`.toUpperCase().replace(/[^A-Z0-9]+/g, "-"),
          })),
        },
      },
    });
    createdProducts.push(product);
  }

  await prisma.wishlistItem.create({
    data: {
      userId: customer.id,
      productId: createdProducts[0].id,
    },
  });

  await prisma.order.create({
    data: {
      orderNumber: "IND-10001",
      userId: customer.id,
      email: customer.email,
      status: OrderStatus.DELIVERED,
      paymentStatus: PaymentStatus.PAID,
      subtotal: 80,
      shipping: 0,
      tax: 6.4,
      total: 86.4,
      shippingName: "Alex Rivera",
      shippingLine1: "123 Market Street",
      shippingCity: "San Francisco",
      shippingState: "CA",
      shippingPostal: "94103",
      shippingCountry: "US",
      trackingNumber: "1Z999AA10123456784",
      items: {
        create: [
          {
            productId: createdProducts[0].id,
            productName: createdProducts[0].name,
            productImage: JSON.parse(createdProducts[0].images)[0],
            unitPrice: 38,
            quantity: 1,
            variants: JSON.stringify({ Size: "M" }),
            customization: JSON.stringify({ text: "RIVERA", color: "#111111" }),
          },
          {
            productId: createdProducts[2].id,
            productName: createdProducts[2].name,
            productImage: JSON.parse(createdProducts[2].images)[0],
            unitPrice: 42,
            quantity: 1,
            variants: JSON.stringify({ Finish: "Matte Black" }),
            customization: JSON.stringify({ text: "A.R." }),
          },
        ],
      },
    },
  });

  await prisma.order.create({
    data: {
      orderNumber: "IND-10002",
      userId: customer.id,
      email: customer.email,
      status: OrderStatus.PROCESSING,
      paymentStatus: PaymentStatus.PAID,
      subtotal: 78,
      shipping: 8,
      tax: 6.88,
      total: 92.88,
      shippingName: "Alex Rivera",
      shippingLine1: "123 Market Street",
      shippingCity: "San Francisco",
      shippingState: "CA",
      shippingPostal: "94103",
      shippingCountry: "US",
      items: {
        create: [
          {
            productId: createdProducts[1].id,
            productName: createdProducts[1].name,
            productImage: JSON.parse(createdProducts[1].images)[0],
            unitPrice: 78,
            quantity: 1,
            variants: JSON.stringify({ Size: "L" }),
            customization: JSON.stringify({ text: "AR", color: "#1a1a1a" }),
          },
        ],
      },
    },
  });

  console.log("Seed complete.");
  console.log("Admin:    admin@individual.com / password123");
  console.log("Customer: customer@individual.com / password123");
  console.log(`Admin id: ${admin.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

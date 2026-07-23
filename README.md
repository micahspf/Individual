# Individual.com — Premium Custom Retail Platform

A modern, conversion-focused e-commerce platform for selling **custom products**. Built with Next.js App Router, TypeScript, Tailwind CSS, Prisma, NextAuth, Stripe, and Zustand.

## Features

### Storefront
- Premium homepage with hero, categories, and featured products
- Product catalog with search, filters, and sorting
- Product detail pages with image gallery, variants, and personalization (text, color, image upload)
- Persistent cart (Zustand + localStorage)
- Checkout with Stripe (or secure demo mode without keys)
- User accounts, order history, tracking, wishlist
- Light / dark mode
- SEO metadata + Product JSON-LD

### Admin (`/admin`)
- Dashboard analytics (revenue, orders, popular products, low stock)
- Product CRUD with inventory and customization JSON
- Order management (status, payment, tracking)
- Customer list with lifetime spend

## Tech stack

| Layer | Choice |
|-------|--------|
| Frontend | Next.js 16 (App Router), TypeScript, Tailwind CSS 4 |
| Auth | Auth.js / NextAuth v5 (credentials + Prisma adapter) |
| Database | Prisma 6 + SQLite (local) / PostgreSQL (prod) |
| Payments | Stripe Checkout + webhooks |
| State | Zustand (cart, wishlist) |
| Validation | Zod |

## Quick start

```bash
cd Individual
npm install
cp .env.example .env   # already provided as .env for local
npm run db:setup       # generate client, push schema, seed data
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@individual.com` | `password123` |
| Customer | `customer@individual.com` | `password123` |

## Environment variables

See `.env.example`:

- `DATABASE_URL` — SQLite `file:./dev.db` or PostgreSQL connection string
- `AUTH_SECRET` — long random string
- `STRIPE_SECRET_KEY` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` / `STRIPE_WEBHOOK_SECRET` — optional; without them checkout runs in **demo mode** (orders marked paid, no card charge)

## PostgreSQL for production

1. Update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. Set `DATABASE_URL` to your Postgres URL (Neon, Supabase, Railway, etc.)
3. Run `npx prisma db push && npm run db:seed`

## Project structure

```
src/
  app/                 # App Router pages & API routes
    admin/             # Admin dashboard
    api/               # auth, checkout, webhooks, admin CRUD
    shop/ products/ cart/ checkout/ account/ orders/
  components/          # UI, layout, admin forms
  lib/                 # prisma, auth, stripe, products helpers
  store/               # Zustand cart & wishlist
prisma/
  schema.prisma
  seed.ts
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run db:setup` | Generate + migrate + seed |
| `npm run db:seed` | Re-seed demo data |

## Deploy on Vercel

1. Push the repo to GitHub
2. Import into Vercel
3. Set env vars (use PostgreSQL for production)
4. Build command: `prisma generate && next build`
5. Add Stripe webhook endpoint: `https://your-domain/api/webhooks/stripe`

## Notes

- Customization images are stored as data URLs in the cart for demo purposes; production should use Uploadthing or Cloudinary and store URLs only.
- Inventory is decremented on order creation; refunds can set payment status to `REFUNDED` in admin.
- Admin routes enforce `role === ADMIN` on the server.

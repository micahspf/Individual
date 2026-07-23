"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="mt-auto border-t border-border bg-muted/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="font-display text-lg font-bold tracking-[0.12em] uppercase">
            Individual<span className="text-accent">.com</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Premium custom products — designed by you, crafted with care. Apparel, drinkware,
            home, and accessories made to order.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Shop
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/shop" className="hover:text-accent">All products</Link></li>
            <li><Link href="/shop?category=apparel" className="hover:text-accent">Apparel</Link></li>
            <li><Link href="/shop?category=drinkware" className="hover:text-accent">Drinkware</Link></li>
            <li><Link href="/shop?category=home" className="hover:text-accent">Home</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Company
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-accent">About</Link></li>
            <li><Link href="/contact" className="hover:text-accent">Contact</Link></li>
            <li><Link href="/account" className="hover:text-accent">Account</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Support
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/contact" className="hover:text-accent">Shipping</Link></li>
            <li><Link href="/contact" className="hover:text-accent">Returns</Link></li>
            <li><Link href="/orders" className="hover:text-accent">Order tracking</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>© {new Date().getFullYear()} Individual.com. All rights reserved.</span>
          <span>Built with Next.js · Stripe-ready · WCAG-minded</span>
        </div>
      </div>
    </footer>
  );
}

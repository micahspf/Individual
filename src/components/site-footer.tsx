"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="mt-auto border-t-2 border-[#ffd0ea] bg-gradient-to-b from-[#fff0f8] to-[#fff8d6]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="font-display text-lg font-extrabold">
            Made by <span className="text-accent">Individual</span>
          </div>
          <p className="mt-3 text-sm font-medium leading-relaxed text-muted-foreground">
            Bubbly custom products — apparel, drinkware, home, and accessories made only when
            you order. Zero waste inventory.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-accent">Shop</h4>
          <ul className="mt-3 space-y-2 text-sm font-semibold">
            <li><Link href="/shop" className="hover:text-accent">All products</Link></li>
            <li><Link href="/shop?category=apparel" className="hover:text-accent">Apparel</Link></li>
            <li><Link href="/shop?category=drinkware" className="hover:text-accent">Drinkware</Link></li>
            <li><Link href="/shop?category=home" className="hover:text-accent">Home</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-accent">Company</h4>
          <ul className="mt-3 space-y-2 text-sm font-semibold">
            <li><Link href="/about" className="hover:text-accent">About</Link></li>
            <li><Link href="/contact" className="hover:text-accent">Contact</Link></li>
            <li><Link href="/account" className="hover:text-accent">Account</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-accent">Support</h4>
          <ul className="mt-3 space-y-2 text-sm font-semibold">
            <li><Link href="/contact" className="hover:text-accent">Shipping</Link></li>
            <li><Link href="/contact" className="hover:text-accent">Returns</Link></li>
            <li><Link href="/orders" className="hover:text-accent">Order tracking</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t-2 border-[#ffd0ea]/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs font-semibold text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>© {new Date().getFullYear()} Made by Individual · www.madebyindividual.com</span>
          <span>Custom · Colorful · Made to order</span>
        </div>
      </div>
    </footer>
  );
}

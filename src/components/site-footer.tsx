"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="mt-auto border-t border-neutral-900 bg-black">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="text-lg font-semibold tracking-tight">
            Made by <span className="text-pink-400">Individual</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-neutral-500">
            Custom products with a bubbly twist. Apparel, drinkware, home, and accessories —
            made only when ordered.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-pink-400">Shop</h4>
          <ul className="mt-3 space-y-2 text-sm text-neutral-400">
            <li><Link href="/shop" className="hover:text-pink-300">All products</Link></li>
            <li><Link href="/shop?category=apparel" className="hover:text-pink-300">Apparel</Link></li>
            <li><Link href="/shop?category=drinkware" className="hover:text-pink-300">Drinkware</Link></li>
            <li><Link href="/shop?category=home" className="hover:text-pink-300">Home</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-yellow-400">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-neutral-400">
            <li><Link href="/about" className="hover:text-yellow-300">About</Link></li>
            <li><Link href="/contact" className="hover:text-yellow-300">Contact</Link></li>
            <li><Link href="/account" className="hover:text-yellow-300">Account</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-pink-400">Support</h4>
          <ul className="mt-3 space-y-2 text-sm text-neutral-400">
            <li><Link href="/contact" className="hover:text-pink-300">Shipping</Link></li>
            <li><Link href="/contact" className="hover:text-pink-300">Returns</Link></li>
            <li><Link href="/orders" className="hover:text-pink-300">Order tracking</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-900">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-neutral-600 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>© {new Date().getFullYear()} Made by Individual · www.madebyindividual.com</span>
          <span>Custom · Colorful · Made to order</span>
        </div>
      </div>
    </footer>
  );
}

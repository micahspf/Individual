"use client";

import { useState } from "react";
import Link from "next/link";
import SearchBar from "@/components/search/SearchBar";
import BrandLogo from "@/components/ui/BrandLogo";
import CartDrawer from "@/components/cart/CartDrawer";
import { useCartCount } from "@/lib/cart/useCart";

// CartDrawer is imported statically: it renders null when closed, so the
// previous dynamic(..., { ssr: false }) lazy-load saved almost nothing and
// added a lazy Suspense inside the header for no benefit.

export default function Header() {
  const count = useCartCount();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a12]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
          <BrandLogo size="sm" priority />

          <div className="mx-4 hidden max-w-sm flex-1 md:block">
            <SearchBar />
          </div>

          <nav className="ml-auto flex items-center gap-2 text-sm sm:gap-3">
            {[
              { href: "/shop", label: "Shop", hide: "sm" },
              { href: "/ai", label: "AI", hide: "sm" },
              { href: "/about", label: "About", hide: "md" },
              { href: "/contact", label: "Contact", hide: "md" },
              { href: "/account", label: "Account", hide: "" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-1.5 text-zinc-400 transition hover:bg-white/10 hover:text-white ${
                  item.hide === "sm"
                    ? "hidden sm:inline"
                    : item.hide === "md"
                      ? "hidden md:inline"
                      : ""
                }`}
              >
                {item.label}
              </Link>
            ))}

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#ffe14a] text-black shadow-[0_0_16px_rgba(255,225,74,0.4)] transition hover:bg-[#fff08a]"
              aria-label="Open cart"
            >
              <span className="text-sm">🛒</span>
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ff2d8a] px-1 text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </button>
          </nav>
        </div>

        <div className="px-4 pb-3 md:hidden">
          <SearchBar />
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

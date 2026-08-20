"use client";

import Link from "next/link";
import SearchBar from "@/components/search/SearchBar";
import BrandLogo from "@/components/ui/BrandLogo";

// The cart is switched off while the shop is paused. components/cart/CartDrawer
// and lib/cart/ are left in place — re-import them here to bring it back.

export default function Header() {
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
              { href: "/shop", label: "Work", hide: "sm" },
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

            {/* Cart is hidden while the shop is paused — nothing is purchasable,
                so the icon would only ever open an empty drawer. Restore this
                block (and the CartDrawer below) when the catalog returns. */}
            <Link
              href="/#request"
              className="rounded-full bg-[#ffe14a] px-4 py-2 text-sm font-medium text-black shadow-[0_0_16px_rgba(255,225,74,0.35)] transition hover:bg-[#fff08a]"
            >
              Get a quote
            </Link>
          </nav>
        </div>

        <div className="px-4 pb-3 md:hidden">
          <SearchBar />
        </div>
      </header>

    </>
  );
}

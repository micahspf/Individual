"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SearchBar from "@/components/search/SearchBar";
import BrandLogo from "@/components/ui/BrandLogo";
import ThemeToggle from "@/components/ui/ThemeToggle";

// The cart is switched off while the shop is paused. components/cart/CartDrawer
// and lib/cart/ are left in place — re-import them here to bring it back.

const NAV = [
  { href: "/shop", label: "Work", hide: "sm" },
  { href: "/ai", label: "AI", hide: "sm" },
  { href: "/about", label: "About", hide: "md" },
  { href: "/contact", label: "Contact", hide: "md" },
  { href: "/account", label: "Account", hide: "" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Escape closes the mobile menu; keeps focus handling predictable for
  // keyboard users without pulling in a focus-trap dependency.
  useEffect(() => {
    if (!menuOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a12]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <BrandLogo size="sm" priority />

        <div className="mx-4 hidden max-w-sm flex-1 md:block">
          <SearchBar />
        </div>

        <nav className="ml-auto flex items-center gap-2 text-sm sm:gap-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3 py-1.5 text-zinc-400 transition hover:bg-white/10 hover:text-white ${
                item.hide === "sm"
                  ? "hidden sm:inline"
                  : item.hide === "md"
                    ? "hidden md:inline"
                    : "hidden sm:inline"
              }`}
            >
              {item.label}
            </Link>
          ))}

          <ThemeToggle className="hidden sm:flex" />

          <Link
            href="/#request"
            className="rounded-full bg-[#ffe14a] px-4 py-2 text-sm font-medium text-black shadow-[0_0_16px_rgba(255,225,74,0.35)] transition hover:bg-[#fff08a]"
          >
            Get a quote
          </Link>

          {/* Below sm the whole nav was previously unreachable — this is the
              only way to Work, AI, About, Contact and Account on a phone. */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-zinc-300 transition hover:bg-white/10 hover:text-white sm:hidden"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </nav>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-white/10 bg-[#0a0a12]/95 backdrop-blur-xl sm:hidden"
        >
          <nav className="flex flex-col px-4 py-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-base text-zinc-300 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-2 flex items-center justify-between gap-3 border-t border-white/10 pt-3">
              <a
                href="tel:+12565906534"
                className="rounded-xl px-3 py-2 text-base font-medium text-zinc-100 transition hover:text-pink-300"
              >
                256-590-6534
              </a>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}

      <div className="px-4 pb-3 md:hidden">
        <SearchBar />
      </div>
    </header>
  );
}

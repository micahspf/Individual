"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import SearchBar from "@/components/search/SearchBar";
import { cartCount } from "@/lib/cart/store";

const CartDrawer = dynamic(() => import("@/components/cart/CartDrawer"), {
  ssr: false,
});

export default function Header() {
  const [count, setCount] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    setCount(cartCount());
    function sync() {
      setCount(cartCount());
    }
    window.addEventListener("cart-updated", sync);
    return () => window.removeEventListener("cart-updated", sync);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#1c1c21]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
          <Link href="/" className="shrink-0 text-lg font-bold tracking-tight">
            Made by <span className="text-pink-400">Individual</span>
          </Link>

          <div className="mx-4 hidden max-w-sm flex-1 md:block">
            <SearchBar />
          </div>

          <nav className="ml-auto flex items-center gap-2 text-sm sm:gap-3">
            {[
              { href: "/shop", label: "Shop", hide: "sm" },
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
              className="relative flex h-9 w-9 items-center justify-center rounded-full bg-yellow-400 text-black shadow-[0_0_16px_rgba(250,204,21,0.35)] transition hover:bg-yellow-300"
              aria-label="Open cart"
            >
              <span className="text-sm">🛒</span>
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-500 px-1 text-[10px] font-bold text-white">
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

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=custom", label: "Custom" },
  { href: "/#request", label: "Request" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-900 bg-black/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Made by <span className="text-pink-400">Individual</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition ${
                pathname === item.href || (item.href.startsWith("/shop") && pathname === "/shop")
                  ? "text-pink-400"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/shop"
            className="hidden rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-yellow-300 sm:inline-flex"
          >
            Shop
          </Link>
          <Link
            href="/#request"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-pink-500 text-sm"
            aria-label="Custom request"
            title="Custom request"
          >
            ♥
          </Link>
          <Link
            href="/shop"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-yellow-400 text-sm text-black"
            aria-label="Open shop"
            title="Shop"
          >
            🛒
          </Link>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-neutral-900 px-6 py-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm text-neutral-300 hover:bg-neutral-900 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?tag=customizable", label: "Custom" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const count = useCart((s) => s.items.reduce((n, i) => n + i.quantity, 0));
  const wishCount = useWishlist((s) => s.ids.length);
  const [open, setOpen] = useState(false);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-display text-xl font-bold tracking-[0.12em] uppercase">
            Individual<span className="text-accent">.com</span>
          </Link>
          <nav className="hidden items-center gap-5 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "text-sm font-medium text-muted-foreground transition hover:text-foreground",
                  pathname === l.href && "text-foreground"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/shop"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground sm:inline-flex"
            aria-label="Search products"
          >
            <Search className="h-4 w-4" />
          </Link>
          <ThemeToggle />
          <Link
            href="/wishlist"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
            aria-label="Wishlist"
          >
            <Heart className="h-4 w-4" />
            {wishCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
                {wishCount}
              </span>
            )}
          </Link>
          <Link
            href="/cart"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
            aria-label="Cart"
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
          {session?.user ? (
            <div className="hidden items-center gap-2 sm:flex">
              {session.user.role === "ADMIN" && (
                <Link href="/admin">
                  <Button variant="secondary" size="sm">
                    Admin
                  </Button>
                </Link>
              )}
              <Link
                href="/account"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
                aria-label="Account"
              >
                <User className="h-4 w-4" />
              </Link>
              <Button variant="ghost" size="sm" onClick={() => signOut({ callbackUrl: "/" })}>
                Sign out
              </Button>
            </div>
          ) : (
            <Link href="/login" className="hidden sm:block">
              <Button variant="secondary" size="sm">
                Sign in
              </Button>
            </Link>
          )}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-muted md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted"
              >
                {l.label}
              </Link>
            ))}
            {session?.user ? (
              <>
                <Link href="/account" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted">
                  Account
                </Link>
                {session.user.role === "ADMIN" && (
                  <Link href="/admin" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted">
                    Admin
                  </Link>
                )}
              </>
            ) : (
              <Link href="/login" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted">
                Sign in
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

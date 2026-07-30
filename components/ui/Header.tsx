'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SearchBar from '@/components/search/SearchBar';
import CartDrawer from '@/components/cart/CartDrawer';
import { cartCount } from '@/lib/cart/store';

export default function Header() {
  const [count, setCount] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    setCount(cartCount());
    function sync() {
      setCount(cartCount());
    }
    window.addEventListener('cart-updated', sync);
    return () => window.removeEventListener('cart-updated', sync);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-neutral-900 bg-black/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
          <Link href="/" className="shrink-0 text-lg font-bold tracking-tight">
            Made by <span className="text-pink-400">Individual</span>
          </Link>

          <div className="mx-4 hidden max-w-sm flex-1 md:block">
            <SearchBar />
          </div>

          <nav className="ml-auto flex items-center gap-2 text-sm sm:gap-3">
            <Link
              href="/shop"
              className="hidden rounded-full px-3 py-1.5 text-neutral-400 transition hover:bg-neutral-900 hover:text-white sm:inline"
            >
              Shop
            </Link>
            <Link
              href="/rewards"
              className="hidden rounded-full px-3 py-1.5 text-neutral-400 transition hover:bg-neutral-900 hover:text-pink-300 sm:inline"
            >
              Rewards
            </Link>
            <Link
              href="/about"
              className="hidden rounded-full px-3 py-1.5 text-neutral-400 transition hover:bg-neutral-900 hover:text-white md:inline"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hidden rounded-full px-3 py-1.5 text-neutral-400 transition hover:bg-neutral-900 hover:text-white md:inline"
            >
              Contact
            </Link>
            <Link
              href="/account"
              className="rounded-full px-3 py-1.5 text-neutral-400 transition hover:bg-neutral-900 hover:text-white"
            >
              Account
            </Link>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative flex h-9 w-9 items-center justify-center rounded-full bg-yellow-400 text-black transition hover:bg-yellow-300"
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

        {/* Mobile search */}
        <div className="md:hidden px-4 pb-3">
          <SearchBar />
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

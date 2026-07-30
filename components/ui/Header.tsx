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
      <header className="border-b border-neutral-900 sticky top-0 z-50 bg-black/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
          <Link href="/" className="font-bold text-lg tracking-tight shrink-0">
            Made by <span className="text-pink-400">Individual</span>
          </Link>

          <div className="hidden md:block flex-1 max-w-sm mx-4">
            <SearchBar />
          </div>

          <nav className="flex items-center gap-3 sm:gap-5 text-sm ml-auto">
            <Link href="/shop" className="text-neutral-400 hover:text-white transition hidden sm:inline">
              Shop
            </Link>
            <Link href="/rewards" className="text-neutral-400 hover:text-white transition hidden sm:inline">
              Rewards
            </Link>
            <Link href="/about" className="text-neutral-400 hover:text-white transition hidden md:inline">
              About
            </Link>
            <Link href="/contact" className="text-neutral-400 hover:text-white transition hidden md:inline">
              Contact
            </Link>
            <Link href="/account" className="text-neutral-400 hover:text-white transition">
              Account
            </Link>

            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-neutral-300 hover:text-pink-300 transition"
              aria-label="Open cart"
            >
              <span className="text-lg">🛒</span>
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-pink-500 text-white text-[10px] font-bold flex items-center justify-center">
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

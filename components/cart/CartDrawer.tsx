'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  getCart,
  updateQuantity,
  removeFromCart,
  cartTotal,
  type CartItem,
} from '@/lib/cart/store';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(getCart());
    function sync() {
      setItems(getCart());
    }
    window.addEventListener('cart-updated', sync);
    return () => window.removeEventListener('cart-updated', sync);
  }, [open]);

  const total = items.reduce((s, i) => s + (i.isTokenOnly ? 0 : i.price) * i.quantity, 0);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-[#1c1c21]/70 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#24242b]/95 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="font-bold text-lg">Your cart</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white text-sm">
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="text-center py-16 text-zinc-400">
              <p className="mb-4">Cart is empty</p>
              <Link
                href="/shop"
                onClick={onClose}
                className="text-pink-400 text-sm hover:text-pink-300"
              >
                Browse the shop →
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 border-b border-white/10 pb-4">
                  <div className="flex-1">
                    <Link
                      href={`/shop/${item.slug}`}
                      onClick={onClose}
                      className="font-medium text-sm hover:text-pink-300"
                    >
                      {item.name}
                    </Link>
                    <div className="text-yellow-300 text-sm mt-1">
                      {item.isTokenOnly
                        ? `${item.tokenPrice} tokens`
                        : `$${item.price.toFixed(2)}`}
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => setItems(updateQuantity(item.id, item.quantity - 1))}
                        className="w-7 h-7 rounded-full border border-white/15 bg-white/5 text-sm hover:border-pink-500"
                      >
                        −
                      </button>
                      <span className="text-sm w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => setItems(updateQuantity(item.id, item.quantity + 1))}
                        className="w-7 h-7 rounded-full border border-white/15 bg-white/5 text-sm hover:border-pink-500"
                      >
                        +
                      </button>
                      <button
                        onClick={() => setItems(removeFromCart(item.id))}
                        className="text-xs text-zinc-500 hover:text-red-400 ml-auto"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-white/10 px-5 py-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Subtotal</span>
              <span className="font-medium text-yellow-300">${total.toFixed(2)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={onClose}
              className="btn-pill-pink block w-full text-center py-3"
            >
              Checkout
            </Link>
            <p className="text-[11px] text-zinc-500 text-center">
              Guest checkout available — no account required
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

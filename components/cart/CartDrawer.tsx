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
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-neutral-950 border-l border-neutral-800 flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800">
          <h2 className="font-bold text-lg">Your cart</h2>
          <button onClick={onClose} className="text-neutral-500 hover:text-white text-sm">
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="text-center py-16 text-neutral-500">
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
                <li key={item.id} className="flex gap-4 border-b border-neutral-900 pb-4">
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
                        className="w-7 h-7 rounded-full border border-neutral-700 text-sm hover:border-pink-500"
                      >
                        −
                      </button>
                      <span className="text-sm w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => setItems(updateQuantity(item.id, item.quantity + 1))}
                        className="w-7 h-7 rounded-full border border-neutral-700 text-sm hover:border-pink-500"
                      >
                        +
                      </button>
                      <button
                        onClick={() => setItems(removeFromCart(item.id))}
                        className="text-xs text-neutral-600 hover:text-red-400 ml-auto"
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
          <div className="border-t border-neutral-800 px-5 py-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-400">Subtotal</span>
              <span className="font-medium text-yellow-300">${total.toFixed(2)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full text-center py-3 rounded-full bg-pink-500 text-white font-medium hover:bg-pink-400 transition"
            >
              Checkout
            </Link>
            <p className="text-[11px] text-neutral-600 text-center">
              Guest checkout available — no account required
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

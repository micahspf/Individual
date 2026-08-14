'use client';

import Link from 'next/link';
import { updateQuantity, removeFromCart } from '@/lib/cart/store';
import { useCart } from '@/lib/cart/useCart';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const items = useCart();

  const total = items.reduce((s, i) => s + (i.isTokenOnly ? 0 : i.price) * i.quantity, 0);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-[#1c1c21]/70 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#24242b]/95 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="text-lg font-bold">Your cart</h2>
          <button onClick={onClose} className="text-sm text-zinc-400 hover:text-white">
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="py-16 text-center text-zinc-400">
              <p className="mb-4">Cart is empty</p>
              <Link
                href="/shop"
                onClick={onClose}
                className="text-sm text-pink-400 hover:text-pink-300"
              >
                Browse the shop →
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.lineKey} className="flex gap-4 border-b border-white/10 pb-4">
                  <div className="flex-1">
                    <Link
                      href={`/shop/${item.slug}`}
                      onClick={onClose}
                      className="text-sm font-medium hover:text-pink-300"
                    >
                      {item.name}
                    </Link>
                    {(item.line1 || item.line2) && (
                      <div className="mt-1 text-xs leading-relaxed text-zinc-400">
                        {item.line1 && (
                          <div>
                            Line 1: &ldquo;{item.line1}&rdquo;
                          </div>
                        )}
                        {item.line2 && (
                          <div>
                            Line 2: &ldquo;{item.line2}&rdquo;
                          </div>
                        )}
                        {item.font && (
                          <div className="capitalize">Font: {item.font}</div>
                        )}
                      </div>
                    )}
                    <div className="mt-1 text-sm text-yellow-300">
                      ${item.price.toFixed(2)}
                    </div>
                    <div className="mt-2 flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.lineKey, item.quantity - 1)
                        }
                        className="h-7 w-7 rounded-full border border-white/15 bg-white/5 text-sm hover:border-pink-500"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.lineKey, item.quantity + 1)
                        }
                        className="h-7 w-7 rounded-full border border-white/15 bg-white/5 text-sm hover:border-pink-500"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.lineKey)}
                        className="ml-auto text-xs text-zinc-400 hover:text-red-400"
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
          <div className="space-y-3 border-t border-white/10 px-5 py-4">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Subtotal</span>
              <span className="font-medium text-yellow-300">${total.toFixed(2)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={onClose}
              className="btn-pill-pink block w-full py-3 text-center"
            >
              Checkout
            </Link>
            <p className="text-center text-[11px] text-zinc-400">
              Guest checkout available — no account required
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

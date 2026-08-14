'use client';

/**
 * React binding for the cart store. One subscription to the `cart-updated`
 * event, shared by the header badge, drawer, and checkout — replaces the
 * setState-in-effect sync pattern.
 */

import { useSyncExternalStore } from 'react';
import { getCart, type CartItem } from '@/lib/cart/store';

const EMPTY: CartItem[] = [];

/** Cached so getSnapshot returns a stable reference between cart changes. */
let snapshot: CartItem[] | null = null;

function getSnapshot(): CartItem[] {
  if (snapshot === null) snapshot = getCart();
  return snapshot;
}

function getServerSnapshot(): CartItem[] {
  return EMPTY;
}

function subscribe(onStoreChange: () => void): () => void {
  const handler = () => {
    snapshot = null;
    onStoreChange();
  };
  window.addEventListener('cart-updated', handler);
  return () => window.removeEventListener('cart-updated', handler);
}

export function useCart(): CartItem[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useCartCount(): number {
  const items = useCart();
  return items.reduce((sum, i) => sum + i.quantity, 0);
}

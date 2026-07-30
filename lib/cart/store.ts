/**
 * Client-side cart store (localStorage)
 * Guest-friendly — no account required
 */

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  isTokenOnly?: boolean;
  tokenPrice?: number;
}

const KEY = 'individual_cart';

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event('cart-updated'));
}

export function addToCart(item: Omit<CartItem, 'quantity'>, qty = 1) {
  const cart = getCart();
  const existing = cart.find((i) => i.id === item.id);
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({ ...item, quantity: qty });
  }
  saveCart(cart);
  return cart;
}

export function updateQuantity(id: string, quantity: number) {
  let cart = getCart();
  if (quantity <= 0) {
    cart = cart.filter((i) => i.id !== id);
  } else {
    cart = cart.map((i) => (i.id === id ? { ...i, quantity } : i));
  }
  saveCart(cart);
  return cart;
}

export function removeFromCart(id: string) {
  const cart = getCart().filter((i) => i.id !== id);
  saveCart(cart);
  return cart;
}

export function clearCart() {
  saveCart([]);
}

export function cartCount(): number {
  return getCart().reduce((sum, i) => sum + i.quantity, 0);
}

export function cartTotal(): number {
  return getCart().reduce((sum, i) => {
    const price = i.isTokenOnly ? 0 : i.price;
    return sum + price * i.quantity;
  }, 0);
}

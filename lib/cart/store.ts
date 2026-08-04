/**
 * Client-side cart store (localStorage)
 * Guest-friendly — no account required
 */

export type EngravingFont = "serif" | "sans" | "script";

export interface CartPersonalization {
  line1?: string;
  line2?: string;
  font?: EngravingFont;
}

export interface CartItem {
  /** Unique cart line key (product id + personalization) */
  lineKey: string;
  id: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  isTokenOnly?: boolean;
  tokenPrice?: number;
  line1?: string;
  line2?: string;
  font?: EngravingFont;
}

const KEY = "individual_cart";

export function makeLineKey(
  id: string,
  p?: CartPersonalization
): string {
  const a = (p?.line1 || "").trim().toLowerCase();
  const b = (p?.line2 || "").trim().toLowerCase();
  const f = p?.font || "sans";
  return `${id}::${f}::${a}::${b}`;
}

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    const items: CartItem[] = raw ? JSON.parse(raw) : [];
    // migrate legacy items without lineKey
    return items.map((i) => ({
      ...i,
      lineKey:
        i.lineKey ||
        makeLineKey(i.id, { line1: i.line1, line2: i.line2, font: i.font }),
    }));
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("cart-updated"));
}

export function addToCart(
  item: Omit<CartItem, "quantity" | "lineKey"> & { lineKey?: string },
  qty = 1
) {
  const personalization: CartPersonalization = {
    line1: item.line1,
    line2: item.line2,
    font: item.font,
  };
  const lineKey = item.lineKey || makeLineKey(item.id, personalization);
  const cart = getCart();
  const existing = cart.find((i) => i.lineKey === lineKey);
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({ ...item, lineKey, quantity: qty });
  }
  saveCart(cart);
  return cart;
}

export function updateQuantity(lineKey: string, quantity: number) {
  let cart = getCart();
  if (quantity <= 0) {
    cart = cart.filter((i) => i.lineKey !== lineKey);
  } else {
    cart = cart.map((i) => (i.lineKey === lineKey ? { ...i, quantity } : i));
  }
  saveCart(cart);
  return cart;
}

export function removeFromCart(lineKey: string) {
  const cart = getCart().filter((i) => i.lineKey !== lineKey);
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

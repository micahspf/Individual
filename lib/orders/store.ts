/**
 * Simple order store (localStorage for demo)
 * Replace with DB in production
 */

export type OrderStatus = 'received' | 'in_production' | 'shipped' | 'delivered';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  email: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

const KEY = 'individual_orders';

function read(): Order[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

function write(orders: Order[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(orders));
}

export function createOrder(data: Omit<Order, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Order {
  const orders = read();
  const now = new Date().toISOString();
  const order: Order = {
    ...data,
    id: `IND-${Date.now().toString(36).toUpperCase()}`,
    status: 'received',
    createdAt: now,
    updatedAt: now,
  };
  orders.unshift(order);
  write(orders);
  return order;
}

export function findOrder(orderId: string, email: string): Order | null {
  const orders = read();
  return (
    orders.find(
      (o) =>
        o.id.toLowerCase() === orderId.toLowerCase().trim() &&
        o.email.toLowerCase() === email.toLowerCase().trim()
    ) || null
  );
}

export function getOrdersByEmail(email: string): Order[] {
  return read().filter((o) => o.email.toLowerCase() === email.toLowerCase().trim());
}

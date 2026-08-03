/**
 * Server-side order + webhook idempotency store.
 * Durable enough for Stripe retries on a warm instance.
 * Replace with Postgres when orders need multi-instance durability.
 */

export type ServerOrderStatus =
  | "received"
  | "paid"
  | "payment_failed"
  | "refunded"
  | "in_production"
  | "shipped"
  | "delivered";

export interface ServerOrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface ServerOrder {
  id: string;
  stripeSessionId: string;
  stripePaymentIntentId?: string | null;
  email: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  items: ServerOrderItem[];
  total: number;
  currency: string;
  status: ServerOrderStatus;
  createdAt: string;
  updatedAt: string;
}

/** sessionId → order */
const ordersBySession = new Map<string, ServerOrder>();
/** orderRef → order */
const ordersById = new Map<string, ServerOrder>();
/** Stripe event.id → processed at ISO */
const processedEvents = new Map<string, string>();

export function isEventProcessed(eventId: string): boolean {
  return processedEvents.has(eventId);
}

export function markEventProcessed(eventId: string): void {
  processedEvents.set(eventId, new Date().toISOString());
}

export function getOrderBySessionId(sessionId: string): ServerOrder | undefined {
  return ordersBySession.get(sessionId);
}

export function getOrderById(orderId: string): ServerOrder | undefined {
  return ordersById.get(orderId);
}

export function findServerOrder(
  orderId: string,
  email: string
): ServerOrder | null {
  const order = ordersById.get(orderId);
  if (!order) return null;
  if (order.email.toLowerCase() !== email.toLowerCase().trim()) return null;
  return order;
}

export function upsertOrder(order: ServerOrder): ServerOrder {
  ordersBySession.set(order.stripeSessionId, order);
  ordersById.set(order.id, order);
  return order;
}

export function updateOrderStatus(
  sessionId: string,
  status: ServerOrderStatus
): ServerOrder | undefined {
  const existing = ordersBySession.get(sessionId);
  if (!existing) return undefined;
  const next: ServerOrder = {
    ...existing,
    status,
    updatedAt: new Date().toISOString(),
  };
  upsertOrder(next);
  return next;
}

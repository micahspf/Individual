import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/utils";

type Props = { searchParams: Promise<{ order?: string; session_id?: string }> };

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const params = await searchParams;
  let orderNumber = params.order;

  if (!orderNumber && params.session_id) {
    const order = await prisma.order.findFirst({
      where: { stripeSessionId: params.session_id },
    });
    orderNumber = order?.orderNumber;
  }

  const order = orderNumber
    ? await prisma.order.findUnique({
        where: { orderNumber },
        include: { items: true },
      })
    : null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
      <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" />
      <h1 className="mt-4 font-display text-3xl font-semibold">Thank you for your order</h1>
      <p className="mt-2 text-muted-foreground">
        {order
          ? `Order ${order.orderNumber} is confirmed. A receipt was sent to ${order.email}.`
          : "Your order has been placed successfully."}
      </p>

      {order && (
        <div className="mt-8 rounded-2xl border border-border bg-card p-6 text-left">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Status</span>
            <span className="font-medium">{order.status}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-muted-foreground">Total</span>
            <span className="font-medium">{formatMoney(order.total)}</span>
          </div>
          <ul className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between gap-3">
                <span>
                  {item.productName} × {item.quantity}
                </span>
                <span>{formatMoney(item.unitPrice * item.quantity)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {order && (
          <Link href={`/orders/${order.id}`}>
            <Button>Track order</Button>
          </Link>
        )}
        <Link href="/shop">
          <Button variant="secondary">Continue shopping</Button>
        </Link>
      </div>
    </div>
  );
}

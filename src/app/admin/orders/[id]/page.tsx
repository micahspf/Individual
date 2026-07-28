import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatMoney, parseJsonObject } from "@/lib/utils";
import { OrderStatusForm } from "@/components/admin/order-status-form";
import { format } from "date-fns";

type Props = { params: Promise<{ id: string }> };

export default async function AdminOrderDetailPage({ params }: Props) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true, user: true },
  });
  if (!order) notFound();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Order detail
        </p>
        <h1 className="font-display text-3xl font-semibold">{order.orderNumber}</h1>
        <p className="mt-1 text-muted-foreground">
          {format(order.createdAt, "MMMM d, yyyy h:mm a")} · {order.email}
        </p>
      </div>

      <OrderStatusForm
        orderId={order.id}
        status={order.status}
        paymentStatus={order.paymentStatus}
        trackingNumber={order.trackingNumber || ""}
      />

      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-semibold">Line items</h2>
        <ul className="mt-4 space-y-3">
          {order.items.map((item) => {
            const custom = parseJsonObject(item.customization, {} as Record<string, string>);
            return (
              <li key={item.id} className="flex justify-between gap-4 border-b border-border pb-3 text-sm last:border-0">
                <div>
                  <p className="font-medium">{item.productName}</p>
                  <p className="text-muted-foreground">Qty {item.quantity}</p>
                  {custom.text && <p className="text-muted-foreground">Text: {custom.text}</p>}
                </div>
                <p className="font-semibold">{formatMoney(item.unitPrice * item.quantity)}</p>
              </li>
            );
          })}
        </ul>
        <div className="mt-4 flex justify-between border-t border-border pt-4 font-semibold">
          <span>Total</span>
          <span>{formatMoney(order.total)}</span>
        </div>
      </div>
    </div>
  );
}

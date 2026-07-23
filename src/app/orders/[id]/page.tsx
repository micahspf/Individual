import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatMoney, parseJsonObject } from "@/lib/utils";
import { format } from "date-fns";

type Props = { params: Promise<{ id: string }> };

export default async function OrderDetailPage({ params }: Props) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });

  if (!order) notFound();
  if (order.userId !== session.user.id && session.user.role !== "ADMIN") {
    redirect("/account");
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Order tracking
      </p>
      <h1 className="mt-1 font-display text-3xl font-semibold">{order.orderNumber}</h1>
      <p className="mt-2 text-muted-foreground">
        Placed {format(order.createdAt, "MMMM d, yyyy 'at' h:mm a")}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Status</p>
          <p className="mt-1 font-semibold">{order.status}</p>
        </div>
        <div className="rounded-2xl border border-border p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Payment</p>
          <p className="mt-1 font-semibold">{order.paymentStatus}</p>
        </div>
        <div className="rounded-2xl border border-border p-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Tracking</p>
          <p className="mt-1 font-semibold">{order.trackingNumber || "Pending"}</p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-semibold">Items</h2>
        <ul className="mt-4 space-y-4">
          {order.items.map((item) => {
            const custom = parseJsonObject(item.customization, {} as Record<string, string>);
            const variants = parseJsonObject(item.variants, {} as Record<string, string>);
            return (
              <li key={item.id} className="flex justify-between gap-4 border-b border-border pb-4 last:border-0">
                <div>
                  <p className="font-medium">{item.productName}</p>
                  <p className="text-sm text-muted-foreground">
                    Qty {item.quantity}
                    {Object.keys(variants).length > 0 &&
                      ` · ${Object.entries(variants)
                        .map(([k, v]) => `${k}: ${v}`)
                        .join(", ")}`}
                  </p>
                  {custom.text && (
                    <p className="text-sm text-muted-foreground">Custom text: {custom.text}</p>
                  )}
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

      {order.shippingLine1 && (
        <div className="mt-6 rounded-2xl border border-border p-6 text-sm">
          <h2 className="font-semibold">Shipping to</h2>
          <p className="mt-2 text-muted-foreground">
            {order.shippingName}
            <br />
            {order.shippingLine1}
            {order.shippingLine2 ? `, ${order.shippingLine2}` : ""}
            <br />
            {order.shippingCity}, {order.shippingState} {order.shippingPostal}
          </p>
        </div>
      )}
    </div>
  );
}

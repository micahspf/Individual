import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/utils";
import { format } from "date-fns";

export const metadata = { title: "Admin · Orders" };

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true, user: true },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold">Orders</h1>
        <p className="mt-1 text-muted-foreground">{orders.length} total</p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-semibold">Order</th>
              <th className="px-4 py-3 font-semibold">Customer</th>
              <th className="px-4 py-3 font-semibold">Date</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Payment</th>
              <th className="px-4 py-3 font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">
                  <Link href={`/admin/orders/${o.id}`} className="font-medium hover:text-accent">
                    {o.orderNumber}
                  </Link>
                  <p className="text-xs text-muted-foreground">{o.items.length} items</p>
                </td>
                <td className="px-4 py-3">
                  <p>{o.user?.name || o.shippingName || "—"}</p>
                  <p className="text-xs text-muted-foreground">{o.email}</p>
                </td>
                <td className="px-4 py-3">{format(o.createdAt, "MMM d, yyyy")}</td>
                <td className="px-4 py-3">{o.status}</td>
                <td className="px-4 py-3">{o.paymentStatus}</td>
                <td className="px-4 py-3 font-semibold">{formatMoney(o.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

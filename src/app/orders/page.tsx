import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/utils";
import { format } from "date-fns";

export const metadata = { title: "Orders" };

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/orders");

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="mb-6 font-display text-3xl font-semibold">Your orders</h1>
      {orders.length === 0 ? (
        <p className="text-muted-foreground">No orders yet.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 transition hover:border-foreground/30"
            >
              <div>
                <p className="font-semibold">{order.orderNumber}</p>
                <p className="text-sm text-muted-foreground">
                  {format(order.createdAt, "MMM d, yyyy")} · {order.status} ·{" "}
                  {order.items.length} items
                </p>
              </div>
              <p className="font-semibold">{formatMoney(order.total)}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

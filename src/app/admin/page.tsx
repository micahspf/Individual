import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/utils";
import { format } from "date-fns";
import Link from "next/link";

export const metadata = { title: "Admin · Overview" };

export default async function AdminOverviewPage() {
  const [productCount, orderCount, customerCount, orders, products] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { items: true },
    }),
    prisma.product.findMany({
      include: { orderItems: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const revenue = await prisma.order.aggregate({
    where: { paymentStatus: "PAID" },
    _sum: { total: true },
  });

  const popular = products
    .map((p) => ({
      id: p.id,
      name: p.name,
      sold: p.orderItems.reduce((s, i) => s + i.quantity, 0),
      inventory: p.inventory,
    }))
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 5);

  const lowStock = products.filter((p) => p.inventory < 20).slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold">Overview</h1>
        <p className="mt-1 text-muted-foreground">Sales snapshot and recent activity</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Revenue (paid)", value: formatMoney(revenue._sum.total || 0) },
          { label: "Orders", value: String(orderCount) },
          { label: "Products", value: String(productCount) },
          { label: "Customers", value: String(customerCount) },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {stat.label}
            </p>
            <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">Recent orders</h2>
            <Link href="/admin/orders" className="text-sm text-accent hover:underline">
              View all
            </Link>
          </div>
          <ul className="space-y-3">
            {orders.map((o) => (
              <li key={o.id} className="flex items-center justify-between gap-3 text-sm">
                <div>
                  <Link href={`/admin/orders/${o.id}`} className="font-medium hover:text-accent">
                    {o.orderNumber}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {format(o.createdAt, "MMM d")} · {o.status}
                  </p>
                </div>
                <span className="font-semibold">{formatMoney(o.total)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-4 font-semibold">Popular products</h2>
          <ul className="space-y-3">
            {popular.map((p) => (
              <li key={p.id} className="flex justify-between text-sm">
                <span>{p.name}</span>
                <span className="text-muted-foreground">{p.sold} sold</span>
              </li>
            ))}
          </ul>
          {lowStock.length > 0 && (
            <>
              <h3 className="mb-3 mt-6 text-sm font-semibold text-amber-600">Low inventory</h3>
              <ul className="space-y-2 text-sm">
                {lowStock.map((p) => (
                  <li key={p.id} className="flex justify-between">
                    <span>{p.name}</span>
                    <span className="font-medium">{p.inventory} left</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

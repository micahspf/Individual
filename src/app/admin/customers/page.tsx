import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

export const metadata = { title: "Admin · Customers" };

export default async function AdminCustomersPage() {
  const customers = await prisma.user.findMany({
    where: { role: "CUSTOMER" },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { orders: true } },
      orders: { select: { total: true, paymentStatus: true } },
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold">Customers</h1>
        <p className="mt-1 text-muted-foreground">{customers.length} customers</p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-semibold">Customer</th>
              <th className="px-4 py-3 font-semibold">Joined</th>
              <th className="px-4 py-3 font-semibold">Orders</th>
              <th className="px-4 py-3 font-semibold">Lifetime spent</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => {
              const spent = c.orders
                .filter((o) => o.paymentStatus === "PAID")
                .reduce((s, o) => s + o.total, 0);
              return (
                <tr key={c.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">
                    <p className="font-medium">{c.name || "—"}</p>
                    <p className="text-xs text-muted-foreground">{c.email}</p>
                  </td>
                  <td className="px-4 py-3">{format(c.createdAt, "MMM d, yyyy")}</td>
                  <td className="px-4 py-3">{c._count.orders}</td>
                  <td className="px-4 py-3 font-semibold">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(spent)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

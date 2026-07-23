import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export const metadata = { title: "Account" };

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/account");

  const [orders, addresses] = await Promise.all([
    prisma.order.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 10,
      include: { items: true },
    }),
    prisma.address.findMany({
      where: { userId: session.user.id },
      orderBy: { isDefault: "desc" },
    }),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold">Account</h1>
          <p className="mt-1 text-muted-foreground">
            Signed in as {session.user.name || session.user.email}
          </p>
        </div>
        {session.user.role === "ADMIN" && (
          <Link href="/admin">
            <Button variant="secondary">Open admin dashboard</Button>
          </Link>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Order history</h2>
            <Link href="/orders" className="text-sm text-accent hover:underline">
              View all
            </Link>
          </div>
          {orders.length === 0 ? (
            <p className="text-sm text-muted-foreground">No orders yet.</p>
          ) : (
            <ul className="space-y-3">
              {orders.map((order) => (
                <li key={order.id} className="rounded-xl border border-border p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link href={`/orders/${order.id}`} className="font-medium hover:text-accent">
                        {order.orderNumber}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {format(order.createdAt, "MMM d, yyyy")} · {order.status}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {order.items.length} item{order.items.length === 1 ? "" : "s"}
                      </p>
                    </div>
                    <span className="font-semibold">{formatMoney(order.total)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold">Saved addresses</h2>
          {addresses.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No saved addresses yet. Addresses are captured at checkout.
            </p>
          ) : (
            <ul className="space-y-3">
              {addresses.map((a) => (
                <li key={a.id} className="rounded-xl border border-border p-4 text-sm">
                  <p className="font-medium">
                    {a.label}
                    {a.isDefault ? " · Default" : ""}
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    {a.fullName}
                    <br />
                    {a.line1}
                    {a.line2 ? `, ${a.line2}` : ""}
                    <br />
                    {a.city}, {a.state} {a.postalCode}
                  </p>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-6">
            <Link href="/wishlist">
              <Button variant="secondary" className="w-full">
                View wishlist
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

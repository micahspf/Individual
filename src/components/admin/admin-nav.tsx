"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  ArrowLeft,
} from "lucide-react";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/customers", label: "Customers", icon: Users },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 border-b border-border bg-card lg:w-60 lg:border-b-0 lg:border-r">
      <div className="flex h-14 items-center border-b border-border px-4">
        <Link href="/admin" className="font-display text-sm font-bold tracking-[0.14em] uppercase">
          Individual<span className="text-accent">.com</span> Admin
        </Link>
      </div>
      <nav className="flex gap-1 overflow-x-auto p-3 lg:flex-col">
        {links.map((l) => {
          const active = pathname === l.href || (l.href !== "/admin" && pathname.startsWith(l.href));
          const Icon = l.icon;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium whitespace-nowrap transition",
                active ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {l.label}
            </Link>
          );
        })}
        <Link
          href="/"
          className="mt-auto inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to store
        </Link>
      </nav>
    </aside>
  );
}

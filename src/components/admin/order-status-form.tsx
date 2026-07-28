"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toaster";

const statuses = [
  "PENDING",
  "PAID",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "REFUNDED",
] as const;

const payments = ["PENDING", "PAID", "FAILED", "REFUNDED"] as const;

export function OrderStatusForm({
  orderId,
  status,
  paymentStatus,
  trackingNumber,
}: {
  orderId: string;
  status: string;
  paymentStatus: string;
  trackingNumber: string;
}) {
  const router = useRouter();
  const [form, setForm] = useState({ status, paymentStatus, trackingNumber });
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`/api/admin/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (!res.ok) {
      toast("Update failed");
      return;
    }
    toast("Order updated");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-3">
      <div className="space-y-2">
        <Label htmlFor="status">Order status</Label>
        <select
          id="status"
          className="flex h-11 w-full rounded-xl border border-border bg-background px-3 text-sm"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="paymentStatus">Payment status</Label>
        <select
          id="paymentStatus"
          className="flex h-11 w-full rounded-xl border border-border bg-background px-3 text-sm"
          value={form.paymentStatus}
          onChange={(e) => setForm({ ...form, paymentStatus: e.target.value })}
        >
          {payments.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="tracking">Tracking number</Label>
        <Input
          id="tracking"
          value={form.trackingNumber}
          onChange={(e) => setForm({ ...form, trackingNumber: e.target.value })}
        />
      </div>
      <div className="sm:col-span-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving…" : "Update order"}
        </Button>
      </div>
    </form>
  );
}

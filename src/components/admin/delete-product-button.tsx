"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toaster";

export function DeleteProductButton({ id }: { id: string }) {
  const router = useRouter();

  async function onDelete() {
    if (!confirm("Delete this product?")) return;
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (!res.ok) {
      toast("Failed to delete product");
      return;
    }
    toast("Product deleted");
    router.refresh();
  }

  return (
    <Button size="sm" variant="destructive" onClick={onDelete}>
      Delete
    </Button>
  );
}

"use client";

import { create } from "zustand";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

type Toast = { id: string; message: string };

type ToastStore = {
  toasts: Toast[];
  push: (message: string) => void;
  remove: (id: string) => void;
};

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  push: (message) => {
    const id = Math.random().toString(36).slice(2);
    set((s) => ({ toasts: [...s.toasts, { id, message }] }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, 2800);
  },
  remove: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

export function toast(message: string) {
  useToastStore.getState().push(message);
}

export function Toaster() {
  const toasts = useToastStore((s) => s.toasts);

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "pointer-events-auto rounded-xl border border-border bg-foreground px-4 py-3 text-sm text-background shadow-lg"
          )}
          role="status"
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}

export function useToastEffect(message: string | null) {
  useEffect(() => {
    if (message) toast(message);
  }, [message]);
}

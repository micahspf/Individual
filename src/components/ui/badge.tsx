import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-pink-500/30 bg-pink-500/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-pink-300",
        className
      )}
      {...props}
    />
  );
}

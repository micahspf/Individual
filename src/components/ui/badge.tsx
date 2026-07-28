import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border-2 border-white bg-[#ffe9f4] px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-accent shadow-sm",
        className
      )}
      {...props}
    />
  );
}

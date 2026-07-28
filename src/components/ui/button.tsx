import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "btn-bubble inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-[linear-gradient(135deg,#ff4fa3_0%,#ff7ac0_45%,#ff9ad0_100%)] text-white hover:brightness-105 shadow-[0_8px_0_#e03d8d]",
        secondary:
          "bg-[linear-gradient(135deg,#ffe14a_0%,#fff08a_100%)] text-[#3b2148] hover:brightness-105 shadow-[0_8px_0_#e0c12a]",
        outline:
          "border-2 border-[#ff8ec8] bg-white text-[#3b2148] hover:bg-[#fff0f8]",
        ghost: "hover:bg-[#ffe9f4] text-[#3b2148]",
        destructive:
          "bg-[#ff6b7a] text-white hover:bg-[#ff5a6a] shadow-[0_6px_0_#d94a58]",
        accent:
          "bg-[linear-gradient(135deg,#ffe14a_0%,#ff4fa3_100%)] text-white hover:brightness-105",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-10 px-4 text-xs",
        lg: "h-14 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { buttonVariants };

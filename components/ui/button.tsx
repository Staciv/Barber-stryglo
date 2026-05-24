import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 rounded-2xl text-sm font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-b from-accent to-[#e55a00] text-white shadow-glow hover:-translate-y-0.5 hover:shadow-glow-lg active:translate-y-0 active:shadow-glow border border-white/10",
        secondary:
          "border border-white/[0.08] bg-white/[0.03] text-white backdrop-blur-sm hover:border-white/15 hover:bg-white/[0.06] hover:shadow-card active:bg-white/[0.08]",
        ghost:
          "bg-transparent text-muted hover:bg-white/[0.04] hover:text-white active:bg-white/[0.06]",
        "ghost-accent":
          "bg-transparent text-accent hover:bg-accent/10 hover:text-accent active:bg-accent/15",
      },
      size: {
        default: "min-h-14 px-6",
        sm: "min-h-11 rounded-xl px-4 text-[13px]",
        lg: "min-h-16 px-8 text-base",
        icon: "size-14 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

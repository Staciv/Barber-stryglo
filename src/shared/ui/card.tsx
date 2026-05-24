import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";

const cardVariants = cva(
  "rounded-3xl border surface-stroke shadow-card backdrop-blur-xl transition-all duration-200",
  {
    variants: {
      variant: {
        default: "surface-panel",
        elevated: "surface-panel-elevated",
      },
      interactive: {
        true: "cursor-pointer hover:-translate-y-0.5 hover:border-white/15",
        false: "",
      },
      padding: {
        sm: "p-4",
        md: "p-5",
        lg: "p-6",
      },
    },
    defaultVariants: {
      variant: "default",
      interactive: false,
      padding: "md",
    },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export function Card({ className, variant, interactive, padding, ...props }: CardProps) {
  return <div className={cn(cardVariants({ variant, interactive, padding, className }))} {...props} />;
}

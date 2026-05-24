import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/utils";

const badgeVariants = cva(
  "inline-flex min-h-7 items-center rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-[0.03em]",
  {
    variants: {
      variant: {
        default: "border-white/10 bg-white/5 text-white/80",
        accent: "border-accent/20 bg-accent/12 text-accent",
        success: "border-success/20 bg-success/12 text-success",
        warning: "border-warning/20 bg-warning/12 text-warning",
        danger: "border-danger/20 bg-danger/12 text-danger",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}

import type { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  compact?: boolean;
  className?: string;
};

export function EmptyState({
  title,
  description,
  action,
  compact = false,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-dashed border-white/10 bg-white/[0.035] text-center shadow-inset",
        compact ? "p-4" : "p-5",
        className,
      )}
    >
      <div className="mx-auto mb-3 flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-accent">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-current shadow-glow" />
      </div>
      <p className="text-sm font-semibold text-foreground">{title}</p>
      {description && <p className="mt-1 text-sm leading-6 text-muted">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

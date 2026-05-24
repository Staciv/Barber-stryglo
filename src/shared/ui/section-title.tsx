import type { ReactNode } from "react";

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
};

export function SectionTitle({ title, subtitle, action }: SectionTitleProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>
        {subtitle && <p className="text-sm leading-6 text-muted">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

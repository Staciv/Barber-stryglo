import type { ReactNode } from "react";
import { SectionTitle } from "@/shared/ui/section-title";

type BarberDashboardSectionProps = {
  title: string;
  subtitle: string;
  empty?: boolean;
  emptyTitle: string;
  emptyText: string;
  action?: ReactNode;
  children: ReactNode;
};

export function BarberDashboardSection({
  title,
  subtitle,
  empty,
  emptyTitle,
  emptyText,
  action,
  children,
}: BarberDashboardSectionProps) {
  return (
    <section className="space-y-3">
      <SectionTitle title={title} subtitle={subtitle} action={action} />
      {empty ? (
        <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.03] p-5">
          <p className="text-sm font-semibold text-foreground">{emptyTitle}</p>
          <p className="mt-1 text-sm leading-6 text-muted">{emptyText}</p>
        </div>
      ) : (
        <div className="space-y-3">{children}</div>
      )}
    </section>
  );
}

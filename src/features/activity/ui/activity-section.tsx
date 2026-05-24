import type { ReactNode } from "react";
import { EmptyState } from "@/shared/ui/empty-state";
import { FadeIn } from "@/shared/ui/motion";
import { SectionTitle } from "@/shared/ui/section-title";

type ActivitySectionProps = {
  title: string;
  subtitle: string;
  empty?: boolean;
  emptyTitle: string;
  emptyText: string;
  action?: ReactNode;
  children: ReactNode;
};

export function ActivitySection({
  title,
  subtitle,
  empty,
  emptyTitle,
  emptyText,
  action,
  children,
}: ActivitySectionProps) {
  return (
    <FadeIn as="section" className="space-y-3">
      <SectionTitle title={title} subtitle={subtitle} action={action} />
      {empty ? (
        <EmptyState title={emptyTitle} description={emptyText} />
      ) : (
        <div className="space-y-3">{children}</div>
      )}
    </FadeIn>
  );
}

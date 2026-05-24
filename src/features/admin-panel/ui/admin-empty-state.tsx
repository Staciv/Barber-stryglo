import { EmptyState } from "@/shared/ui/empty-state";

type AdminEmptyStateProps = {
  title: string;
  text: string;
};

export function AdminEmptyState({ title, text }: AdminEmptyStateProps) {
  return <EmptyState title={title} description={text} compact />;
}

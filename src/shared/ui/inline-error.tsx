import { cn } from "@/shared/lib/utils";

type InlineErrorProps = {
  children?: React.ReactNode;
  className?: string;
};

export function InlineError({ children, className }: InlineErrorProps) {
  if (!children) {
    return null;
  }

  return (
    <p
      role="status"
      aria-live="polite"
      className={cn(
        "rounded-2xl border border-danger/25 bg-danger/10 px-3 py-2 text-sm leading-5 text-danger",
        className,
      )}
    >
      {children}
    </p>
  );
}

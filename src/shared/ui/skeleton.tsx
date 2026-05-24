import { cn } from "@/shared/lib/utils";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-2xl bg-[linear-gradient(90deg,rgba(255,255,255,0.04),rgba(255,255,255,0.08),rgba(255,255,255,0.04))] bg-[length:220%_100%]",
        className,
      )}
      {...props}
    />
  );
}

export function CardSkeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 surface-panel p-4 shadow-card",
        className,
      )}
      {...props}
    >
      <Skeleton className="h-4 w-28" />
      <Skeleton className="mt-3 h-3 w-full" />
      <Skeleton className="mt-2 h-3 w-2/3" />
    </div>
  );
}

export function SlotSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Skeleton className="h-16 rounded-2xl" />
      <Skeleton className="h-16 rounded-2xl" />
    </div>
  );
}

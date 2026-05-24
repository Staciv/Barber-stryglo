import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BottomActionBarProps = {
  children: ReactNode;
  className?: string;
};

export function BottomActionBar({ children, className }: BottomActionBarProps) {
  return (
    <div
      className={cn(
        "sticky bottom-0 left-0 right-0 mt-6 rounded-t-[28px] border border-white/10 bg-[#111111]/90 p-4 backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

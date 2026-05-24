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
        "sticky bottom-0 left-0 right-0 mt-6",
        // Glass effect with border
        "rounded-t-[28px] border border-b-0 border-white/[0.06]",
        // Background with blur
        "bg-[#0a0a0b]/90 backdrop-blur-xl",
        // Inner glow
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]",
        // Content padding
        "p-4",
        className
      )}
    >
      {/* Top gradient line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {children}
    </div>
  );
}

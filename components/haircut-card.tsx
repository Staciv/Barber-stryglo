import { Sparkles } from "lucide-react";
import type { HaircutStyle } from "@/types/booking";
import { cn } from "@/lib/utils";

type HaircutCardProps = {
  style: HaircutStyle;
  selected?: boolean;
  onClick?: () => void;
};

export function HaircutCard({ style, selected, onClick }: HaircutCardProps) {
  return (
    <button
      type="button"
      aria-label={`Выбрать стиль ${style.name}`}
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "group relative min-w-[260px] snap-start overflow-hidden rounded-[24px] border p-4 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80",
        selected
          ? "border-accent bg-accent/[0.08] shadow-glow-lg"
          : "border-white/[0.06] bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"
      )}
    >
      {/* Image Preview Area */}
      <div className="relative mb-4 h-40 overflow-hidden rounded-[18px]">
        {/* Gradient Background */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br transition-all duration-500",
            style.accent,
            selected ? "opacity-100" : "opacity-80 group-hover:opacity-90"
          )}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px]" />

        {/* Center Glow */}
        <div
          className={cn(
            "absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15),transparent_60%)] transition-opacity duration-300",
            selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}
        />

        {/* Match Badge */}
        <div className="absolute right-3 top-3">
          <span
            className={cn(
              "flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium backdrop-blur-sm",
              selected
                ? "border-white/20 bg-white/20 text-white"
                : "border-white/10 bg-black/30 text-white/90"
            )}
          >
            <Sparkles className="size-3" />
            {style.match}%
          </span>
        </div>

        {/* Selected indicator */}
        {selected && (
          <div className="absolute bottom-3 left-3 flex size-6 items-center justify-center rounded-full bg-accent shadow-glow">
            <div className="size-2.5 rounded-full bg-white" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <p
            className={cn(
              "text-lg font-semibold transition-colors",
              selected ? "text-accent" : "text-white group-hover:text-accent"
            )}
          >
            {style.name}
          </p>
        </div>
        <p className="text-sm text-white/70">{style.vibe}</p>
        <p className="text-sm text-white/50">{style.note}</p>
      </div>
    </button>
  );
}

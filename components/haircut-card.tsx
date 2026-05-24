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
        "min-w-[250px] snap-start rounded-[28px] border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80",
        selected
          ? "border-accent bg-white/10 shadow-glow"
          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10",
      )}
    >
      <div className={cn("mb-4 h-36 rounded-[22px] bg-gradient-to-br", style.accent)} />
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <p className="text-lg font-semibold text-white">{style.name}</p>
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-white">{style.match}% match</span>
        </div>
        <p className="text-sm text-white/75">{style.vibe}</p>
        <p className="text-sm text-muted">{style.note}</p>
      </div>
    </button>
  );
}

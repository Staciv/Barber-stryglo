import { Star } from "lucide-react";
import type { Barber } from "@/types/booking";
import { cn } from "@/lib/utils";

type BarberCardProps = {
  barber: Barber;
  selected?: boolean;
  onClick?: () => void;
};

export function BarberCard({ barber, selected, onClick }: BarberCardProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={`Выбрать барбера ${barber.name}`}
      onClick={onClick}
      className={cn(
        "group relative w-full overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80",
        selected
          ? "border-accent bg-accent/[0.08] shadow-glow"
          : "border-white/[0.06] bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"
      )}
    >
      {/* Accent gradient overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-50 transition-opacity duration-300",
          barber.accent,
          selected ? "opacity-30" : "opacity-0 group-hover:opacity-20"
        )}
      />

      <div className="relative space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Avatar placeholder */}
            <div
              className={cn(
                "flex size-12 items-center justify-center rounded-xl bg-gradient-to-br text-lg font-bold text-white",
                barber.accent
              )}
            >
              {barber.name.charAt(0)}
            </div>
            <div>
              <p className="text-lg font-bold text-white">
                {barber.name}
                {barber.id === "any" && (
                  <span className="ml-2 text-sm font-normal text-accent">
                    (быстрее)
                  </span>
                )}
              </p>
              <p className="text-sm text-white/60">{barber.role}</p>
            </div>
          </div>
          <span
            className={cn(
              "flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium",
              selected
                ? "border-accent/30 bg-accent/15 text-accent"
                : "border-white/10 bg-white/[0.03] text-white/70"
            )}
          >
            <Star className="size-3" />
            {barber.experience}
          </span>
        </div>
        <p className="max-w-xs text-sm text-white/60">{barber.bio}</p>

        {/* Selected indicator */}
        {selected && (
          <div className="absolute right-4 top-4 flex size-5 items-center justify-center rounded-full bg-accent">
            <div className="size-2 rounded-full bg-white" />
          </div>
        )}
      </div>
    </button>
  );
}

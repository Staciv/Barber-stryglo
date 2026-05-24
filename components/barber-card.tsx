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
        "relative overflow-hidden rounded-3xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80",
        selected
          ? "border-accent bg-white/8 shadow-glow"
          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10",
      )}
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-80", barber.accent)} />
      <div className="relative space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-lg font-bold text-white">
              {barber.name}
              {barber.id === "any" ? " (быстрее)" : ""}
            </p>
            <p className="text-sm text-white/70">{barber.role}</p>
          </div>
          <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/80">
            {barber.experience}
          </span>
        </div>
        <p className="max-w-xs text-sm text-white/75">{barber.bio}</p>
      </div>
    </button>
  );
}

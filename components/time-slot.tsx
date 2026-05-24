import { cn } from "@/lib/utils";

type TimeSlotProps = {
  time: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export function TimeSlot({ time, selected, disabled, onClick }: TimeSlotProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={`Выбрать время ${time}`}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "min-h-16 rounded-2xl border px-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80",
        selected
          ? "border-accent bg-accent text-white shadow-glow"
          : "border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10",
        disabled && "cursor-not-allowed opacity-40",
      )}
    >
      <span className="block text-lg font-bold">{time}</span>
      <span className="text-xs text-white/70">{selected ? "Выбрано" : "Свободно"}</span>
    </button>
  );
}

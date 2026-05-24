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
        "group relative min-h-[72px] overflow-hidden rounded-2xl border px-4 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80",
        selected
          ? "border-accent bg-gradient-to-br from-accent to-[#e55a00] text-white shadow-glow"
          : "border-white/[0.06] bg-white/[0.02] text-white hover:border-white/10 hover:bg-white/[0.04]",
        disabled && "cursor-not-allowed opacity-40"
      )}
    >
      {/* Hover glow effect */}
      {!selected && !disabled && (
        <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 transition-all duration-300 group-hover:from-accent/[0.03] group-hover:to-accent-cyan/[0.02]" />
      )}

      <div className="relative flex h-full flex-col justify-center py-3">
        <span className="block text-lg font-bold">{time}</span>
        <span
          className={cn(
            "text-xs transition-colors",
            selected ? "text-white/80" : "text-white/50 group-hover:text-white/60"
          )}
        >
          {selected ? "Выбрано" : "Свободно"}
        </span>
      </div>

      {/* Selected indicator */}
      {selected && (
        <div className="absolute right-3 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center rounded-full bg-white/20">
          <div className="size-2 rounded-full bg-white" />
        </div>
      )}
    </button>
  );
}

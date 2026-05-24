import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type VoiceButtonProps = {
  onClick?: () => void;
  active?: boolean;
};

export function VoiceButton({ onClick, active }: VoiceButtonProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        {/* Outer glow rings */}
        {active && (
          <>
            <span className="absolute inset-[-8px] rounded-full border border-accent/20 animate-pulse-ring" />
            <span className="absolute inset-[-16px] rounded-full border border-accent/10 animate-pulse-ring [animation-delay:0.5s]" />
          </>
        )}

        {/* Button */}
        <Button
          type="button"
          size="icon"
          aria-label="Голосовая запись"
          onClick={onClick}
          className={cn(
            "relative size-16 border-2 border-accent/30 bg-gradient-to-b from-panel-light to-panel text-white",
            active && "shadow-glow-lg border-accent/40"
          )}
        >
          {/* Inner gradient */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/10 via-transparent to-accent-cyan/5" />

          {/* Icon */}
          <Mic className="relative size-6 text-accent" />
        </Button>
      </div>

      <div className="text-center">
        <p className="text-xs font-medium text-white/70">
          Скажи: <span className="text-accent">&laquo;Запиши меня завтра вечером&raquo;</span>
        </p>
      </div>
    </div>
  );
}

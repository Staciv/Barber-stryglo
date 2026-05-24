import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type VoiceButtonProps = {
  onClick?: () => void;
  active?: boolean;
};

export function VoiceButton({ onClick, active }: VoiceButtonProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <Button
        type="button"
        size="icon"
        aria-label="Голосовая запись"
        onClick={onClick}
        className={cn(
          "relative border border-accent/30 bg-white/5 text-white backdrop-blur-sm",
          active && "shadow-glow",
        )}
      >
        <span className={cn("absolute inset-0 rounded-full border border-accent/25", active && "animate-pulse-ring")} />
        <Mic className="relative size-5" />
      </Button>
      <p className="text-xs text-muted">Скажи: «Запиши меня завтра вечером»</p>
    </div>
  );
}

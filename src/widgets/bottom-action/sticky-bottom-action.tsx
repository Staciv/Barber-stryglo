import { Button, type ButtonProps } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

type StickyBottomActionProps = {
  summary?: string;
  buttonLabel: string;
  onAction?: ButtonProps["onClick"];
  buttonVariant?: ButtonProps["variant"];
  buttonDisabled?: boolean;
  className?: string;
};

export function StickyBottomAction({
  summary,
  buttonLabel,
  onAction,
  buttonVariant = "primary",
  buttonDisabled = false,
  className,
}: StickyBottomActionProps) {
  return (
    <div
      className={cn(
        "sticky bottom-0 left-0 right-0 rounded-t-[1.75rem] border border-white/10 surface-panel-elevated px-4 pb-safe-offset-4 pt-4 shadow-card backdrop-blur-xl",
        className,
      )}
    >
      <div className="space-y-3">
        {summary && <p className="text-sm leading-6 text-muted">{summary}</p>}
        <Button className="w-full" variant={buttonVariant} disabled={buttonDisabled} onClick={onAction}>
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
}

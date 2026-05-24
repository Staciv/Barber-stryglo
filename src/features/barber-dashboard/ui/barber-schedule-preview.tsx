import type { BarberScheduleItem } from "@/features/barber-dashboard/model/mock-barber-dashboard";
import { Badge } from "@/shared/ui/badge";
import { Card } from "@/shared/ui/card";

type BarberSchedulePreviewProps = {
  items: BarberScheduleItem[];
};

export function BarberSchedulePreview({ items }: BarberSchedulePreviewProps) {
  return (
    <div className="grid gap-2">
      {items.map((item) => (
        <Card key={item.id} padding="sm" className="rounded-3xl">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-base font-semibold text-foreground">{item.weekday}</p>
              <p className="mt-1 text-sm text-muted">
                {item.startTime}-{item.endTime}
              </p>
            </div>
            <Badge variant={item.isGoAvailable ? "accent" : "default"}>
              {item.isGoAvailable ? "GO доступен" : "Только салон"}
            </Badge>
          </div>
        </Card>
      ))}
    </div>
  );
}

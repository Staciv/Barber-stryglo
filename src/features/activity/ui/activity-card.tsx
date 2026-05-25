"use client";

import { motion } from "framer-motion";
import type { ActivityBooking } from "@/features/activity/model/mock-activity";
import { Avatar } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

const statusLabel: Record<ActivityBooking["status"], string> = {
  pending: "Ожидает",
  confirmed: "Подтверждена",
  cancelled: "Отменена",
  completed: "Завершена",
};

const statusVariant: Record<ActivityBooking["status"], "default" | "accent" | "success" | "warning" | "danger"> = {
  pending: "warning",
  confirmed: "success",
  cancelled: "danger",
  completed: "default",
};

type ActivityCardProps = {
  booking: ActivityBooking;
  onRepeat?: (booking: ActivityBooking) => void;
};

export function ActivityCard({ booking, onRepeat }: ActivityCardProps) {
  const canRepeat = booking.status === "completed";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-5"
    >
      <span className="absolute left-0 top-5 size-2.5 rounded-full bg-accent shadow-glow" />
      <span className="absolute bottom-0 left-[4px] top-9 w-px bg-white/10" />
      <Card padding="sm" className="rounded-3xl">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar fallback={booking.barberName} size="md" />
            <div className="min-w-0">
              <p className="truncate text-base font-semibold text-foreground">{booking.serviceName}</p>
              <p className="mt-1 text-sm text-muted">{booking.barberName}</p>
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2">
            <Badge variant={statusVariant[booking.status]}>{statusLabel[booking.status]}</Badge>
            <Badge>{booking.type === "go" ? "GO" : "Салон"}</Badge>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-3">
          <p className="text-sm font-semibold text-foreground">
            {booking.date} · {booking.startTime}
            {booking.endTime ? `-${booking.endTime}` : ""}
          </p>
          <p className="mt-1 text-sm text-muted">
            {booking.durationMinutes} мин · {booking.priceByn} BYN
          </p>
          {booking.address && <p className="mt-1 text-sm text-muted">{booking.address}</p>}
        </div>

        {canRepeat && onRepeat && (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="mt-3 w-full"
            onClick={() => onRepeat(booking)}
          >
            Повторить запись
          </Button>
        )}
      </Card>
    </motion.div>
  );
}

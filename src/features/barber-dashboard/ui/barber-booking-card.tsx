"use client";

import { motion } from "framer-motion";
import type { BarberDashboardBooking } from "@/features/barber-dashboard/model/mock-barber-dashboard";
import { Avatar } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Card } from "@/shared/ui/card";

const bookingStatusLabel: Record<BarberDashboardBooking["status"], string> = {
  pending: "Ожидает",
  confirmed: "Подтверждена",
  cancelled: "Отменена",
  completed: "Завершена",
};

const bookingStatusVariant: Record<
  BarberDashboardBooking["status"],
  "default" | "accent" | "success" | "warning" | "danger"
> = {
  pending: "warning",
  confirmed: "success",
  cancelled: "danger",
  completed: "default",
};

type BarberBookingCardProps = {
  booking: BarberDashboardBooking;
  compactDate?: boolean;
};

export function BarberBookingCard({ booking, compactDate }: BarberBookingCardProps) {
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
            <Avatar fallback={booking.clientName} size="md" />
            <div className="min-w-0">
              <p className="truncate text-base font-semibold text-foreground">{booking.clientName}</p>
              <p className="mt-1 truncate text-sm text-muted">{booking.serviceTitle}</p>
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2">
            <Badge variant={bookingStatusVariant[booking.status]}>
              {bookingStatusLabel[booking.status]}
            </Badge>
            <Badge>{booking.type === "go" ? "GO" : "Салон"}</Badge>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-3">
          <p className="text-sm font-semibold text-foreground">
            {!compactDate && `${booking.date} · `}
            {booking.startTime}-{booking.endTime}
          </p>
          {booking.clientPhone && <p className="mt-1 text-sm text-muted">{booking.clientPhone}</p>}
          {booking.address && <p className="mt-1 text-sm text-muted">{booking.address}</p>}
        </div>
      </Card>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import type {
  BarberGoRequest,
  BarberGoRequestStatus,
} from "@/features/barber-dashboard/model/mock-barber-dashboard";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

const goStatusLabel: Record<BarberGoRequest["status"], string> = {
  pending: "Новая",
  accepted: "Принята",
  declined: "Отклонена",
  proposed_new_time: "Новое время",
  cancelled: "Отменена",
};

const goStatusVariant: Record<
  BarberGoRequest["status"],
  "default" | "accent" | "success" | "warning" | "danger"
> = {
  pending: "warning",
  accepted: "success",
  declined: "danger",
  proposed_new_time: "accent",
  cancelled: "default",
};

type BarberGoRequestCardProps = {
  request: BarberGoRequest;
  onStatusChange: (id: string, status: BarberGoRequestStatus) => void;
};

export function BarberGoRequestCard({
  request,
  onStatusChange,
}: BarberGoRequestCardProps) {
  const actionsDisabled = request.status !== "pending";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-5"
    >
      <span className="absolute left-0 top-5 size-2.5 rounded-full bg-accent-cold shadow-[0_0_18px_rgba(97,219,255,0.28)]" />
      <span className="absolute bottom-0 left-[4px] top-9 w-px bg-white/10" />
      <Card padding="sm" className="rounded-3xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-base font-semibold text-foreground">{request.clientName}</p>
            <p className="mt-1 text-sm text-muted">{request.serviceTitle}</p>
          </div>
          <Badge variant={goStatusVariant[request.status]}>{goStatusLabel[request.status]}</Badge>
        </div>

        <div className="mt-4 grid gap-2 rounded-2xl border border-white/10 bg-black/20 p-3 text-sm">
          <p className="font-semibold text-foreground">
            {request.proposedDate} · {request.proposedTime}
          </p>
          <p className="text-muted">{request.address}</p>
          {request.clientPhone && <p className="text-muted">{request.clientPhone}</p>}
        </div>

        {request.clientMessage && (
          <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-sm leading-6 text-foreground">
            {request.clientMessage}
          </div>
        )}

        {request.status === "proposed_new_time" && (
          <p className="mt-3 rounded-2xl border border-accent/20 bg-accent/10 p-3 text-sm text-foreground">
            Предложено новое время: 20:15.
          </p>
        )}

        <div className="mt-3 grid grid-cols-3 gap-2">
          <Button
            type="button"
            size="sm"
            disabled={actionsDisabled}
            onClick={() => onStatusChange(request.id, "accepted")}
          >
            Принять
          </Button>
          <Button
            type="button"
            size="sm"
            variant="secondary"
            disabled={actionsDisabled}
            onClick={() => onStatusChange(request.id, "proposed_new_time")}
          >
            Другое
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            disabled={actionsDisabled}
            onClick={() => onStatusChange(request.id, "declined")}
          >
            Отказать
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

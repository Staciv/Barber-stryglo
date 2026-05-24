"use client";

import { motion } from "framer-motion";
import type { GoRequestActivity } from "@/features/activity/model/mock-activity";
import { Badge } from "@/shared/ui/badge";
import { Card } from "@/shared/ui/card";

const goStatusLabel: Record<GoRequestActivity["status"], string> = {
  pending: "На рассмотрении",
  accepted: "Принята",
  declined: "Отклонена",
  proposed_new_time: "Новое время",
  cancelled: "Отменена",
};

const goStatusVariant: Record<GoRequestActivity["status"], "default" | "accent" | "success" | "warning" | "danger"> = {
  pending: "warning",
  accepted: "success",
  declined: "danger",
  proposed_new_time: "accent",
  cancelled: "default",
};

type GoRequestCardProps = {
  request: GoRequestActivity;
};

export function GoRequestCard({ request }: GoRequestCardProps) {
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
            <p className="text-base font-semibold text-foreground">{request.serviceTitle}</p>
            <p className="mt-1 text-sm text-muted">
              {request.barberName ? `Мастер: ${request.barberName}` : "Мастер ещё не назначен"}
            </p>
          </div>
          <Badge variant={goStatusVariant[request.status]}>{goStatusLabel[request.status]}</Badge>
        </div>

        <div className="mt-4 grid gap-2 rounded-2xl border border-white/10 bg-black/20 p-3 text-sm">
          <p className="font-semibold text-foreground">
            {request.proposedDate} · {request.proposedTime}
          </p>
          <p className="text-muted">{request.address}</p>
        </div>

        {request.status === "proposed_new_time" && request.barberMessage && (
          <div className="mt-3 rounded-2xl border border-accent/20 bg-accent/10 p-3 text-sm leading-6 text-foreground">
            {request.barberMessage}
          </div>
        )}
      </Card>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useAppointmentStore } from "@/entities/booking/appointment-store";
import {
  activeGoRequests,
  pastVisits,
  upcomingBookings,
  type ActivityBooking,
} from "@/features/activity/model/mock-activity";
import { ActivityCard } from "@/features/activity/ui/activity-card";
import { ActivitySection } from "@/features/activity/ui/activity-section";
import { GoRequestCard } from "@/features/activity/ui/go-request-card";
import { useBookingDraftStore } from "@/features/booking/model/booking-draft-store";
import { Badge } from "@/shared/ui/badge";
import { Card } from "@/shared/ui/card";

export default function ActivityPage() {
  const router = useRouter();
  const setService = useBookingDraftStore((state) => state.setService);
  const appointments = useAppointmentStore((state) => state.appointments);
  const persistedBookings = useMemo(
    () =>
      appointments.map((appointment) => ({
        id: appointment.id,
        barberName: appointment.barberName,
        barberId: appointment.barberId,
        serviceTitle: appointment.serviceTitle,
        serviceId: appointment.serviceId,
        date: appointment.date,
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        status: appointment.status,
        type: appointment.type,
      })),
    [appointments],
  );
  const displayedUpcomingBookings = [...persistedBookings, ...upcomingBookings];

  const handleRepeatBooking = (booking: ActivityBooking) => {
    setService(booking.serviceId);
    router.push("/booking");
  };

  return (
    <main className="min-h-screen bg-striglo-grid">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-safe-offset-4 pt-safe-offset-6">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[2rem] border border-white/10 surface-panel p-5 shadow-card backdrop-blur-xl"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                STRIGLO activity
              </p>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground">
                Мои записи
              </h1>
            </div>
            <Badge variant="accent">Timeline</Badge>
          </div>
          <p className="mt-4 text-sm leading-6 text-muted">
            Ближайшие визиты, история и активные заявки STRIGLO GO в одном экране.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Link
              href="/booking"
              className="inline-flex min-h-14 items-center justify-center rounded-[1.25rem] border border-accent/20 bg-accent px-5 text-sm font-semibold text-white shadow-glow transition-all duration-200 hover:bg-[#ff8a36] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Новая запись
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-14 items-center justify-center rounded-[1.25rem] border border-white/10 bg-white/5 px-5 text-sm font-semibold text-white shadow-inset transition-all duration-200 hover:border-white/20 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Домой
            </Link>
          </div>
        </motion.header>

        <Card padding="sm" className="mt-5 rounded-3xl">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-xl font-black text-foreground">{displayedUpcomingBookings.length}</p>
              <p className="mt-1 text-xs text-muted">впереди</p>
            </div>
            <div>
              <p className="text-xl font-black text-foreground">{pastVisits.length}</p>
              <p className="mt-1 text-xs text-muted">визита</p>
            </div>
            <div>
              <p className="text-xl font-black text-foreground">{activeGoRequests.length}</p>
              <p className="mt-1 text-xs text-muted">GO</p>
            </div>
          </div>
        </Card>

        <div className="mt-6 space-y-8">
          <ActivitySection
            title="Ближайшие"
            subtitle="Записи, которые ещё впереди."
            empty={displayedUpcomingBookings.length === 0}
            emptyTitle="Пока нет будущих записей"
            emptyText="Следующую стрижку можно забронировать за несколько секунд."
            action={<Badge variant="success">{displayedUpcomingBookings.length}</Badge>}
          >
            {displayedUpcomingBookings.map((booking) => (
              <ActivityCard key={booking.id} booking={booking} />
            ))}
          </ActivitySection>

          <ActivitySection
            title="STRIGLO GO"
            subtitle="Активные выездные заявки."
            empty={activeGoRequests.length === 0}
            emptyTitle="Нет активных GO заявок"
            emptyText="Когда появится выездная заявка, она будет здесь."
            action={<Badge variant="accent">{activeGoRequests.length}</Badge>}
          >
            {activeGoRequests.map((request) => (
              <GoRequestCard key={request.id} request={request} />
            ))}
          </ActivitySection>

          <ActivitySection
            title="История"
            subtitle="Прошлые визиты и быстрый повтор."
            empty={pastVisits.length === 0}
            emptyTitle="История пока пустая"
            emptyText="После первого визита здесь появится кнопка повтора."
            action={<Badge>{pastVisits.length}</Badge>}
          >
            {pastVisits.map((booking) => (
              <ActivityCard key={booking.id} booking={booking} onRepeat={handleRepeatBooking} />
            ))}
          </ActivitySection>
        </div>
      </div>
    </main>
  );
}

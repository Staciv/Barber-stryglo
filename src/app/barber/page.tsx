"use client";

import { useState } from "react";
import {
  barberSchedulePreview,
  initialBarberGoRequests,
  todayBookings,
  upcomingBarberBookings,
  type BarberGoRequestStatus,
} from "@/features/barber-dashboard/model/mock-barber-dashboard";
import { BarberBookingCard } from "@/features/barber-dashboard/ui/barber-booking-card";
import { BarberDashboardHeader } from "@/features/barber-dashboard/ui/barber-dashboard-header";
import { BarberDashboardSection } from "@/features/barber-dashboard/ui/barber-dashboard-section";
import { BarberGoRequestCard } from "@/features/barber-dashboard/ui/barber-go-request-card";
import { BarberSchedulePreview } from "@/features/barber-dashboard/ui/barber-schedule-preview";
import { Badge } from "@/shared/ui/badge";

export default function BarberDashboardPage() {
  const [goRequests, setGoRequests] = useState(initialBarberGoRequests);

  const handleGoStatusChange = (id: string, status: BarberGoRequestStatus) => {
    setGoRequests((requests) =>
      requests.map((request) => (request.id === id ? { ...request, status } : request)),
    );
  };

  return (
    <main className="min-h-screen bg-striglo-grid">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-safe-offset-4 pt-safe-offset-6">
        <BarberDashboardHeader todayCount={todayBookings.length} goRequestCount={goRequests.length} />

        <div className="mt-6 space-y-8">
          <BarberDashboardSection
            title="Сегодня"
            subtitle="Рабочая лента на сегодня."
            empty={todayBookings.length === 0}
            emptyTitle="Сегодня записей нет"
            emptyText="Свободный день. Новые записи появятся здесь."
            action={<Badge variant="success">{todayBookings.length}</Badge>}
          >
            {todayBookings.map((booking) => (
              <BarberBookingCard key={booking.id} booking={booking} compactDate />
            ))}
          </BarberDashboardSection>

          <BarberDashboardSection
            title="Записи"
            subtitle="Ближайшие визиты после сегодня."
            empty={upcomingBarberBookings.length === 0}
            emptyTitle="Нет будущих записей"
            emptyText="Когда клиенты запишутся, ты увидишь их здесь."
            action={<Badge>{upcomingBarberBookings.length}</Badge>}
          >
            {upcomingBarberBookings.map((booking) => (
              <BarberBookingCard key={booking.id} booking={booking} />
            ))}
          </BarberDashboardSection>

          <BarberDashboardSection
            title="GO заявки"
            subtitle="Выездные запросы от клиентов."
            empty={goRequests.length === 0}
            emptyTitle="Нет GO заявок"
            emptyText="Новые выездные запросы появятся в этой ленте."
            action={<Badge variant="accent">{goRequests.length}</Badge>}
          >
            {goRequests.map((request) => (
              <BarberGoRequestCard
                key={request.id}
                request={request}
                onStatusChange={handleGoStatusChange}
              />
            ))}
          </BarberDashboardSection>

          <BarberDashboardSection
            title="Расписание"
            subtitle="Быстрый preview доступности."
            empty={barberSchedulePreview.length === 0}
            emptyTitle="Расписание не задано"
            emptyText="Редактирование расписания появится позже."
            action={<Badge variant="warning">{barberSchedulePreview.length}</Badge>}
          >
            <BarberSchedulePreview items={barberSchedulePreview} />
          </BarberDashboardSection>
        </div>
      </div>
    </main>
  );
}

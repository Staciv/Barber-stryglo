"use client";

import { useAdminPanelStore } from "@/features/admin-panel/model/admin-panel-store";
import { Badge } from "@/shared/ui/badge";
import { Card } from "@/shared/ui/card";
import { AdminEmptyState } from "./admin-empty-state";
import { AdminSection } from "./admin-section";

const statusLabel = {
  pending: "Ожидает",
  confirmed: "Подтверждена",
  cancelled: "Отменена",
  completed: "Завершена",
};

const statusVariant = {
  pending: "warning",
  confirmed: "success",
  cancelled: "danger",
  completed: "default",
} as const;

export function BookingsAdminSection() {
  const bookings = useAdminPanelStore((state) => state.bookings);
  const barbers = useAdminPanelStore((state) => state.barbers);
  const services = useAdminPanelStore((state) => state.services);

  const getBarberName = (id: string) => barbers.find((barber) => barber.id === id)?.name ?? "Мастер удалён";
  const getServiceTitle = (id: string) => services.find((service) => service.id === id)?.title ?? "Услуга удалена";

  return (
    <AdminSection
      title="Записи"
      subtitle="Просмотр mock-записей без редактирования и backend-операций."
      action={<Badge variant="accent">{bookings.length}</Badge>}
    >
      <div className="space-y-3">
        {bookings.length === 0 ? (
          <AdminEmptyState title="Записей пока нет" text="Когда появятся mock-записи, они будут здесь." />
        ) : (
          bookings.map((booking) => (
            <Card key={booking.id} padding="sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-foreground">{booking.userName}</p>
                  <p className="mt-1 text-sm leading-5 text-muted">
                    {getServiceTitle(booking.serviceId)} · {getBarberName(booking.barberId)}
                  </p>
                  <p className="mt-3 text-sm text-muted">
                    {booking.date} · {booking.startTime}-{booking.endTime}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <Badge variant={statusVariant[booking.status]}>{statusLabel[booking.status]}</Badge>
                  <Badge>{booking.type === "go" ? "GO" : "Салон"}</Badge>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </AdminSection>
  );
}

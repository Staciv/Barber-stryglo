"use client";

import { useState } from "react";
import { isEndAfterStart } from "@/features/admin-panel/lib/admin-validation";
import { useAdminPanelStore } from "@/features/admin-panel/model/admin-panel-store";
import { weekdayLabels } from "@/features/admin-panel/model/mock-admin-data";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { AdminEmptyState } from "./admin-empty-state";
import { AdminSection } from "./admin-section";
import { Field, Select, TextInput } from "./form-controls";

type ScheduleErrors = {
  barberId?: string;
  time?: string;
};

export function SchedulesAdminSection() {
  const barbers = useAdminPanelStore((state) => state.barbers);
  const services = useAdminPanelStore((state) => state.services);
  const assignments = useAdminPanelStore((state) => state.assignments);
  const availability = useAdminPanelStore((state) => state.availability);
  const assignServiceToBarber = useAdminPanelStore((state) => state.assignServiceToBarber);
  const createAvailability = useAdminPanelStore((state) => state.createAvailability);

  const [assignmentBarberId, setAssignmentBarberId] = useState(barbers[0]?.id ?? "");
  const [assignmentServiceId, setAssignmentServiceId] = useState(services[0]?.id ?? "");
  const [assignmentError, setAssignmentError] = useState("");
  const [assignmentMessage, setAssignmentMessage] = useState("");

  const [barberId, setBarberId] = useState(barbers[0]?.id ?? "");
  const [weekday, setWeekday] = useState("1");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("18:00");
  const [isGoAvailable, setIsGoAvailable] = useState(false);
  const [errors, setErrors] = useState<ScheduleErrors>({});

  const getBarberName = (id: string) => barbers.find((barber) => barber.id === id)?.name ?? "Мастер удалён";
  const getServiceTitle = (id: string) => services.find((service) => service.id === id)?.title ?? "Услуга удалена";

  const handleAssign = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = assignServiceToBarber(assignmentBarberId, assignmentServiceId);

    if (!result.ok) {
      setAssignmentError(result.error ?? "Не удалось назначить услугу");
      setAssignmentMessage("");
      return;
    }

    setAssignmentError("");
    setAssignmentMessage("Услуга назначена мастеру");
  };

  const handleCreateAvailability = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: ScheduleErrors = {
      barberId: !barbers.some((barber) => barber.id === barberId) ? "Выбери мастера" : undefined,
      time: !isEndAfterStart(startTime, endTime) ? "Конец смены должен быть позже начала" : undefined,
    };

    if (nextErrors.barberId || nextErrors.time) {
      setErrors(nextErrors);
      return;
    }

    createAvailability({
      barberId,
      weekday: Number(weekday),
      startTime,
      endTime,
      isGoAvailable,
    });

    setErrors({});
  };

  return (
    <AdminSection
      title="График"
      subtitle="Назначай услуги мастерам и добавляй простые окна доступности."
      action={<Badge variant="accent">{availability.length}</Badge>}
    >
      <Card>
        <h3 className="font-semibold text-foreground">Назначить услугу</h3>
        <form className="mt-4 space-y-4" onSubmit={handleAssign}>
          <Field label="Мастер">
            <Select value={assignmentBarberId} onChange={(event) => setAssignmentBarberId(event.target.value)}>
              {barbers.map((barber) => (
                <option key={barber.id} value={barber.id}>
                  {barber.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Услуга">
            <Select value={assignmentServiceId} onChange={(event) => setAssignmentServiceId(event.target.value)}>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.title}
                </option>
              ))}
            </Select>
          </Field>
          {assignmentError && <p className="text-sm text-danger">{assignmentError}</p>}
          {assignmentMessage && <p className="text-sm text-success">{assignmentMessage}</p>}
          <Button type="submit" variant="secondary" className="w-full">
            Назначить
          </Button>
        </form>
      </Card>

      <Card>
        <h3 className="font-semibold text-foreground">Создать доступность</h3>
        <form className="mt-4 space-y-4" onSubmit={handleCreateAvailability}>
          <Field label="Мастер" error={errors.barberId}>
            <Select
              value={barberId}
              error={errors.barberId}
              onChange={(event) => {
                setBarberId(event.target.value);
                setErrors((current) => ({ ...current, barberId: undefined }));
              }}
            >
              {barbers.map((barber) => (
                <option key={barber.id} value={barber.id}>
                  {barber.name}
                </option>
              ))}
            </Select>
          </Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label="День">
              <Select value={weekday} onChange={(event) => setWeekday(event.target.value)}>
                {weekdayLabels.map((label, index) => (
                  <option key={label} value={index + 1}>
                    {label}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Старт" error={errors.time}>
              <TextInput
                type="time"
                value={startTime}
                error={errors.time}
                onChange={(event) => {
                  setStartTime(event.target.value);
                  setErrors((current) => ({ ...current, time: undefined }));
                }}
              />
            </Field>
            <Field label="Конец" error={errors.time}>
              <TextInput
                type="time"
                value={endTime}
                error={errors.time}
                onChange={(event) => {
                  setEndTime(event.target.value);
                  setErrors((current) => ({ ...current, time: undefined }));
                }}
              />
            </Field>
          </div>
          {errors.time && <p className="text-sm text-danger">{errors.time}</p>}
          <label className="flex min-h-12 items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-foreground">
            GO доступен
            <input
              type="checkbox"
              checked={isGoAvailable}
              onChange={(event) => setIsGoAvailable(event.target.checked)}
              className="size-5 accent-[#ff7a1a]"
            />
          </label>
          <Button type="submit" className="w-full">
            Добавить окно
          </Button>
        </form>
      </Card>

      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">Назначения</h3>
        {assignments.length === 0 ? (
          <AdminEmptyState title="Назначений пока нет" text="Свяжи мастера с услугой." />
        ) : (
          assignments.map((assignment) => (
            <Card key={assignment.id} padding="sm">
              <p className="text-sm font-semibold text-foreground">
                {getBarberName(assignment.barberId)} · {getServiceTitle(assignment.serviceId)}
              </p>
            </Card>
          ))
        )}
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">Доступность</h3>
        {availability.length === 0 ? (
          <AdminEmptyState title="График пустой" text="Добавь первое рабочее окно мастера." />
        ) : (
          availability.map((item) => (
            <Card key={item.id} padding="sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-foreground">{getBarberName(item.barberId)}</p>
                  <p className="mt-1 text-sm text-muted">
                    {weekdayLabels[item.weekday - 1]} · {item.startTime}-{item.endTime}
                  </p>
                </div>
                <Badge variant={item.isGoAvailable ? "accent" : "default"}>
                  {item.isGoAvailable ? "GO да" : "GO нет"}
                </Badge>
              </div>
            </Card>
          ))
        )}
      </div>
    </AdminSection>
  );
}

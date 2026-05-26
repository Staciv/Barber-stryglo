"use client";

import { useState } from "react";
import { useAdminPanelStore } from "@/features/admin-panel/model/admin-panel-store";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { AdminEmptyState } from "./admin-empty-state";
import { AdminSection } from "./admin-section";
import { Field, TextArea, TextInput } from "./form-controls";

type ServiceFormErrors = {
  title?: string;
  durationMinutes?: string;
  priceByn?: string;
};

export function ServicesAdminSection() {
  const services = useAdminPanelStore((state) => state.services);
  const createService = useAdminPanelStore((state) => state.createService);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("45");
  const [priceByn, setPriceByn] = useState("45");
  const [isActive, setIsActive] = useState(true);
  const [errors, setErrors] = useState<ServiceFormErrors>({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const duration = Number(durationMinutes);
    const price = Number(priceByn);
    const nextErrors: ServiceFormErrors = {
      title: !title.trim() ? "Введите название услуги" : undefined,
      durationMinutes: !Number.isFinite(duration) || duration <= 0 ? "Длительность должна быть больше 0" : undefined,
      priceByn: !Number.isFinite(price) || price < 0 ? "Цена не может быть отрицательной" : undefined,
    };

    if (nextErrors.title || nextErrors.durationMinutes || nextErrors.priceByn) {
      setErrors(nextErrors);
      return;
    }

    createService({
      title: title.trim(),
      description: description.trim(),
      durationMinutes: duration,
      priceByn: price,
      isActive,
    });

    setTitle("");
    setDescription("");
    setDurationMinutes("45");
    setPriceByn("45");
    setIsActive(true);
    setErrors({});
  };

  return (
    <AdminSection
      title="Услуги"
      subtitle="Управляй услугами, длительностью и ценами в рублях."
      action={<Badge variant="accent">{services.length}</Badge>}
    >
      <Card>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Field label="Название" error={errors.title}>
            <TextInput
              value={title}
              error={errors.title}
              placeholder="Например, Детская стрижка"
              onChange={(event) => {
                setTitle(event.target.value);
                setErrors((current) => ({ ...current, title: undefined }));
              }}
            />
          </Field>
          <Field label="Описание">
            <TextArea
              value={description}
              placeholder="Коротко, что входит в услугу"
              onChange={(event) => setDescription(event.target.value)}
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Минуты" error={errors.durationMinutes}>
              <TextInput
                type="number"
                min={1}
                value={durationMinutes}
                error={errors.durationMinutes}
                onChange={(event) => {
                  setDurationMinutes(event.target.value);
                  setErrors((current) => ({ ...current, durationMinutes: undefined }));
                }}
              />
            </Field>
            <Field label="р." error={errors.priceByn}>
              <TextInput
                type="number"
                min={0}
                value={priceByn}
                error={errors.priceByn}
                onChange={(event) => {
                  setPriceByn(event.target.value);
                  setErrors((current) => ({ ...current, priceByn: undefined }));
                }}
              />
            </Field>
          </div>
          <label className="flex min-h-12 items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-foreground">
            Активна
            <input
              type="checkbox"
              checked={isActive}
              onChange={(event) => setIsActive(event.target.checked)}
              className="size-5 accent-[#ff7a1a]"
            />
          </label>
          <Button type="submit" className="w-full">
            Создать услугу
          </Button>
        </form>
      </Card>

      <div className="space-y-3">
        {services.length === 0 ? (
          <AdminEmptyState title="Услуг пока нет" text="Создай услугу, чтобы назначить её мастеру." />
        ) : (
          services.map((service) => (
            <Card key={service.id} padding="sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-foreground">{service.title}</p>
                  <p className="mt-1 text-sm leading-5 text-muted">{service.description || "Без описания"}</p>
                  <p className="mt-3 text-sm text-muted">
                    {service.durationMinutes} мин · {service.priceByn} р.
                  </p>
                </div>
                <Badge variant={service.isActive ? "success" : "default"}>
                  {service.isActive ? "Активна" : "Скрыта"}
                </Badge>
              </div>
            </Card>
          ))
        )}
      </div>
    </AdminSection>
  );
}

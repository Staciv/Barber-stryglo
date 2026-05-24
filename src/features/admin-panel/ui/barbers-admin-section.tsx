"use client";

import { useState } from "react";
import { useAdminPanelStore } from "@/features/admin-panel/model/admin-panel-store";
import { Avatar } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { AdminEmptyState } from "./admin-empty-state";
import { AdminSection } from "./admin-section";
import { Field, TextArea, TextInput } from "./form-controls";

type BarberFormErrors = {
  name?: string;
};

export function BarbersAdminSection() {
  const barbers = useAdminPanelStore((state) => state.barbers);
  const createBarber = useAdminPanelStore((state) => state.createBarber);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [errors, setErrors] = useState<BarberFormErrors>({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      setErrors({ name: "Введите имя мастера" });
      return;
    }

    createBarber({
      name: name.trim(),
      bio: bio.trim() || undefined,
      avatarUrl: avatarUrl.trim() || undefined,
      isActive,
    });

    setName("");
    setBio("");
    setAvatarUrl("");
    setIsActive(true);
    setErrors({});
  };

  return (
    <AdminSection
      title="Мастера"
      subtitle="Добавляй мастеров и держи список активных исполнителей под контролем."
      action={<Badge variant="accent">{barbers.length}</Badge>}
    >
      <Card>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Field label="Имя мастера" error={errors.name}>
            <TextInput
              value={name}
              error={errors.name}
              placeholder="Например, Никита"
              onChange={(event) => {
                setName(event.target.value);
                setErrors({});
              }}
            />
          </Field>
          <Field label="Bio">
            <TextArea
              value={bio}
              placeholder="Короткое описание стиля мастера"
              onChange={(event) => setBio(event.target.value)}
            />
          </Field>
          <Field label="Avatar URL">
            <TextInput
              value={avatarUrl}
              placeholder="https://..."
              onChange={(event) => setAvatarUrl(event.target.value)}
            />
          </Field>
          <label className="flex min-h-12 items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-foreground">
            Активен
            <input
              type="checkbox"
              checked={isActive}
              onChange={(event) => setIsActive(event.target.checked)}
              className="size-5 accent-[#ff7a1a]"
            />
          </label>
          <Button type="submit" className="w-full">
            Создать мастера
          </Button>
        </form>
      </Card>

      <div className="space-y-3">
        {barbers.length === 0 ? (
          <AdminEmptyState title="Мастеров пока нет" text="Создай первого мастера для расписания и услуг." />
        ) : (
          barbers.map((barber) => (
            <Card key={barber.id} padding="sm">
              <div className="flex items-start gap-3">
                <Avatar src={barber.avatarUrl} fallback={barber.name} alt={barber.name} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate font-semibold text-foreground">{barber.name}</p>
                    <Badge variant={barber.isActive ? "success" : "default"}>
                      {barber.isActive ? "Активен" : "Неактивен"}
                    </Badge>
                  </div>
                  {barber.bio && <p className="mt-2 text-sm leading-5 text-muted">{barber.bio}</p>}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </AdminSection>
  );
}

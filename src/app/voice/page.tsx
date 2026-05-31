"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppointmentStore } from "@/entities/booking/appointment-store";
import { mockServices } from "@/entities/service/mock";
import { dateFromToday } from "@/shared/lib/date-utils";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";

export default function VoicePage() {
  const router = useRouter();
  const createAppointment = useAppointmentStore((state) => state.createAppointment);
  const [step, setStep] = useState<"idle" | "parsed" | "submitting">("idle");
  const service = mockServices.find((item) => item.id === "cut") ?? mockServices[0];

  const handleConfirm = () => {
    if (!service || step === "submitting") {
      return;
    }

    setStep("submitting");
    window.setTimeout(() => {
      createAppointment({
        serviceId: service.id,
        serviceName: service.name,
        barberId: "amir",
        barberName: "Амир",
        date: dateFromToday(1),
        startTime: "18:30",
        endTime: "19:15",
        clientName: "Voice mock клиент",
        clientPhone: "+375 29 123 45 67",
        comment: "Создано через mock voice booking",
        priceByn: service.priceByn,
        durationMinutes: service.durationMinutes,
        status: "confirmed",
        type: "salon",
      });
      router.push("/booking/confirm");
    }, 260);
  };

  return (
    <main className="min-h-screen bg-striglo-grid">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-safe-offset-4 pt-safe-offset-6">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2rem] border border-white/10 surface-panel p-5 shadow-card"
        >
          <Badge variant="accent">Voice MVP</Badge>
          <h1 className="mt-4 text-3xl font-black text-foreground">Голосовая запись</h1>
          <p className="mt-3 text-sm leading-6 text-muted">
            Скажи, когда хочешь записаться, а STRIGLO соберёт заявку. Сейчас это безопасный mock без real NLP.
          </p>
          <Button
            type="button"
            className="mt-5 w-full"
            size="lg"
            disabled={step !== "idle"}
            onClick={() => setStep("parsed")}
          >
            Начать mock voice booking
          </Button>
        </motion.section>

        {step !== "idle" && service && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 space-y-4"
          >
            <Card>
              <p className="text-sm text-muted">Распознано</p>
              <p className="mt-2 text-base font-semibold leading-6 text-foreground">
                “Запиши меня завтра на мужскую стрижку после 18:00 к Амиру”
              </p>
            </Card>

            <Card>
              <p className="text-sm text-muted">STRIGLO понял так</p>
              <div className="mt-3 grid gap-2 text-sm text-foreground">
                <p><span className="text-muted">Услуга:</span> {service.name}</p>
                <p><span className="text-muted">Дата:</span> Завтра</p>
                <p><span className="text-muted">Время:</span> 18:30</p>
                <p><span className="text-muted">Мастер:</span> Амир</p>
                <p><span className="text-muted">Цена:</span> {service.priceByn} р.</p>
              </div>
            </Card>

            <Button
              type="button"
              className="w-full"
              size="lg"
              loading={step === "submitting"}
              onClick={handleConfirm}
            >
              {step === "submitting" ? "Подтверждаем" : "Подтвердить запись"}
            </Button>
          </motion.div>
        )}
      </div>
    </main>
  );
}

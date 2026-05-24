"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { BookingsAdminSection } from "@/features/admin-panel/ui/bookings-admin-section";
import { BarbersAdminSection } from "@/features/admin-panel/ui/barbers-admin-section";
import { SchedulesAdminSection } from "@/features/admin-panel/ui/schedules-admin-section";
import { ServicesAdminSection } from "@/features/admin-panel/ui/services-admin-section";
import { AdminTabs, type AdminTab } from "@/features/admin-panel/ui/admin-tabs";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("barbers");

  return (
    <main className="min-h-screen bg-striglo-grid">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 pb-safe-offset-4 pt-safe-offset-6">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[2rem] border border-white/10 surface-panel p-5 shadow-card backdrop-blur-xl"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                STRIGLO admin
              </p>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground">
                Админка STRIGLO
              </h1>
            </div>
            <Badge variant="warning">Mock MVP</Badge>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
            Локальная панель для мастеров, услуг, назначений, графика и просмотра записей.
            Данные живут только в UI state, без Supabase CRUD.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:max-w-sm">
            <Button asChild variant="secondary">
              <Link href="/">Домой</Link>
            </Button>
            <Button asChild>
              <Link href="/booking">Проверить booking</Link>
            </Button>
          </div>
        </motion.header>

        <Card padding="sm" className="mt-5">
          <AdminTabs activeTab={activeTab} onChange={setActiveTab} />
        </Card>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
          className="mt-6"
        >
          {activeTab === "barbers" && <BarbersAdminSection />}
          {activeTab === "services" && <ServicesAdminSection />}
          {activeTab === "schedules" && <SchedulesAdminSection />}
          {activeTab === "bookings" && <BookingsAdminSection />}
        </motion.div>
      </div>
    </main>
  );
}

"use client";

import { motion } from "framer-motion";
import { PhoneOff, UserCheck, CalendarDays, type LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

function FeatureCard({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, delay, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl border border-white/10 surface-panel p-5 shadow-card"
    >
      <div className="flex size-11 items-center justify-center rounded-2xl bg-accent/10 text-accent">
        <Icon className="size-5" />
      </div>
      <p className="mt-4 text-base font-semibold text-foreground">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </motion.div>
  );
}

export function FeatureCards() {
  const features = [
    {
      icon: PhoneOff,
      title: "Без звонков",
      description: "Выбери услугу, мастера и время прямо на сайте.",
    },
    {
      icon: UserCheck,
      title: "Мастер подтвердит",
      description: "Мастер увидит заявку и подтвердит запись.",
    },
    {
      icon: CalendarDays,
      title: "Мои записи",
      description: "Все будущие визиты и GO-заявки будут в одном месте.",
    },
  ];

  return (
    <section className="mt-6 grid gap-3 md:grid-cols-3">
      {features.map((feature, index) => (
        <FeatureCard
          key={feature.title}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          delay={0.16 + index * 0.04}
        />
      ))}
    </section>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/shared/ui/badge";
import { GoRideButton } from "@/features/go-request/ui/go-ride-button";

export function HeroCard() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="relative mt-6 overflow-hidden rounded-[2rem] border border-white/10 surface-panel shadow-card"
    >
      {/* Background image for desktop */}
      <div className="absolute inset-0 md:block">
        <Image
          src="/hero-barbershop.jpg"
          alt=""
          fill
          className="object-cover object-center opacity-30 md:opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#11100E]/95 via-[#11100E]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#11100E]/90 via-transparent to-[#11100E]/60" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="p-5 md:p-8 md:max-w-[60%]">
          <Badge variant="accent">Запись без звонков</Badge>
          <h1 className="mt-5 text-3xl md:text-4xl font-black tracking-tight text-foreground text-balance">
            Запишись к барберу за минуту
          </h1>
          <p className="mt-4 text-sm md:text-base leading-6 text-muted text-pretty max-w-md">
            Выбери услугу, мастера и удобное время. Без звонков и долгих переписок.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/booking"
              className="inline-flex min-h-[56px] md:min-h-[64px] w-full md:w-auto items-center justify-center rounded-[20px] md:rounded-[24px] border border-accent/20 bg-gradient-to-b from-accent to-[#d45a10] px-8 text-base md:text-lg font-semibold text-white shadow-glow transition-all duration-200 hover:from-[#ff8a36] hover:to-accent active:scale-[0.98]"
            >
              Записаться
            </Link>
            <GoRideButton />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight, Clock3, MapPin, Scissors, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useAuthStore } from "@/features/auth/model/auth-store";
import { useHydratedStore } from "@/shared/lib/use-hydrated-store";

const previewSlots = ["14:00", "15:30", "17:00"];
const smoothEase = [0.22, 1, 0.36, 1] as const;

const revealItem = {
  hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

function Header() {
  const isAuthenticated = useHydratedStore(useAuthStore, (state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-20 flex items-center justify-between gap-3"
    >
      <div className="min-w-0">
        <p className="text-xs font-black uppercase tracking-[0.44em] text-[#E8192C]">STRIGLO</p>
      </div>

      <nav className="flex items-center gap-2" aria-label="Основная навигация">
        <Link
          href="/activity"
          className="inline-flex min-h-11 items-center rounded-2xl px-3 text-sm font-semibold text-white/68 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8192C]/80"
        >
          Мои записи
        </Link>
        {isAuthenticated ? (
          <button
            type="button"
            onClick={logout}
            className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all hover:border-white/18 hover:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8192C]/80 active:scale-[0.98]"
          >
            Выйти
          </button>
        ) : (
          <Link
            href="/login"
            className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all hover:border-white/18 hover:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8192C]/80 active:scale-[0.98]"
          >
            Войти
          </Link>
        )}
      </nav>
    </motion.header>
  );
}

type BarberProfileVisualProps = {
  glowY: MotionValue<number>;
  lineY: MotionValue<number>;
  visualY: MotionValue<number>;
};

function BarberProfileVisual({ glowY, lineY, visualY }: BarberProfileVisualProps) {
  return (
    <motion.div
      role="img"
      aria-label="Премиальный профиль барбера STRIGLO"
      style={{ y: visualY }}
      initial={{ opacity: 0, y: 22, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.16, duration: 0.48, ease: smoothEase }}
      className="pointer-events-none relative -mx-5 mt-5 h-[24rem] overflow-hidden bg-transparent shadow-[0_42px_120px_rgba(0,0,0,0.5)] md:absolute md:bottom-4 md:right-2 md:mt-0 md:h-[34rem] md:w-[34rem] md:max-w-[34rem]"
    >
      <motion.div
        style={{ y: glowY }}
        className="absolute -right-14 top-8 z-10 h-72 w-72 rounded-full bg-[#E8192C]/24 blur-3xl md:-right-20 md:h-96 md:w-96"
      />
      <Image
        src="/images/home/hero-barber.webp"
        alt=""
        fill
        priority
        unoptimized
        sizes="(min-width: 768px) 34rem, 100vw"
        className="-translate-x-[6%] scale-[1.25] object-cover object-[50%_30%] opacity-95 saturate-[0.94] contrast-[1.1] md:-translate-x-[5%] md:scale-[1.22]"
      />
      <motion.div
        style={{ y: glowY }}
        className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_54%_28%,rgba(255,255,255,0.07),transparent_24%),radial-gradient(circle_at_84%_34%,rgba(232,25,44,0.24),transparent_34%),linear-gradient(90deg,rgba(7,6,6,0.32)_0%,rgba(7,6,6,0.03)_42%,rgba(7,6,6,0.28)_100%),linear-gradient(180deg,rgba(10,8,8,0)_0%,rgba(4,4,4,0.18)_48%,rgba(3,3,3,0.96)_100%)]"
      />
      <motion.div
        style={{ y: lineY }}
        className="absolute left-16 top-16 z-20 h-28 w-px rotate-[-28deg] rounded-full bg-[#E8192C]/70 shadow-[0_0_34px_rgba(232,25,44,0.42)] md:left-20 md:top-24 md:h-36"
      />
      <motion.div
        style={{ y: lineY }}
        className="absolute right-14 top-16 z-20 h-28 w-px rotate-[24deg] rounded-full bg-white/10 shadow-[0_0_24px_rgba(255,255,255,0.1)] md:right-20 md:top-24 md:h-40"
      />
      <div className="absolute inset-x-12 bottom-9 z-20 h-px bg-gradient-to-r from-transparent via-[#E8192C]/48 to-transparent" />
    </motion.div>
  );
}

function PrimaryCta() {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.18, ease: smoothEase }}
      className="w-full sm:w-auto"
    >
      <Link
        href="/booking"
        className="group inline-flex min-h-16 w-full items-center justify-center gap-3 rounded-[1.4rem] bg-[#E8192C] px-6 text-base font-black text-white shadow-[0_20px_54px_rgba(232,25,44,0.34),inset_0_1px_0_rgba(255,255,255,0.22)] transition-all hover:bg-[#ff2639] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8192C]/85 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070606] active:scale-[0.985] sm:w-auto sm:min-w-[17rem]"
      >
        Записаться
        <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </Link>
    </motion.div>
  );
}

function SlotsPreview() {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 14 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { delay: 0.16, duration: 0.34, ease: smoothEase, staggerChildren: 0.055 },
        },
      }}
      className="mt-5 rounded-[1.7rem] border border-white/[0.1] bg-white/[0.045] p-3 shadow-[0_18px_52px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.05)]"
      aria-label="Ближайшие свободные слоты"
    >
      <div className="mb-3 flex items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2 text-sm font-bold text-white/72">
          <Clock3 className="size-4 text-[#E8192C]" aria-hidden="true" />
          Сегодня свободно
        </div>
        <span className="text-xs font-bold text-white/34">preview</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {previewSlots.map((slot) => (
          <motion.div
            key={slot}
            variants={revealItem}
            transition={{ duration: 0.28, ease: smoothEase }}
            className="flex min-h-14 items-center justify-center rounded-[1.15rem] border border-white/[0.1] bg-black/24 text-base font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
          >
            {slot}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function GoPremiumCard() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.24, duration: 0.36, ease: smoothEase }}
      className="mt-3"
    >
      <Link
        href="/go"
        className="group relative flex min-h-[7.5rem] overflow-hidden rounded-[1.85rem] border border-[#C9A96E]/38 bg-[linear-gradient(135deg,rgba(201,169,110,0.13),rgba(255,255,255,0.035)_42%,rgba(0,0,0,0.42))] p-4 shadow-[0_22px_64px_rgba(0,0,0,0.34),0_0_38px_rgba(201,169,110,0.08),inset_0_1px_0_rgba(255,255,255,0.06)] transition-all hover:border-[#C9A96E]/62 hover:bg-[linear-gradient(135deg,rgba(201,169,110,0.17),rgba(255,255,255,0.045)_42%,rgba(0,0,0,0.42))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]/75 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070606] active:scale-[0.99]"
      >
        <motion.span
          aria-hidden="true"
          animate={shouldReduceMotion ? { opacity: 0 } : { x: ["-45%", "155%"], opacity: [0, 0.34, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 1.8, ease: "easeInOut" }}
          className="absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-[#C9A96E]/28 to-transparent"
        />
        <div className="absolute -left-10 top-1/2 h-36 w-36 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,169,110,0.2),transparent_66%)]" />
        <div className="relative flex size-16 shrink-0 items-center justify-center rounded-[1.35rem] border border-[#C9A96E]/30 bg-black/34 text-[#C9A96E] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          <MapPin className="size-7" aria-hidden="true" />
        </div>
        <div className="relative ml-4 min-w-0 self-center">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#C9A96E]/78">STRIGLO GO</p>
          <h2 className="mt-1 text-xl font-black tracking-tight text-white">Выездная стрижка</h2>
          <p className="mt-1 max-w-sm text-sm leading-5 text-white/52">Барбер приедет в удобное место.</p>
        </div>
        <ArrowRight
          className="relative ml-auto mt-1 size-6 shrink-0 text-[#C9A96E] transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </Link>
    </motion.section>
  );
}

function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 34]);
  const glowY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -18]);
  const lineY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -28]);
  const visualY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -38]);

  return (
    <motion.section
      ref={heroRef}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36, ease: smoothEase }}
      className="relative mt-7 overflow-hidden rounded-[2.35rem] border border-white/[0.1] bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018)_42%,rgba(0,0,0,0.18))] p-5 pb-0 shadow-[0_30px_110px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] md:min-h-[43rem] md:p-8"
    >
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_22%_0%,rgba(232,25,44,0.24),transparent_31%),radial-gradient(circle_at_86%_12%,rgba(255,255,255,0.055),transparent_24%),linear-gradient(180deg,rgba(11,9,9,0),rgba(3,3,3,0.78))]"
      />
      <motion.div
        style={{ y: lineY }}
        className="absolute left-0 top-1/3 h-px w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
      />

      <motion.div
        className="relative z-10 md:max-w-[36rem]"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.075, delayChildren: 0.08 },
          },
        }}
      >
        <motion.span
          variants={revealItem}
          transition={{ duration: 0.32, ease: smoothEase }}
          className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[#E8192C]/25 bg-[#E8192C]/10 px-3.5 text-xs font-black text-[#ff4050] shadow-[0_0_28px_rgba(232,25,44,0.13)]"
        >
          <Scissors className="size-4" aria-hidden="true" />
          Барберинг без звонков
        </motion.span>
        <motion.h1
          variants={revealItem}
          transition={{ duration: 0.38, ease: smoothEase }}
          className="mt-5 max-w-[10ch] text-[3.4rem] font-black leading-[0.86] tracking-[-0.07em] text-white sm:text-7xl md:text-[6.7rem]"
        >
          Твой барбер уже рядом
        </motion.h1>
        <motion.p
          variants={revealItem}
          transition={{ duration: 0.34, ease: smoothEase }}
          className="mt-5 max-w-md text-base leading-7 text-white/62 md:text-lg"
        >
          Выбери время, услугу и мастера. STRIGLO соберёт запись быстро и без лишней переписки.
        </motion.p>

        <motion.div variants={revealItem} transition={{ duration: 0.32, ease: smoothEase }} className="mt-7">
          <PrimaryCta />
        </motion.div>
      </motion.div>

      <BarberProfileVisual glowY={glowY} lineY={lineY} visualY={visualY} />
    </motion.section>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_20%_0%,rgba(232,25,44,0.18),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(201,169,110,0.08),transparent_26%),linear-gradient(180deg,#11100E_0%,#060505_58%,#020202_100%)] text-white">
      <div className="mx-auto min-h-screen w-full max-w-6xl px-4 pb-safe-offset-6 pt-safe-offset-6 sm:px-6 lg:px-8">
        <Header />
        <HeroSection />

        <div className="mx-auto mt-7 max-w-3xl md:ml-8 md:mr-auto">
          <SlotsPreview />
          <GoPremiumCard />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="mt-5 flex items-center justify-center gap-2 pb-4 text-xs text-white/34"
        >
          <Sparkles className="size-4 text-[#E8192C]/80" aria-hidden="true" />
          <span>Свободное время видно сразу</span>
        </motion.div>
      </div>
    </main>
  );
}

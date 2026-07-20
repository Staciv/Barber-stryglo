"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
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
  const imageY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 34]);

  return (
    <motion.section
      ref={heroRef}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36, ease: smoothEase }}
      className="relative mt-6 min-h-[calc(100svh-7.25rem)] overflow-hidden rounded-[2.35rem] border border-white/[0.1] bg-[#060505] shadow-[0_30px_110px_rgba(0,0,0,0.56),inset_0_1px_0_rgba(255,255,255,0.06)] md:min-h-[min(820px,82vh)]"
    >
      <motion.div
        role="img"
        aria-label="Премиальный профиль барбера STRIGLO"
        style={{ y: imageY }}
        className="absolute inset-0"
      >
        <Image
          src="/images/home/hero-barber.webp"
          alt=""
          fill
          priority
          unoptimized
          sizes="(min-width: 768px) 70rem, 100vw"
          className="scale-[1.1] object-cover object-[45%_29%] opacity-96 saturate-[0.94] contrast-[1.1] md:scale-[1.04] md:object-[50%_31%]"
        />
      </motion.div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_16%,rgba(232,25,44,0.18),transparent_29%),radial-gradient(circle_at_20%_2%,rgba(255,255,255,0.08),transparent_20%),linear-gradient(180deg,rgba(3,3,3,0.42)_0%,rgba(3,3,3,0.08)_28%,rgba(3,3,3,0.18)_50%,rgba(3,3,3,0.94)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,3,3,0.5)_0%,rgba(3,3,3,0.12)_42%,rgba(3,3,3,0.34)_100%)]" />

      <motion.div
        className="absolute inset-x-5 bottom-16 z-10 max-w-[28rem] md:bottom-20 md:left-8 md:right-auto md:max-w-[36rem]"
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
          className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[#E8192C]/28 bg-black/28 px-3.5 text-xs font-black text-[#ff4050] shadow-[0_0_28px_rgba(232,25,44,0.13)] backdrop-blur-sm"
        >
          <Scissors className="size-4" aria-hidden="true" />
          Запись к барберу
        </motion.span>
        <motion.h1
          variants={revealItem}
          transition={{ duration: 0.38, ease: smoothEase }}
          className="mt-4 max-w-[9ch] text-[3.45rem] font-black leading-[0.9] tracking-[-0.07em] text-white drop-shadow-[0_12px_30px_rgba(0,0,0,0.64)] sm:text-7xl md:text-[6.4rem]"
        >
          Без звонков. Без лишнего.
        </motion.h1>
        <motion.p
          variants={revealItem}
          transition={{ duration: 0.34, ease: smoothEase }}
          className="mt-4 max-w-sm text-base leading-7 text-white/68 drop-shadow-[0_8px_18px_rgba(0,0,0,0.68)] md:text-lg"
        >
          Выбери время, мастер подтвердит запись, а мы напомним.
        </motion.p>

        <motion.div variants={revealItem} transition={{ duration: 0.32, ease: smoothEase }} className="mt-6">
          <PrimaryCta />
        </motion.div>
      </motion.div>

    </motion.section>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_20%_0%,rgba(232,25,44,0.18),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(201,169,110,0.08),transparent_26%),linear-gradient(180deg,#11100E_0%,#060505_58%,#020202_100%)] text-white">
      <div className="mx-auto min-h-screen w-full max-w-6xl px-4 pb-safe-offset-6 pt-safe-offset-6 sm:px-6 lg:px-8">
        <Header />
        <HeroSection />

        <div className="mx-auto mt-6 max-w-3xl md:mt-8">
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

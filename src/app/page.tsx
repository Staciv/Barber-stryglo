"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock3, MapPin, Scissors, Sparkles } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/features/auth/model/auth-store";
import { useHydratedStore } from "@/shared/lib/use-hydrated-store";

const previewSlots = ["14:00", "15:30", "17:00"];

function Header() {
  const user = useHydratedStore(useAuthStore, (state) => state.user);
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
        <p className="mt-1 truncate text-sm text-white/52">{isAuthenticated && user ? user.phone : "Гость"}</p>
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

function BarberProfileVisual() {
  return (
    <div
      role="img"
      aria-label="Премиальный профиль барбера STRIGLO"
      className="pointer-events-none relative mx-auto mt-7 h-[18.75rem] w-full max-w-[23rem] overflow-hidden rounded-[2.25rem] border border-white/[0.08] bg-[radial-gradient(circle_at_48%_24%,rgba(232,25,44,0.3),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.015))] shadow-[0_34px_100px_rgba(0,0,0,0.58),inset_0_1px_0_rgba(255,255,255,0.06)] md:absolute md:bottom-8 md:right-8 md:mt-0 md:h-[28rem] md:max-w-[28rem]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_74%,rgba(0,0,0,0),rgba(0,0,0,0.84)_72%),linear-gradient(180deg,rgba(6,5,5,0.12),rgba(6,5,5,0.9))]" />
      <div className="absolute left-1/2 top-10 h-20 w-44 -translate-x-1/2 rounded-[70%_70%_44%_44%] bg-[linear-gradient(135deg,#0d0b0b,#2b2524_48%,#060505)] shadow-[0_8px_18px_rgba(0,0,0,0.52),inset_0_8px_14px_rgba(255,255,255,0.05)] md:top-14 md:h-28 md:w-60" />
      <div className="absolute left-1/2 top-[5.7rem] h-32 w-28 -translate-x-1/2 rounded-[45%_45%_48%_48%] bg-[linear-gradient(145deg,#7c4d38,#c48a64_44%,#4b2f25)] shadow-[0_18px_42px_rgba(0,0,0,0.5),inset_-9px_4px_16px_rgba(0,0,0,0.22),inset_10px_0_14px_rgba(255,255,255,0.08)] md:top-[7.5rem] md:h-44 md:w-40" />
      <div className="absolute left-1/2 top-[6.2rem] h-10 w-36 -translate-x-1/2 rounded-[55%_55%_35%_35%] bg-[linear-gradient(180deg,#151111,#030303)] shadow-[0_8px_12px_rgba(0,0,0,0.5)] md:top-[8rem] md:h-14 md:w-52" />
      <div className="absolute left-[calc(50%-2.25rem)] top-[9.8rem] h-3 w-6 rounded-full bg-black/72 shadow-[0_0_0_4px_rgba(0,0,0,0.12)] md:left-[calc(50%-3.1rem)] md:top-[12.8rem] md:h-4 md:w-8" />
      <div className="absolute right-[calc(50%-2.25rem)] top-[9.8rem] h-3 w-6 rounded-full bg-black/72 shadow-[0_0_0_4px_rgba(0,0,0,0.12)] md:right-[calc(50%-3.1rem)] md:top-[12.8rem] md:h-4 md:w-8" />
      <div className="absolute left-1/2 top-[12.5rem] h-14 w-36 -translate-x-1/2 rounded-t-[2rem] bg-[linear-gradient(180deg,#111,#020202)] shadow-[0_18px_32px_rgba(0,0,0,0.62),inset_0_1px_0_rgba(255,255,255,0.07)] md:top-[17.2rem] md:h-24 md:w-56" />
      <div className="absolute bottom-5 left-1/2 h-12 w-[82%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,25,44,0.28),transparent_62%)] blur-xl" />
      <div className="absolute left-7 top-12 h-24 w-1 rotate-[-28deg] rounded-full bg-[#E8192C]/70 shadow-[0_0_34px_rgba(232,25,44,0.42)] md:left-10 md:top-20 md:h-32" />
      <div className="absolute right-8 top-16 h-28 w-1 rotate-[24deg] rounded-full bg-white/14 shadow-[0_0_24px_rgba(255,255,255,0.1)] md:right-12 md:top-24 md:h-36" />
      <div className="absolute inset-x-8 bottom-6 h-px bg-gradient-to-r from-transparent via-[#E8192C]/60 to-transparent" />
    </div>
  );
}

function PrimaryCta() {
  return (
    <Link
      href="/booking"
      className="group inline-flex min-h-16 w-full items-center justify-center gap-3 rounded-[1.4rem] bg-[#E8192C] px-6 text-base font-black text-white shadow-[0_20px_54px_rgba(232,25,44,0.34),inset_0_1px_0_rgba(255,255,255,0.22)] transition-all hover:bg-[#ff2639] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8192C]/85 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070606] active:scale-[0.985] sm:w-auto sm:min-w-[17rem]"
    >
      Записаться
      <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
    </Link>
  );
}

function SlotsPreview() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
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
          <div
            key={slot}
            className="flex min-h-14 items-center justify-center rounded-[1.15rem] border border-white/[0.1] bg-black/24 text-base font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
          >
            {slot}
          </div>
        ))}
      </div>
    </motion.section>
  );
}

function GoPremiumCard() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.16, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="mt-3"
    >
      <Link
        href="/go"
        className="group relative flex min-h-[7.5rem] overflow-hidden rounded-[1.85rem] border border-[#C9A96E]/38 bg-[linear-gradient(135deg,rgba(201,169,110,0.13),rgba(255,255,255,0.035)_42%,rgba(0,0,0,0.42))] p-4 shadow-[0_22px_64px_rgba(0,0,0,0.34),0_0_38px_rgba(201,169,110,0.08),inset_0_1px_0_rgba(255,255,255,0.06)] transition-all hover:border-[#C9A96E]/62 hover:bg-[linear-gradient(135deg,rgba(201,169,110,0.17),rgba(255,255,255,0.045)_42%,rgba(0,0,0,0.42))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]/75 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070606] active:scale-[0.99]"
      >
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
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
      className="relative mt-7 overflow-hidden rounded-[2.35rem] border border-white/[0.1] bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018)_42%,rgba(0,0,0,0.18))] p-5 shadow-[0_30px_110px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] md:min-h-[42rem] md:p-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_0%,rgba(232,25,44,0.24),transparent_31%),radial-gradient(circle_at_86%_12%,rgba(255,255,255,0.055),transparent_24%),linear-gradient(180deg,rgba(11,9,9,0),rgba(3,3,3,0.78))]" />
      <div className="absolute left-0 top-1/3 h-px w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      <div className="relative z-10 md:max-w-[36rem]">
        <span className="inline-flex min-h-9 items-center gap-2 rounded-full border border-[#E8192C]/25 bg-[#E8192C]/10 px-3.5 text-xs font-black text-[#ff4050] shadow-[0_0_28px_rgba(232,25,44,0.13)]">
          <Scissors className="size-4" aria-hidden="true" />
          Барберинг без звонков
        </span>
        <h1 className="mt-5 max-w-[10ch] text-[3.4rem] font-black leading-[0.86] tracking-[-0.07em] text-white sm:text-7xl md:text-[6.7rem]">
          Твой барбер уже рядом
        </h1>
        <p className="mt-5 max-w-md text-base leading-7 text-white/62 md:text-lg">
          Выбери время, услугу и мастера. STRIGLO соберёт запись быстро и без лишней переписки.
        </p>

        <div className="mt-7">
          <PrimaryCta />
        </div>
      </div>

      <BarberProfileVisual />
    </motion.section>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_20%_0%,rgba(232,25,44,0.18),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(201,169,110,0.08),transparent_26%),linear-gradient(180deg,#11100E_0%,#060505_58%,#020202_100%)] text-white">
      <div className="mx-auto min-h-screen w-full max-w-6xl px-4 pb-safe-offset-6 pt-safe-offset-6 sm:px-6 lg:px-8">
        <Header />
        <HeroSection />

        <div className="mx-auto max-w-3xl md:-mt-24 md:ml-8 md:mr-auto">
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

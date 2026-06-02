"use client";

import { motion } from "framer-motion";
import {
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  PhoneOff,
  Repeat2,
  ShieldCheck,
  Sparkles,
  Timer,
} from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/features/auth/model/auth-store";
import { useHydratedStore } from "@/shared/lib/use-hydrated-store";
import { GoRideButton } from "@/features/go-request/ui/go-ride-button";
import { cn } from "@/shared/lib/utils";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  delay?: number;
};

type TrustItemProps = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

function Header() {
  const user = useHydratedStore(useAuthStore, (state) => state.user);
  const isAuthenticated = useHydratedStore(useAuthStore, (state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center justify-between gap-3"
    >
      <div className="min-w-0">
        <p className="text-xs font-black uppercase tracking-[0.42em] text-accent">STRIGLO</p>
        <p className="mt-1 truncate text-sm text-white/55">{isAuthenticated && user ? user.phone : "Гость"}</p>
      </div>

      <nav className="flex items-center gap-2" aria-label="Основная навигация">
        <Link
          href="/activity"
          className="inline-flex min-h-11 items-center rounded-2xl px-3 text-sm font-semibold text-white/78 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80"
        >
          Мои записи
        </Link>
        {isAuthenticated ? (
          <button
            type="button"
            onClick={logout}
            className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all hover:border-white/18 hover:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80 active:scale-[0.98]"
          >
            Выйти
          </button>
        ) : (
          <Link
            href="/login"
            className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all hover:border-white/18 hover:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80 active:scale-[0.98]"
          >
            Войти
          </Link>
        )}
      </nav>
    </motion.header>
  );
}

function PrimaryButton({ className }: { className?: string }) {
  return (
    <Link
      href="/booking"
      className={cn(
        "inline-flex min-h-[7rem] w-full items-center justify-center rounded-[2.2rem] bg-[linear-gradient(135deg,#ff8a34_0%,#f26e1e_48%,#c94f12_100%)] px-4 text-center text-base font-black text-white shadow-[0_18px_42px_rgba(242,110,30,0.28),inset_0_1px_0_rgba(255,255,255,0.18)] transition-all duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/90 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.985]",
        className,
      )}
    >
      Записаться
    </Link>
  );
}

function CinematicChairVisual() {
  return (
    <div
      aria-label="Атмосфера премиального барбершопа"
      role="img"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] overflow-hidden md:inset-y-0 md:left-auto md:right-0 md:h-auto md:w-[48%]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_45%,rgba(255,122,24,0.24),transparent_32%),linear-gradient(90deg,rgba(5,5,5,0.85),rgba(5,5,5,0.18)_42%,rgba(5,5,5,0.78))] md:bg-[radial-gradient(circle_at_58%_42%,rgba(255,122,24,0.25),transparent_32%),linear-gradient(90deg,rgba(10,9,8,0),rgba(10,9,8,0.75))]" />
      <div className="absolute bottom-0 left-1/2 h-[74%] w-[82%] -translate-x-1/2 rounded-t-[45%] bg-[linear-gradient(145deg,rgba(46,42,37,0.2),rgba(8,8,8,0.94)_42%,rgba(0,0,0,1))] shadow-[inset_-18px_12px_36px_rgba(255,122,24,0.1),0_24px_70px_rgba(0,0,0,0.78)] md:left-[58%] md:w-[70%]" />
      <div className="absolute bottom-[14%] left-1/2 h-[26%] w-[70%] -translate-x-1/2 rounded-[999px_999px_36px_36px] bg-[linear-gradient(180deg,rgba(55,51,45,0.26),rgba(3,3,3,0.92))] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_50px_rgba(0,0,0,0.85)] md:left-[58%] md:w-[62%]" />
      <div className="absolute bottom-[9%] left-[22%] h-[12%] w-[20%] rounded-full bg-black/80 shadow-[0_0_34px_rgba(255,122,24,0.16)] md:left-[34%]" />
      <div className="absolute bottom-[9%] right-[22%] h-[12%] w-[20%] rounded-full bg-black/80 shadow-[0_0_34px_rgba(255,122,24,0.16)] md:right-[9%]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.12),rgba(5,5,5,0.72)_78%,rgba(5,5,5,0.96))]" />
    </div>
  );
}

function HeroCard() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      className="relative mt-7 overflow-hidden rounded-[2.15rem] border border-white/[0.12] bg-[#0b0a08] px-5 pb-[13.5rem] pt-5 shadow-[0_24px_90px_rgba(0,0,0,0.45),0_0_52px_rgba(242,110,30,0.16),inset_0_1px_0_rgba(255,255,255,0.06)] md:min-h-[31rem] md:px-8 md:py-8"
    >
      <CinematicChairVisual />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,122,24,0.18),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.045),transparent_42%)]" />
      <div className="relative z-10 max-w-xl">
        <span className="inline-flex min-h-9 items-center rounded-full border border-accent/24 bg-accent/12 px-3.5 text-xs font-bold text-accent shadow-[0_0_22px_rgba(242,110,30,0.12)]">
          Запись без звонков
        </span>
        <h1 className="mt-5 max-w-[13ch] text-[2.7rem] font-black leading-[0.94] tracking-[-0.045em] text-white sm:text-6xl md:max-w-[12ch] md:text-7xl">
          Запишись к барберу за минуту
        </h1>
        <p className="mt-5 max-w-md text-base leading-7 text-white/68 md:text-lg">
          Выбери услугу, мастера и удобное время. Без звонков и долгих переписок.
        </p>
      </div>
    </motion.section>
  );
}

function ActionRow() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08, duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="mt-4 space-y-3"
      aria-label="Основные действия"
    >
      <PrimaryButton className="min-h-16 rounded-[1.55rem] text-lg md:min-h-[4.5rem]" />
      <div className="space-y-2">
        <p className="px-1 text-xs font-bold uppercase tracking-[0.18em] text-white/36">Дополнительный сервис</p>
        <div className="[&>button]:min-h-[6.1rem] [&>button]:rounded-[1.9rem]">
          <GoRideButton />
        </div>
      </div>
    </motion.section>
  );
}

function FeatureCard({ title, description, icon: Icon, delay = 0 }: FeatureCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl border border-white/[0.12] bg-white/[0.045] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.04)] transition-all hover:border-white/[0.18] hover:bg-white/[0.06]"
    >
      <div className="flex size-12 items-center justify-center rounded-2xl border border-accent/22 bg-accent/13 text-accent shadow-[0_0_24px_rgba(242,110,30,0.12)]">
        <Icon className="size-5" aria-hidden="true" />
      </div>
      <h2 className="mt-4 text-lg font-black text-white">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-white/58">{description}</p>
    </motion.article>
  );
}

function RepeatBookingCard() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="mt-4 rounded-[2rem] border border-white/[0.12] bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-5 shadow-[0_18px_54px_rgba(0,0,0,0.26),inset_0_1px_0_rgba(255,255,255,0.05)] md:flex md:items-center md:justify-between md:gap-6"
    >
      <div className="min-w-0">
        <span className="inline-flex min-h-8 items-center rounded-full border border-white/10 bg-white/[0.05] px-3 text-xs font-bold text-white/58">
          Для постоянных клиентов
        </span>
        <h2 className="mt-4 text-2xl font-black tracking-tight text-white">Повторить прошлую запись</h2>
        <p className="mt-2 max-w-md text-sm leading-6 text-white/58">
          Если уже был у мастера — запишись снова в пару касаний.
        </p>
      </div>

      <div className="mt-5 rounded-3xl border border-white/[0.1] bg-black/22 p-4 md:mt-0 md:w-[22rem]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-base font-black text-white">Мужская стрижка</p>
            <p className="mt-1 text-sm text-white/55">Амир · 12 мая · 11:00</p>
          </div>
          <Repeat2 className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
        </div>
        <Link
          href="/booking"
          className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07] px-4 text-sm font-black text-white transition-all hover:border-accent/40 hover:bg-accent/14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80 active:scale-[0.99]"
        >
          Повторить
        </Link>
      </div>
    </motion.section>
  );
}

function TrustItem({ label, icon: Icon }: TrustItemProps) {
  return (
    <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.035] px-3 text-xs font-bold text-white/58">
      <Icon className="size-4 text-accent" aria-hidden="true" />
      {label}
    </span>
  );
}

function TrustStrip() {
  return (
    <section className="mt-5 flex flex-wrap justify-center gap-2 pb-safe-offset-4" aria-label="Преимущества STRIGLO">
      <TrustItem icon={Timer} label="Быстро и удобно" />
      <TrustItem icon={CheckCircle2} label="Без лишних форм" />
      <TrustItem icon={CalendarCheck} label="Только свободное время" />
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-striglo-grid">
      <div className="mx-auto min-h-screen w-full max-w-6xl px-4 pt-safe-offset-6 sm:px-6 lg:px-8">
        <Header />
        <HeroCard />
        <ActionRow />

        <section className="mt-5 grid gap-3 md:grid-cols-3" aria-label="Почему STRIGLO удобен">
          <FeatureCard
            icon={PhoneOff}
            title="Без звонков"
            description="Выбери услугу, мастера и время прямо на сайте."
            delay={0}
          />
          <FeatureCard
            icon={ShieldCheck}
            title="Мастер подтвердит"
            description="Мастер увидит заявку и подтвердит запись."
            delay={0.04}
          />
          <FeatureCard
            icon={ClipboardList}
            title="Мои записи"
            description="Все будущие визиты и GO-заявки будут в одном месте."
            delay={0.08}
          />
        </section>

        <RepeatBookingCard />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18, duration: 0.3 }}
          className="mt-5 flex items-center justify-center gap-2 text-xs text-white/38"
        >
          <Sparkles className="size-4 text-accent/80" aria-hidden="true" />
          <span>STRIGLO создан для простой записи без лишнего шума</span>
        </motion.div>

        <TrustStrip />
      </div>
    </main>
  );
}

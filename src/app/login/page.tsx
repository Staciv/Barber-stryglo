"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { phoneSchema, otpSchema } from "@/features/auth/lib/auth-validation";
import { useAuthStore } from "@/features/auth/model/auth-store";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { InlineError } from "@/shared/ui/inline-error";
import { cn } from "@/shared/lib/utils";

type LoginStep = "phone" | "otp";

export default function LoginPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const pendingPhone = useAuthStore((state) => state.pendingPhone);
  const loginWithPhone = useAuthStore((state) => state.loginWithPhone);
  const verifyOtp = useAuthStore((state) => state.verifyOtp);

  const [step, setStep] = useState<LoginStep>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  const handlePhoneSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = phoneSchema.safeParse(phone);

    if (!result.success) {
      setError(result.error.errors[0]?.message ?? "Проверь номер телефона");
      return;
    }

    loginWithPhone(result.data);
    setError("");
    setStep("otp");
  };

  const handleOtpSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = otpSchema.safeParse(otp);

    if (!result.success) {
      setError(result.error.errors[0]?.message ?? "Проверь код");
      return;
    }

    setIsSubmitting(true);
    const verification = verifyOtp(result.data);

    if (!verification.success) {
      setIsSubmitting(false);
      setError(verification.error ?? "Неверный код");
      return;
    }

    setError("");
    window.setTimeout(() => router.replace("/"), 240);
  };

  return (
    <main className="min-h-screen bg-striglo-grid">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pt-safe-offset-6">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[2rem] border border-white/10 surface-panel p-5 shadow-card backdrop-blur-xl"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                STRIGLO login
              </p>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground">
                Вход по телефону
              </h1>
            </div>
            <Badge variant="accent">MVP</Badge>
          </div>
          <p className="mt-4 text-sm leading-6 text-muted">
            Без email и паролей. Сейчас это mock flow: тестовый код — 1111.
          </p>
        </motion.section>

        <Card variant="elevated" className="mt-5">
          <div className="mb-5 flex items-center gap-2">
            <span
              className={cn(
                "h-1.5 flex-1 rounded-full",
                step === "phone" ? "bg-accent" : "bg-accent/40",
              )}
            />
            <span
              className={cn(
                "h-1.5 flex-1 rounded-full",
                step === "otp" ? "bg-accent" : "bg-white/10",
              )}
            />
          </div>

          {step === "phone" ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <label className="block space-y-2" htmlFor="login-phone">
                <span className="text-sm font-medium text-foreground">Телефон</span>
                <input
                  id="login-phone"
                  inputMode="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                    setError("");
                  }}
                  placeholder="+375 29 123 45 67"
                  className={cn(
                    "min-h-14 w-full rounded-2xl border bg-white/[0.04] px-4 text-base text-foreground outline-none transition-all placeholder:text-white/35 focus:border-accent focus:ring-2 focus:ring-accent/30",
                    error ? "border-danger/60" : "border-white/10",
                  )}
                />
              </label>

              <InlineError>{error}</InlineError>

              <Button type="submit" className="w-full" size="lg">
                Получить код
              </Button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-sm text-muted">Код отправлен на</p>
                <p className="mt-1 text-base font-semibold text-foreground">
                  {pendingPhone ?? phone}
                </p>
              </div>

              <label className="block space-y-2" htmlFor="login-otp">
                <span className="text-sm font-medium text-foreground">SMS-код</span>
                <input
                  id="login-otp"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={4}
                  value={otp}
                  onChange={(event) => {
                    setOtp(event.target.value.replace(/\D/g, "").slice(0, 4));
                    setError("");
                  }}
                  placeholder="1111"
                  className={cn(
                    "min-h-16 w-full rounded-2xl border bg-white/[0.04] px-4 text-center text-2xl font-black tracking-[0.4em] text-foreground outline-none transition-all placeholder:text-white/25 focus:border-accent focus:ring-2 focus:ring-accent/30",
                    error ? "border-danger/60" : "border-white/10",
                  )}
                />
              </label>

              <InlineError>{error}</InlineError>

              <div className="grid grid-cols-[0.8fr_1.2fr] gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setStep("phone");
                    setOtp("");
                    setError("");
                  }}
                >
                  Назад
                </Button>
                <Button type="submit" loading={isSubmitting}>
                  {isSubmitting ? "Проверяем" : "Войти"}
                </Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </main>
  );
}

"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/shared/lib/utils";

export function GoRideButton() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const [isDriving, setIsDriving] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleClick = () => {
    if (isDriving) {
      return;
    }

    if (shouldReduceMotion) {
      router.push("/go");
      return;
    }

    setIsDriving(true);
    timeoutRef.current = window.setTimeout(() => router.push("/go"), 640);
  };

  return (
    <button
      type="button"
      aria-label="STRIGLO GO, выездная стрижка"
      aria-busy={isDriving || undefined}
      disabled={isDriving}
      onClick={handleClick}
      className={cn(
        "group relative min-h-[7rem] overflow-hidden rounded-[2.2rem] border border-[#b75a2a]/70 bg-[#030405] text-left shadow-[inset_0_0_28px_rgba(255,255,255,0.025),0_0_16px_rgba(255,122,26,0.12)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "hover:border-accent/75 hover:shadow-[inset_0_0_32px_rgba(255,255,255,0.035),0_0_22px_rgba(255,122,26,0.18)] active:scale-[0.99] disabled:pointer-events-none",
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_1%_12%,rgba(255,122,26,0.12),transparent_2%),linear-gradient(90deg,rgba(255,122,26,0.035),rgba(255,255,255,0.018),rgba(255,122,26,0.028))]"
      />
      <span aria-hidden="true" className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      <span aria-hidden="true" className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent" />

      <motion.img
        src="/striglo-go-button.png"
        alt=""
        aria-hidden="true"
        initial={false}
        animate={isDriving ? { x: 390, y: "-50%", scale: 0.98 } : { x: 0, y: "-50%", scale: 1 }}
        transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
        style={{
          WebkitMaskImage: "linear-gradient(to right, black 0%, black 72%, transparent 100%)",
          maskImage: "linear-gradient(to right, black 0%, black 72%, transparent 100%)",
        }}
        className="absolute -left-14 top-1/2 h-[18rem] w-[18rem] object-contain object-left-center opacity-95"
      />

      <AnimatePresence initial={false}>
        {!isDriving && (
          <motion.span
            key="go-copy"
            initial={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 18, filter: "blur(4px)" }}
            transition={{ duration: 0.18 }}
            className="relative z-10 ml-[48%] flex min-h-[7rem] items-center justify-between gap-3 pr-5"
          >
            <span className="text-[1.16rem] font-medium leading-none tracking-normal text-white/72">
              Выездная стрижка
            </span>
            <span
              aria-hidden="true"
              className="relative size-8 shrink-0 rounded-full text-accent drop-shadow-[0_0_12px_rgba(255,122,26,0.42)]"
            >
              <span className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 rotate-45 border-r-[3px] border-t-[3px] border-accent" />
            </span>
          </motion.span>
        )}
      </AnimatePresence>

      {isDriving && (
        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.24 }}
          className="absolute bottom-4 left-12 right-12 h-px origin-left bg-gradient-to-r from-transparent via-accent to-transparent"
        />
      )}
    </button>
  );
}

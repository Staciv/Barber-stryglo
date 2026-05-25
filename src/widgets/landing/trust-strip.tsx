"use client";

import { motion } from "framer-motion";
import { Zap, FormInput, Clock } from "lucide-react";

export function TrustStrip() {
  const items = [
    { icon: Zap, text: "Быстро и удобно" },
    { icon: FormInput, text: "Без лишних форм" },
    { icon: Clock, text: "Только свободное время" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.36 }}
      className="mt-8 pb-4"
    >
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
        {items.map(({ icon: Icon, text }) => (
          <div
            key={text}
            className="flex items-center gap-2 text-xs text-muted/70"
          >
            <Icon className="size-3.5 text-accent/60" />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </motion.footer>
  );
}

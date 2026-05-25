"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function StrigloGoCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="mt-4"
    >
      <Link
        href="/go"
        className="group relative flex min-h-[100px] items-center overflow-hidden rounded-[1.75rem] border border-[#b75a2a]/50 bg-[#0a0908] shadow-[inset_0_0_28px_rgba(255,255,255,0.02),0_0_20px_rgba(255,122,26,0.1)] transition-all duration-300 hover:border-accent/60 hover:shadow-[inset_0_0_32px_rgba(255,255,255,0.03),0_0_28px_rgba(255,122,26,0.16)] active:scale-[0.99]"
      >
        {/* Orange glow background */}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_0%_50%,rgba(255,122,26,0.12),transparent_50%)]"
        />
        
        {/* Top and bottom accent lines */}
        <span
          aria-hidden="true"
          className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
        />
        <span
          aria-hidden="true"
          className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
        />

        {/* Character image */}
        <div className="relative h-[100px] w-[120px] shrink-0">
          <Image
            src="/striglo-go-character.jpg"
            alt=""
            fill
            className="object-cover object-center rounded-l-[1.75rem]"
            style={{
              WebkitMaskImage: "linear-gradient(to right, black 0%, black 70%, transparent 100%)",
              maskImage: "linear-gradient(to right, black 0%, black 70%, transparent 100%)",
            }}
          />
        </div>

        {/* Text content */}
        <div className="flex flex-1 items-center justify-between gap-3 px-4 py-4">
          <div>
            <p className="text-base font-semibold text-white">Выездная стрижка</p>
            <p className="mt-1 text-sm text-muted">
              Барбер приедет к тебе в удобное место
            </p>
          </div>
          
          {/* Arrow */}
          <div className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent transition-all duration-200 group-hover:bg-accent/20">
            <ArrowRight className="size-5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

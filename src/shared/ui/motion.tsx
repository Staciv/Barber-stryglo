"use client";

import { motion } from "framer-motion";
import type { ComponentProps, ReactNode } from "react";
import { Card, type CardProps } from "@/shared/ui/card";
import { cn } from "@/shared/lib/utils";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "header" | "main";
};

const motionTags = {
  div: motion.div,
  section: motion.section,
  header: motion.header,
  main: motion.main,
};

export function FadeIn({ children, className, delay = 0, as = "div" }: FadeInProps) {
  const Comp = motionTags[as];

  return (
    <Comp
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Comp>
  );
}

type MotionCardProps = CardProps & {
  delay?: number;
};

export function MotionCard({ delay = 0, className, ...props }: MotionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className={className} {...props} />
    </motion.div>
  );
}

type PressableMotionProps = ComponentProps<typeof motion.button>;

export function PressableMotion({ className, ...props }: PressableMotionProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.975 }}
      className={cn("transition-all duration-200", className)}
      {...props}
    />
  );
}

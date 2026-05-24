"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

type BottomSheetProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export function BottomSheet({ open, onClose, title, children, className }: BottomSheetProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close sheet overlay"
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title ?? "Bottom sheet"}
            initial={{ y: "100%", opacity: 0.92 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0.92 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-md rounded-t-[2rem] border border-white/10 surface-panel-elevated px-4 pb-safe-offset-4 pt-4 shadow-card",
              className,
            )}
          >
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-white/10" />
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                {title && <h2 className="text-lg font-semibold text-foreground">{title}</h2>}
              </div>
              <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close bottom sheet">
                Close
              </Button>
            </div>
            <div>{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

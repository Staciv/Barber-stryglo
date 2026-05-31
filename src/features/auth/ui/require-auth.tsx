"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { MockUserRole } from "@/features/auth/model/auth-store";

type RequireAuthProps = {
  children: React.ReactNode;
  allowedRoles?: MockUserRole[];
  warningMessage?: string | null;
};

export function RequireAuth({ children, warningMessage = null }: RequireAuthProps) {
  const router = useRouter();
  const isDevelopment = process.env.NODE_ENV === "development";

  useEffect(() => {
    if (!isDevelopment) {
      router.replace("/");
    }
  }, [isDevelopment, router]);

  if (!isDevelopment) {
    return null;
  }

  return (
    <>
      {warningMessage && (
        <div className="mx-auto w-full max-w-5xl px-4 pt-safe-offset-4">
          <div className="rounded-2xl border border-warning/30 bg-warning/10 px-4 py-3 text-sm font-semibold text-warning">
            {warningMessage}
          </div>
        </div>
      )}
      {children}
    </>
  );
}

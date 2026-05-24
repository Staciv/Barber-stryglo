import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/shared/lib/utils";
import { InlineError } from "@/shared/ui/inline-error";

type FieldProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
};

export function Field({ label, error, children }: FieldProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {children}
      <InlineError>{error}</InlineError>
    </label>
  );
}

export function fieldClassName(error?: string, className?: string) {
  return cn(
    "min-h-12 w-full rounded-2xl border bg-white/[0.04] px-4 text-sm text-foreground outline-none transition-all placeholder:text-white/35 focus:border-accent focus:ring-2 focus:ring-accent/30",
    error ? "border-danger/60" : "border-white/10",
    className,
  );
}

export function TextInput({ error, className, ...props }: InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  return <input className={fieldClassName(error, className)} {...props} />;
}

export function TextArea({
  error,
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }) {
  return <textarea className={fieldClassName(error, cn("min-h-24 py-3", className))} {...props} />;
}

export function Select({
  error,
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { error?: string }) {
  return <select className={fieldClassName(error, className)} {...props} />;
}

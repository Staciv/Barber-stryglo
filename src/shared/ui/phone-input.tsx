"use client";

import { useEffect, useId, useMemo, useState } from "react";
import {
  extractBelarusNationalPart,
  formatBelarusNationalPart,
  normalizeBelarusNationalPart,
  validateBelarusNationalPart,
} from "@/shared/lib/belarus-phone";
import { cn } from "@/shared/lib/utils";
import { InlineError } from "./inline-error";

type PhoneInputProps = {
  id?: string;
  label?: string;
  value: string;
  onChange: (normalizedPhone: string) => void;
  error?: string;
  description?: string;
  disabled?: boolean;
  autoComplete?: string;
};

function getNextNationalPart(rawValue: string, currentDisplayValue: string) {
  const rawDigits = rawValue.replace(/\D/g, "");
  const currentDigits = extractBelarusNationalPart(currentDisplayValue);

  if (currentDigits && rawDigits.length > 9 && rawDigits.startsWith(currentDigits)) {
    const appendedDigits = rawDigits.slice(currentDigits.length);
    const appendedNationalPart = extractBelarusNationalPart(appendedDigits);

    if (appendedNationalPart) {
      return appendedNationalPart;
    }
  }

  return extractBelarusNationalPart(rawValue);
}

export function PhoneInput({
  id,
  label = "Телефон",
  value,
  onChange,
  error,
  description,
  disabled,
  autoComplete = "tel",
}: PhoneInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [touched, setTouched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [displayValue, setDisplayValue] = useState(() =>
    formatBelarusNationalPart(extractBelarusNationalPart(value)),
  );
  const nationalPart = extractBelarusNationalPart(value);
  const validation = useMemo(
    () => validateBelarusNationalPart(nationalPart),
    [nationalPart],
  );
  const visibleError = error ?? (touched && nationalPart ? validation.error : undefined);

  useEffect(() => {
    if (!isFocused) {
      setDisplayValue(formatBelarusNationalPart(nationalPart));
    }
  }, [isFocused, nationalPart]);

  return (
    <label className="block space-y-2" htmlFor={inputId}>
      <span className="text-sm font-medium text-foreground">{label}</span>
      <span
        className={cn(
          "flex min-h-14 items-center overflow-hidden rounded-2xl border bg-white/[0.04] text-base transition-all focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/30",
          visibleError ? "border-danger/60" : "border-white/10",
          disabled && "opacity-70",
        )}
      >
        <span className="flex min-h-14 items-center border-r border-white/10 bg-accent/10 px-4 font-black text-accent">
          +375
        </span>
        <input
          id={inputId}
          aria-label={label}
          inputMode="numeric"
          autoComplete={autoComplete}
          disabled={disabled}
          value={displayValue}
          onBlur={() => {
            setTouched(true);
            setIsFocused(false);
            setDisplayValue(formatBelarusNationalPart(displayValue));
          }}
          onFocus={() => {
            setIsFocused(true);
            setDisplayValue(extractBelarusNationalPart(displayValue));
          }}
          onChange={(event) => {
            const nextNationalPart = getNextNationalPart(event.target.value, displayValue);
            setDisplayValue(nextNationalPart);
            onChange(nextNationalPart ? normalizeBelarusNationalPart(nextNationalPart) : "");
          }}
          placeholder="29 123 45 67"
          className="min-h-14 min-w-0 flex-1 bg-transparent px-4 text-foreground outline-none placeholder:text-white/35 disabled:cursor-not-allowed"
        />
      </span>
      {description && <p className="text-xs leading-5 text-muted">{description}</p>}
      <InlineError>{visibleError}</InlineError>
    </label>
  );
}

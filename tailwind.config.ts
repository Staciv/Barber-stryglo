import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
    "./src/entities/**/*.{ts,tsx}",
    "./src/shared/**/*.{ts,tsx}",
    "./src/widgets/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        accentCold: "rgb(var(--accent-cold) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        surfaceElevated: "rgb(var(--surface-elevated) / <alpha-value>)",
        surfaceStrong: "rgb(var(--surface-strong) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        ring: "rgb(var(--ring) / <alpha-value>)",
        success: "rgb(var(--success) / <alpha-value>)",
        warning: "rgb(var(--warning) / <alpha-value>)",
        danger: "rgb(var(--danger) / <alpha-value>)",
        disabled: "rgb(var(--disabled) / <alpha-value>)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,122,24,0.18), 0 18px 44px rgba(255,122,24,0.18)",
        card: "0 24px 80px rgba(0, 0, 0, 0.34)",
        cyan: "0 0 0 1px rgba(74,222,255,0.12), 0 10px 28px rgba(74,222,255,0.12)",
        inset: "inset 0 1px 0 rgba(255,255,255,0.05)",
      },
      backgroundImage: {
        "striglo-grid":
          "radial-gradient(circle at top, rgba(255,122,24,0.18), transparent 30%), radial-gradient(circle at 80% 10%, rgba(74,222,255,0.10), transparent 18%), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "surface-glow":
          "linear-gradient(135deg, rgba(255,122,24,0.14), rgba(74,222,255,0.08) 55%, transparent 100%)",
      },
      backgroundSize: {
        "striglo-grid": "auto, auto, 28px 28px, 28px 28px",
      },
      fontFamily: {
        sans: ["'SF Pro Display'", "'Inter'", "'Segoe UI'", "system-ui", "sans-serif"],
      },
      keyframes: {
        pulseRing: {
          "0%": { transform: "scale(0.95)", opacity: "0.6" },
          "70%": { transform: "scale(1.08)", opacity: "0" },
          "100%": { transform: "scale(1.08)", opacity: "0" },
        },
      },
      animation: {
        "pulse-ring": "pulseRing 2s ease-out infinite",
      },
      borderRadius: {
        "3xl": "1.75rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;

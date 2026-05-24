import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
    "./tests/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#121212",
        foreground: "#FFFFFF",
        muted: "#9CA3AF",
        accent: "#FF6B00",
        panel: "#18181A",
        border: "rgba(255,255,255,0.08)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,107,0,0.15), 0 12px 30px rgba(255,107,0,0.18)",
        card: "0 18px 60px rgba(0, 0, 0, 0.35)",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top, rgba(255,107,0,0.18), transparent 34%), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        "hero-grid": "auto, 32px 32px, 32px 32px",
      },
      fontFamily: {
        sans: ["'SF Pro Display'", "'Segoe UI'", "system-ui", "sans-serif"],
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
    },
  },
  plugins: [],
};

export default config;

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
        background: "#0a0a0b",
        foreground: "#FAFAFA",
        muted: "#71717A",
        accent: "#FF6B00",
        "accent-cyan": "#00D4FF",
        panel: "#111113",
        "panel-light": "#18181b",
        border: "rgba(255,255,255,0.06)",
        "border-glow": "rgba(255,107,0,0.25)",
        "border-cyan": "rgba(0,212,255,0.2)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,107,0,0.2), 0 0 20px rgba(255,107,0,0.15), 0 0 40px rgba(255,107,0,0.08)",
        "glow-lg": "0 0 0 1px rgba(255,107,0,0.25), 0 8px 40px rgba(255,107,0,0.2), 0 0 80px rgba(255,107,0,0.1)",
        "glow-cyan": "0 0 0 1px rgba(0,212,255,0.2), 0 0 20px rgba(0,212,255,0.1)",
        card: "0 25px 80px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.03)",
        "card-hover": "0 30px 100px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255,255,255,0.06)",
        "inner-glow": "inset 0 1px 0 0 rgba(255,255,255,0.05)",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255,107,0,0.15), transparent), radial-gradient(ellipse 60% 40% at 80% 10%, rgba(0,212,255,0.08), transparent), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px)",
        "gradient-radial": "radial-gradient(ellipse at center, var(--tw-gradient-stops))",
        "gradient-glow": "linear-gradient(135deg, rgba(255,107,0,0.1), rgba(0,212,255,0.05))",
        "glass-gradient": "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))",
        "shimmer": "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
      },
      backgroundSize: {
        "hero-grid": "auto, auto, 40px 40px, 40px 40px",
      },
      fontFamily: {
        sans: ["'SF Pro Display'", "'Inter'", "'Segoe UI'", "system-ui", "sans-serif"],
      },
      keyframes: {
        pulseRing: {
          "0%": { transform: "scale(0.95)", opacity: "0.7" },
          "70%": { transform: "scale(1.15)", opacity: "0" },
          "100%": { transform: "scale(1.15)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "pulse-ring": "pulseRing 2.5s ease-out infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};

export default config;

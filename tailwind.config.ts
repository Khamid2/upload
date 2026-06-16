import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "#F8FAFC",
        primary: "#2563EB",
        secondary: "#0F172A",
        accent: "#38BDF8",
      },
      boxShadow: {
        soft: "0 24px 80px rgba(15, 23, 42, 0.10)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

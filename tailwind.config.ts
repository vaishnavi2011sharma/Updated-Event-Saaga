import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        eventsaaga: {
          rose: "#e11d48",
          pink: "#ec4899",
          amber: "#d97706",
          violet: "#7c3aed",
          blue: "#3b82f6",
          orange: "#f97316",
          cyan: "#06b6d4",
        },
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'DM Sans'", "sans-serif"],
        accent: ["'Cormorant Garamond'", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;

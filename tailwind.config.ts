import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1c1c1c", // Supabase-like dark background
        surface: "#232323", // Slightly lighter for cards
        border: "#3e3e3e",
        foreground: "#ededed",
        muted: "#8b8b8b",
        primary: {
          DEFAULT: "#7c3aed", // Deep Purple
          hover: "#6d28d9",
          foreground: "#ffffff",
        },
      },
    },
  },
  plugins: [],
};
export default config;

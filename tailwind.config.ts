import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#1F3A5F",
        ink: {
          0: "#0B1A2D",
          1: "#15304D",
          2: "#1F3A5F",
          3: "#27517F",
        },
        accent: {
          cyan: "#5CC8F5",
          violet: "#7C6DF2",
        },
        surface: {
          light: "#F4F7FB",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg,#0B1A2D 0%,#15304D 40%,#1F3A5F 70%,#27517F 100%)",
        "accent-gradient": "linear-gradient(135deg,#5CC8F5 0%,#7C6DF2 100%)",
      },
    },
  },
  plugins: [],
};
export default config;

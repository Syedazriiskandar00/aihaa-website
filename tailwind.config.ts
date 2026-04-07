import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          primary: "#0A1628",
          secondary: "#0F1F3A",
          light: "#1A2D4A",
        },
        gold: {
          DEFAULT: "#D4A843",
          light: "#F0D48A",
          dark: "#C49A38",
        },
        muted: "#7A8BA8",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #D4A843 0%, #F0D48A 50%, #C49A38 100%)",
        "navy-gradient": "linear-gradient(180deg, #0A1628 0%, #0F1F3A 100%)",
      },
      boxShadow: {
        gold: "0 4px 20px rgba(212, 168, 67, 0.3)",
        "gold-lg": "0 10px 40px rgba(212, 168, 67, 0.2)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

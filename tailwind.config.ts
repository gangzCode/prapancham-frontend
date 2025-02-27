import type { Config } from "tailwindcss";
import { poppins, inter } from "@/styles/fonts";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      fontSize: {
        xs: ["12px", { lineHeight: "1.5", letterSpacing: "0.01em" }], // 12px
        sm: ["14px", { lineHeight: "1.5", letterSpacing: "0.01em" }], // 14px
        base: ["16px", { lineHeight: "1.5", letterSpacing: "0.01em" }], // 16px
        lg: ["24px", { lineHeight: "1.5", letterSpacing: "0.01em" }], // 24px
      },
      textStyles: {
        "body-sm": {
          css: {
            fontFamily: "var(--font-inter)",
            fontSize: "14px",
          },
        },
        "body-base": {
          css: {
            fontFamily: "var(--font-inter)",
            fontSize: "16px",
          },
        },
        "heading-base": {
          css: {
            fontFamily: "var(--font-poppins)",
            fontSize: "16px",
            fontWeight: "700",
          },
        },
        "heading-lg": {
          css: {
            fontFamily: "var(--font-poppins)",
            fontSize: "24px",
            fontWeight: "700",
          },
        },
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    function ({
      addUtilities,
      theme,
    }: {
      addUtilities: (utilities: Record<string, any>) => void;
      theme: (path: string) => any;
    }) {
      const textStyles = theme("textStyles");
      addUtilities({
        ".text-body-sm": textStyles["body-sm"].css,
        ".text-body-base": textStyles["body-base"].css,
        ".text-heading-base": textStyles["heading-base"].css,
        ".text-heading-lg": textStyles["heading-lg"].css,
      });
    },
  ],
} satisfies Config;

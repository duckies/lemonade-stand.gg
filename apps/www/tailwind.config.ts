import type { Config } from "tailwindcss";

export default {
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.mdx",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
    "../../packages/editor/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: undefined,
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
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
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
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
        class: {
          "death-knight": "#c41e3a", // Death Knight
          "demon-hunter": "#a330c9", // Demon Hunter
          druid: "#ff7c0a", // Druid
          evoker: "#33937f", // Evoker
          hunter: "#aad372", // Hunter
          mage: "#3fc7eb", // Mage
          monk: "#00ff96", // Monk
          paladin: "#f48cba", // Paladin
          priest: "#fffff", // Priest
          rogue: "#fff468", // Rogue
          shaman: "#0070DD", // Shaman
          warlock: "#8788EE", // Warlock
          warrior: "#C69B6D", // Warrior
        },
        yellow: {
          DEFAULT: "#f9cb58",
          50: "#fefaf0",
          100: "#fef4dd",
          200: "#fdeaba",
          300: "#fbe19d",
          400: "#fad67a",
          500: "#f9cb58",
          600: "#f7b818",
          700: "#c58f07",
          800: "#805d05",
          900: "#402f02",
        },
      },
      transitionDuration: {
        "250": "250ms",
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "enter-from-right": {
          from: { opacity: "0", transform: "translateX(200px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "enter-from-left": {
          from: { opacity: "0", transform: "translateX(-200px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "exit-from-right": {
          from: { opacity: "1", transform: "translateX(0)" },
        },
        "exit-to-right": {
          from: { opacity: "1", transform: "translateX(0)" },
          to: { opacity: "0", transform: "translateX(200px)" },
        },
        "exit-to-left": {
          from: { opacity: "1", transform: "translateX(0)" },
          to: { opacity: "0", transform: "translateX(-200px)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "rotateX(-30deg) scale(0.9)" },
          to: { opacity: "1", transform: "rotateX(0deg) scale(1)" },
        },
        "scale-out": {
          from: { opacity: "1", transform: "rotateX(0deg) scale(1)" },
          to: { opacity: "0", transform: "rotateX(-10deg) scale(0.95)" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        rocking: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "33%": { transform: "rotate(90deg)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        rocking: "rocking 2s ease-in-out infinite",
        "fade-in": "fade-in 1s both 1",
      },
      transitionTimingFunction: {
        "ease-in-back": "cubic-bezier(.42,.97,.52,1.49)",
        "in-out-circ": "cubic-bezier(0.85,0,0.15,1)"
      },
      typography: () => ({
        DEFAULT: {
          css: {
            maxWidth: false,
          },
        },
      }),
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

import tailwindcssTypography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import tailwindScrollbar from "tailwind-scrollbar";
import plugin from "tailwindcss/plugin";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "0.5rem",
        sm: "0.5rem",
        lg: "0.5rem",
        xl: "0rem",
        "2xl": "0rem",
      },
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
      "7xl": "4.5rem",
      "8xl": "6rem",
      "9xl": "8rem",
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    extend: {
      colors: {
        border: { DEFAULT: "hsl(var(--border))" },
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
          primary: {
            DEFAULT: "hsl(var(--destructive-primary))",
            foreground: "hsl(var(--destructive-primary-foreground))",
          },
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
          primary: {
            DEFAULT: "hsl(var(--success-primary))",
            foreground: "hsl(var(--success-primary-foreground))",
          },
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
          primary: {
            DEFAULT: "hsl(var(--warning-primary))",
            foreground: "hsl(var(--warning-primary-foreground))",
          },
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          border: "hsl(var(--muted-border))",
          hover: "hsl(var(--muted-hover))",
          active: "hsl(var(--muted-active))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          primary: {
            DEFAULT: "hsl(var(--accent-primary))",
            foreground: "hsl(var(--accent-primary-foreground))",
          },
        },
        affirmative: {
          DEFAULT: "hsl(var(--affirmative))",
          foreground: "hsl(var(--affirmative-foreground))",
          primary: {
            DEFAULT: "hsl(var(--affirmative-primary))",
            foreground: "hsl(var(--affirmative-primary-foreground))",
          },
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        brand: {
          ocean: {
            DEFAULT: "hsl(var(--brand-ocean))",
            primary: "hsl(var(--brand-ocean-primary))",
            foreground: "hsl(var(--brand-ocean-foreground))",
          },
          twilight: {
            DEFAULT: "hsl(var(--brand-twilight))",
            primary: "hsl(var(--brand-twilight-primary))",
            foreground: "hsl(var(--brand-twilight-foreground))",
            "primary-foreground":
              "hsl(var(--brand-twilight-primary-foreground))",
          },
          bubblegum: {
            DEFAULT: "hsl(var(--brand-bubblegum))",
            foreground: "hsl(var(--brand-bubblegum-foreground))",
            primary: {
              DEFAULT: "hsl(var(--brand-bubblegum-primary))",
              foreground: "hsl(var(--brand-bubblegum-primary-foreground))",
            },
          },
          flamingo: {
            DEFAULT: "hsl(var(--brand-flamingo))",
            primary: "hsl(var(--brand-flamingo-primary))",
            foreground: "hsl(var(--brand-flamingo-foreground))",
          },
          scarlet: {
            DEFAULT: "hsl(var(--brand-scarlet))",
            primary: "hsl(var(--brand-scarlet-primary))",
            foreground: "hsl(var(--brand-scarlet-foreground))",
          },
          tiger: {
            DEFAULT: "hsl(var(--brand-tiger))",
            primary: "hsl(var(--brand-tiger-primary))",
            foreground: "hsl(var(--brand-tiger-foreground))",
          },
          saffron: {
            DEFAULT: "hsl(var(--brand-saffron))",
            primary: "hsl(var(--brand-saffron-primary))",
            foreground: "hsl(var(--brand-saffron-foreground))",
          },
          sapphire: {
            DEFAULT: "hsl(var(--brand-sapphire))",
            primary: "hsl(var(--brand-sapphire-primary))",
            foreground: "hsl(var(--brand-sapphire-foreground))",
          },
        },
        moon: {
          50: "#FCFBF8",
          100: "#FCFAF7",
          200: "#ECEAE4",
          300: "#D8D6CF",
          400: "#C5C1B9",
          500: "#9B9892",
          600: "#5F5F5D",
          700: "#40403F",
          800: "#272725",
          900: "#1B1B1B",
          950: "#0D0D0D",
        },
        sapphire: {
          50: "#F0F8FF", 100: "#C7E4FF", 200: "#B2DAFF", 300: "#8FC9FF",
          400: "#70A8FF", 500: "#4E93FF", 600: "#4089FC", 700: "#3479E5",
          800: "#1F68DB", 900: "#195AAE", 950: "#114674",
        },
        ocean: {
          50: "#EEF5FF", 100: "#DAE8FF", 200: "#BDD7FF", 300: "#90BFFF",
          400: "#4E93FF", 500: "#3575FC", 600: "#1F55F1", 700: "#173FDE",
          800: "#1935B4", 900: "#1A318E", 950: "#152056",
        },
        twilight: {
          50: "#EEF0FF", 100: "#DFE3FF", 200: "#BBC1FF", 300: "#A3A9FE",
          400: "#827FFA", 500: "#6D60F4", 600: "#5E43E8", 700: "#5235CD",
          800: "#422EA5", 900: "#3A2C83", 950: "#231A4C",
        },
        bubblegum: {
          50: "#FFF4FF", 100: "#FFE7FF", 200: "#FFCEFD", 300: "#FFA6F9",
          400: "#FE74F3", 500: "#F540E5", 600: "#D920C5", 700: "#B417A0",
          800: "#931581", 900: "#781768", 950: "#510145",
        },
        flamingo: {
          50: "#FFF0F8", 100: "#FFE3F5", 200: "#FFC6EA", 300: "#FF98D7",
          400: "#FF58BB", 500: "#FF279E", 600: "#FF0178", 700: "#DF005C",
          800: "#B8004C", 900: "#980343", 950: "#5F0023",
        },
        scarlet: {
          50: "#FFF0F0", 100: "#FFDEDE", 200: "#FFC2C2", 300: "#FF9898",
          400: "#FF5D5D", 500: "#FF2B2B", 600: "#F71D1D", 700: "#D00505",
          800: "#AB0909", 900: "#8D0F0F", 950: "#4E0101",
        },
        tiger: {
          50: "#FFF6ED", 100: "#FFEBD4", 200: "#FFD3A8", 300: "#FFB370",
          400: "#FF8737", 500: "#FF6D1B", 600: "#F04A06", 700: "#C73507",
          800: "#9E2B0E", 900: "#7F260F", 950: "#451005",
        },
        saffron: {
          50: "#FFF9EB", 100: "#FFEEC6", 200: "#FFDA88", 300: "#FFC14A",
          400: "#FFA517", 500: "#F98507", 600: "#DD5F02", 700: "#B74006",
          800: "#94300C", 900: "#7A280D", 950: "#461302",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      boxShadow: {
        modal:
          "0 0 0 1px rgba(19,21,23,0.08),0 3px 3px rgba(0,0,0,0.03),0 8px 7px rgba(0,0,0,0.04),0 17px 14px rgba(0,0,0,0.05),0 35px 29px rgba(0,0,0,0.06),0px -4px 4px 0px rgba(0,0,0,0.04) inset",
      },
      boxShadowColor: { bright: "hsla(215, 5%, 45%, 0.3)" },
      textShadow: {
        sm: "drop-shadow(0 1px 2px var(--tw-shadow-color))",
        DEFAULT: "drop-shadow(0 2px 4px var(--tw-shadow-color))",
        lg: "drop-shadow(0 8px 16px var(--tw-shadow-color))",
      },
      borderRadius: {
        "3.5xl": "calc(var(--radius) * 3.5)",
        "2xl": "calc(var(--radius) * 2)",
        xl: "calc(var(--radius) * 1.5)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        flash: { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0.6" } },
        "slide-up": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
        "bounce-slow": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "shimmer-text": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        "text-shimmer": {
          "0%": { backgroundPosition: "200% 50%" },
          "100%": { backgroundPosition: "-100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "border-beam": {
          "0%": { "offset-distance": "0%" },
          "100%": { "offset-distance": "100%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        flash: "flash 0.6s ease-in-out",
        "slide-up": "slide-up 12s linear infinite",
        "spin-reverse": "spin 1s linear infinite reverse",
        "bounce-slow": "bounce-slow 3s infinite linear alternate",
        shimmer: "shimmer 1s ease-in-out infinite",
        "shimmer-text": "shimmer-text 1s ease-in-out infinite",
        "text-shimmer": "text-shimmer 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        "border-beam": "border-beam 8s linear infinite",
      },
      typography: {
        markdown: {
          css: {
            p: { fontSize: "1rem", lineHeight: "156%" },
            h1: { fontSize: "1.375rem", marginTop: "16px" },
            h2: { fontSize: "1.1875rem", marginTop: "12px" },
            h3: { fontSize: "1.0625rem", marginTop: "10px" },
            h4: { fontSize: "0.9375rem", marginTop: "8px" },
            table: { fontSize: "0.8125rem", marginBottom: "16px" },
            li: { fontSize: "1rem", marginBottom: "0px", marginTop: "0px", paddingBottom: "0px", paddingTop: "0px" },
            ul: { marginTop: 0, marginBottom: 0 },
            ol: { marginTop: 0, marginBottom: 0, lineHeight: "156%" },
          },
        },
        "markdown-mobile": {
          css: {
            p: { fontSize: "1.125rem", lineHeight: "156%" },
            h1: { fontSize: "1.5rem", marginTop: "16px" },
            h2: { fontSize: "1.25rem", marginTop: "12px" },
            h3: { fontSize: "1.125", marginTop: "10px" },
            h4: { fontSize: "1.125rem", marginTop: "8px" },
            table: { fontSize: "0.8125rem", marginBottom: "16px" },
            li: { fontSize: "1.125rem", marginBottom: "0px", marginTop: "0px", paddingBottom: "0px", paddingTop: "0px" },
            ul: { marginTop: 0, marginBottom: 0 },
            ol: { marginTop: 0, marginBottom: 0, lineHeight: "156%" },
          },
        },
      },
      fontFamily: {
        sans: [
          "var(--font-camera-plain)",
          "Camera Plain Variable",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: ["var(--font-roboto-mono)", "monospace"],
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg|text|border)-(brand)-(ocean|twilight|bubblegum|flamingo|tiger|saffron)-(primary|primary-foreground)/,
      variants: ["hover"],
    },
    "group-[.avatars]:hover:border-brand-ocean-primary",
    "group-[.avatars]:hover:border-brand-twilight-primary",
    "group-[.avatars]:hover:border-brand-bubblegum-primary",
    "group-[.avatars]:hover:border-brand-flamingo-primary",
    "group-[.avatars]:hover:border-brand-tiger-primary",
    "group-[.avatars]:hover:border-brand-saffron-primary",
  ],
  plugins: [
    tailwindcssAnimate,
    tailwindcssTypography,
    tailwindScrollbar({ nocompatible: true }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        { "text-shadow": (value) => ({ filter: value }) },
        { values: theme("textShadow") }
      );
    }),
  ],
} satisfies Config;

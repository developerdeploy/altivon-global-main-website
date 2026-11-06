import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#08090b",
          dim: "#dbdad6",
          bright: "#111318",
          container: {
            lowest: "#ffffff",
            low: "#f4f4f0",
            DEFAULT: "#efeeea",
            high: "#e9e8e4",
            highest: "#e3e2df",
          },
          tint: "#426558",
          variant: "#e3e2df",
        },
        primary: {
          DEFAULT: "#f5f3ef",
          container: "#111318",
          fixed: { DEFAULT: "#c4ebda", dim: "#a8cfbe" },
        },
        "on-primary": {
          DEFAULT: "#ffffff",
          container: "#81a797",
          fixed: { DEFAULT: "#002117", variant: "#2a4d41" },
        },
        secondary: {
          DEFAULT: "#4c6545",
          container: "#ceebc2",
          fixed: { DEFAULT: "#ceebc2", dim: "#b3cea7" },
        },
        "on-secondary": {
          DEFAULT: "#ffffff",
          container: "#526b4a",
          fixed: { DEFAULT: "#0a2007", variant: "#354d2f" },
        },
        tertiary: {
          DEFAULT: "#2c1e00",
          container: "#453304",
          fixed: { DEFAULT: "#fedfa1", dim: "#e1c387" },
        },
        "on-tertiary": {
          DEFAULT: "#ffffff",
          container: "#b69b63",
          fixed: { DEFAULT: "#261a00", variant: "#584414" },
        },
        "on-surface": {
          DEFAULT: "#1b1c1a",
          variant: "#414845",
        },
        outline: {
          DEFAULT: "#717974",
          variant: "#c1c8c3",
        },
        error: {
          DEFAULT: "#ba1a1a",
          container: "#ffdad6",
        },
        "on-error": {
          DEFAULT: "#ffffff",
          container: "#93000a",
        },
        inverse: {
          surface: "#2f312e",
          "on-surface": "#f2f1ed",
          primary: "#a8cfbe",
        },
        background: "#08090b",
        "on-background": "#f5f3ef",
        // Convenience aliases
        "body-text": "#242b28",
        "gold-accent": "#b59a62",
        "botanical-olive": "#718b68",
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        heading: ["Playfair Display", "serif"],
        body: ["Plus Jakarta Sans", "sans-serif"],
        label: ["Plus Jakarta Sans", "sans-serif"],
      },
      fontSize: {
        display: [
          "3.5rem",
          { lineHeight: "4rem", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        "display-mobile": [
          "2.25rem",
          {
            lineHeight: "2.75rem",
            letterSpacing: "-0.01em",
            fontWeight: "600",
          },
        ],
        "headline-lg": [
          "2.75rem",
          {
            lineHeight: "3.25rem",
            letterSpacing: "-0.015em",
            fontWeight: "600",
          },
        ],
        "headline-lg-mobile": [
          "1.875rem",
          { lineHeight: "2.375rem", fontWeight: "600" },
        ],
        "headline-md": ["2rem", { lineHeight: "2.5rem", fontWeight: "500" }],
        "headline-md-mobile": [
          "1.5rem",
          { lineHeight: "2rem", fontWeight: "500" },
        ],
        "headline-sm": [
          "1.375rem",
          { lineHeight: "1.75rem", fontWeight: "600" },
        ],
        "title-lg": [
          "1.125rem",
          {
            lineHeight: "1.625rem",
            letterSpacing: "0.005em",
            fontWeight: "600",
          },
        ],
        "title-md": ["1rem", { lineHeight: "1.5rem", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.75rem", fontWeight: "400" }],
        "body-md": ["0.9375rem", { lineHeight: "1.5rem", fontWeight: "400" }],
        "body-sm": ["0.8125rem", { lineHeight: "1.25rem", fontWeight: "400" }],
        "label-lg": [
          "0.875rem",
          { lineHeight: "1.25rem", letterSpacing: "0.04em", fontWeight: "600" },
        ],
        "label-md": [
          "0.75rem",
          { lineHeight: "1rem", letterSpacing: "0.06em", fontWeight: "600" },
        ],
        "label-sm": [
          "0.6875rem",
          {
            lineHeight: "0.875rem",
            letterSpacing: "0.08em",
            fontWeight: "700",
          },
        ],
      },
      spacing: {
        gutter: "1.5rem",
        "gutter-tablet": "1.25rem",
        "gutter-mobile": "1rem",
        margin: "3rem",
        "margin-tablet": "2rem",
        "margin-mobile": "1.25rem",
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "2.5rem",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;

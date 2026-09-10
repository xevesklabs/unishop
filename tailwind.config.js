/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // toggle via .dark class on <html>
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        accent: "var(--accent)", // keeps the dynamic school color behavior
        white: "var(--surface)",
        gray: {
          50: "var(--background)",
          100: "var(--surface-muted)",
          200: "var(--border)",
          300: "var(--border)",
          400: "var(--text-muted)",
          500: "var(--text-muted)",
          600: "var(--text-secondary)",
          700: "var(--text-secondary)",
          800: "var(--text-primary)",
          900: "var(--text-primary)",
        }
      },
    },
  },
  plugins: [],
};

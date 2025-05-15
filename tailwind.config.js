/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        qbair: {
          DEFAULT: "#3a88d1",
          dark: "#2f6fb0",
          light: "#64a5dc",
          lighter: "#e5f0fa",
          soft: "#bcd9f0",
          contrast: "#1e3e61",
        },
      },
    },
  },
  plugins: [],
};

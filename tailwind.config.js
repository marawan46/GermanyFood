/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF6B35",
        secondary: "#F7931E",
        accent: "#4ECDC4",
        dark: "#2C3E50",
        light: "#FFF8F0",
      },
      fontFamily: {
        primary: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};

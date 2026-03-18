/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        primary: "#ff4d4d",
        secondary: "#e67f0d",
        accent: "#ff0f80",
        "deep-orange": "#fe4e00",
        "vivid-red": "#e9190f",
        "background-dark": "#050810",
        "slate-custom": "#94a3b8",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
        full: "9999px",
      },
      animation: {
        "gradient-shift": "gradient-shift 15s ease infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "star-twinkle": "twinkle 3s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries"),
  ],
};

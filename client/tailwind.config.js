const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enable dark mode with 'class'
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Tailwind content paths
  theme: {
    extend: {},
  },
  plugins: [
    // Add this function to plugins
  ],
};


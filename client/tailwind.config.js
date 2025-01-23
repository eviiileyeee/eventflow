/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode with 'class'
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Tailwind content paths
  theme: {
    extend: {
      backgroundClip: {
        text: "text", // Ensure background-clip text is supported
      },
      fontFamily: {
        sans: ["Roboto", "Arial", "sans-serif"], // Default font family
      },
      backgroundSize: {
        '200%': '200%', // Ensure background size is available
      },
    },
  },
  plugins: [],
};

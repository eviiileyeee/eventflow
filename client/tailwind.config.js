/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode with 'class'
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Tailwind content paths
  theme: {
    extend: {
      animation: {
        marquee: "marquee 10s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
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

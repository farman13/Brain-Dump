/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#e6e8ea",
          400: "#555563"
        },
        purple: {
          300: "#e0e7ff",
          500: "#433bb3",
          600: "#5046e4"
        }
      }
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {colors: {
      primary: {
        500: '#FF6B6B', // Adjust to match your primary color
      },
    },},
  },
  plugins: [require("tailwindcss-animate")],
}
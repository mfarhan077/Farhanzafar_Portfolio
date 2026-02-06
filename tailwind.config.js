/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'dark-bg': '#020617', // Slate 950
        'dark-card': '#0f172a', // Slate 900
        'accent': '#6366f1', // Indigo 500
        'accent-hover': '#4f46e5', // Indigo 600
        'secondary': '#14b8a6', // Teal 500
      },
    },
  },
  plugins: [],
}

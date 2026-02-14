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
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        'dark-bg': '#0d1117', // GitHub Dark Dim
        'dark-card': '#161b22', // GitHub Dark Card
        'accent': '#58a6ff', // GitHub Blue
        'accent-hover': '#1f6feb',
        'secondary': '#2ea043', // GitHub Green
        'terminal-green': '#0f0',
        'terminal-cyan': '#0ff',
      },
    },
  },
  plugins: [],
}

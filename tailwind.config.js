/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          light: '#fdf8ec',
          DEFAULT: '#f4ebd0',
          dark: '#e6d5b8',
          shadow: '#cfbe9f',
        },
        celestial: {
          dark: '#080d1a',
          navy: '#0f172a',
          gold: '#d4af37',
          'gold-light': '#f3e5ab',
          'gold-dark': '#996515',
          bronze: '#8c6d3b',
          crimson: '#611818',
          cyan: '#38bdf8',
          violet: '#818cf8',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        reading: ['EB Garamond', 'Cinzel Decorative', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 60s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}

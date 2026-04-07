/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cafe-vino': {
          50: '#fef4f0',
          100: '#fde8e0',
          200: '#fbd4c0',
          300: '#f8b898',
          400: '#f49470',
          500: '#ed6a4f',
          600: '#d94634',
          700: '#b8342a',
          800: '#9a2924',
          900: '#7d221e',
          950: '#4a1512',
        },
        'brand-vino': '#681333',
        'coffee': {
          50: '#fdf8f6',
          100: '#f2eee8',
          200: '#e4d6c8',
          300: '#d4b596',
          400: '#c19660',
          500: '#a67c52',
          600: '#8b5a3c',
          700: '#6d4423',
          800: '#523515',
          900: '#3e2713',
          950: '#2a1810',
        },
        'dark-cafe-vino': '#4a1512',
        'dark-coffee': '#2a1810',
      },
    },
  },
  plugins: [],
}

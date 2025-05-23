/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'subtle-shift': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%':     { 'background-position': '100% 50%' },
        },
      },
      animation: {
        'subtle-shift': 'subtle-shift 60s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

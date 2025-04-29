/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'card-bg': 'var(--card-bg)',
        'nav-bg': 'var(--nav-bg)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
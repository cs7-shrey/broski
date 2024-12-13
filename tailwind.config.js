/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./MainPage/**/*.{js,jsx,ts,tsx}",
    "./floating.html",
    "./FloatingPage/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-filters'),
  ],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lastik: ["Lastik", "sans-serif"],
        fustat: ["Fustat", "sans-serif"],
      },
    },
  },  
  plugins: [],
}

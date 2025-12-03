/** @type {import('tailwindcss').Config} */
module.exports = {
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

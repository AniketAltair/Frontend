/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cursive: ['"Comic Sans MS"', 'Caveat', 'Pacifico', 'cursive'],
      },
      scale: {
        130: '1.3', 
      },
    },
  },
  plugins: [],
}


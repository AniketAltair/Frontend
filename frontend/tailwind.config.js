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
      screens: {
        'below-400': { max: '400px' },
      },
      keyframes: {
        rotateClockwise: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        rotateAntiClockwise: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
      },
      animation: {
        rotateClockwise: 'rotateClockwise 0.5s linear',
        rotateAntiClockwise: 'rotateAntiClockwise 0.5s linear',
      },
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      colors: {
        "blue-custom": "#6946F4",
      },
      gridTemplateColumns: {
        "3-custom": "repeat(3, minmax(270px, 370px))",
      },
    },
  },
  plugins: [],
};

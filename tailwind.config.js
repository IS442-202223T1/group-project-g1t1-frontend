/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        redPri: "#D91D52",
        redSec: "#FF2B4E",
        orangePri: "#F47920",
        orangeSec: "#FFA200",
        black: "#000000",
        grey: "#ECECEC",
        darkGrey: "#747474",
        white: "#FFFFFF",
        confirmationGreen: "#00BC4B",
      }
    },
  },
  plugins: [
    require("flowbite/plugin")
  ]
};

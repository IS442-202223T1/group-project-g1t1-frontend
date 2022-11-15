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
        greenPri: "#0A704E",
        greenSec: "#6F9D80",
        badgeCol1Light: "#DCD3E2",
        badgeCol1Dark: "#6D5271",
        badgeCol2Light: "#CADEED",
        badgeCol2Dark: "#053F5C",
        badgeCol3Light: "#FFEACC",
        badgeCol3Dark: "#DC6601",
      }
    },
  },
  plugins: [
    require("flowbite/plugin")
  ]
};

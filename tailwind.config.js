/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js}",/*
    "./node_modules/tw-elements/dist/js/!**!/!*.js"*/
  ],
  theme: {
    extend: {
      fontFamily: {
        cressida : ["CressidaSwashC", "sans-serif"],
        serif: ["Nunito", "sans-serif"],
      }
    },
  },
  plugins: [
    require("tw-elements/dist/plugin")
  ],
}

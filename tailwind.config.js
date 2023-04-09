/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js}",
    "./node_modules/flowbite/**/*.{js,ts}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
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
    require('flowbite/plugin')
  ],
}

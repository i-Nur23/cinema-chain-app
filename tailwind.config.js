/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js}"
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
  ],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        "primaryColor": "#F8931D",
        "secondaryColor": "#181B60",
        "background2": "#e5e5e5",
        "darkGray": "#808080",
        "textFormbg": "#FFFFFF",
        "textFormBorderbg": "#C7C7C7",
        background: {
          100: "#ffffff",
          700: "#808080"
        },
        surface: "#E4E4E4",
        onPrimary: "#ffffff",
        onBackground: "#000000",
        onSurface: "#000000",
        "dangerColor": "#CC3333",
        gradient1: "#161a61",
        gradient2: "#f7941d"
      }
    },
  },
  plugins: [],
}

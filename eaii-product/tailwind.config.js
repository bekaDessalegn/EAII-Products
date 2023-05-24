/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.js",
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
      }
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
}


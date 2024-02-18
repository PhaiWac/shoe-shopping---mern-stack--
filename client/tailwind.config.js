/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
        },
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          // primary : '#4169E1'
        },
      },
      "coffee",
      "business"
    ],
  },
}
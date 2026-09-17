/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,mjs}"],
  darkMode: "class", // allows toggling dark mode manually
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "MiSans",
          "PingFang SC",
          "Microsoft YaHei",
          "sans-serif",
          ...defaultTheme.fontFamily.sans,
        ],
      },
      fontWeight: {
        normal: "330",
        medium: "380",
        semibold: "520",
        bold: "630",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}

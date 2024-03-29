/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      screens: {
        xs: '475px',
        ...defaultTheme.screens,
      },
      fontFamily: {
        serif: ['Bitter', ...defaultTheme.fontFamily.serif],
        'sans-serif': ['Nunito', ...defaultTheme.fontFamily.sans],
        sans: ['Ubuntu', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}

// tailwind.config.js
module.exports = {
  purge: [],
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      // boxShadow: {
      //   md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(150, 40, 27, 1)",
      //   lg: "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(150, 40, 27, 1)",
      // },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@themesberg/flowbite/plugin')
  ],
};

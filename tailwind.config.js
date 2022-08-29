// tailwind.config.js
module.exports = {
  purge: [],
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
      segoe:['Segoe','sans-serif'],
      inter:['Inter','sans-serif']
    },
    extend: {
      colors: {
        "pink":"#C71B43",
        "sgreen":"#32CD32",
        "swhite":"#fdfcfa"
      },
      // boxShadow: {
      //   md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(150, 40, 27, 1)",
      //   lg: "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(150, 40, 27, 1)",
      // },
    },
  },
  plugins: [
    require('@themesberg/flowbite/plugin'),
    require('tailwind-scrollbar'),
  ],
  variants: {
    scrollbar: ['rounded']
  },
};

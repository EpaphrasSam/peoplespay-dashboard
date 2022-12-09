// tailwind.config.js
module.exports = {
  purge: [],
  content: [
    // ...
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
      segoe: ['Segoe', 'sans-serif'],
      inter: ['Inter', 'sans-serif']
    },
    extend: {
      colors: {
        "pink": "#C71B43",
        "sgreen": "#32CD32",
        "swhite": "#fdfcfa"
      },
      // boxShadow: {
      //   md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(150, 40, 27, 1)",
      //   lg: "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(150, 40, 27, 1)",
      // },
    },
    screens: {
      'n': '390px',
      // => @media (min-width: 640px) { ... }

      'nn': '450px',
      // => @media (min-width: 640px) { ... }

      'nnn': '475px',
      // => @media (min-width: 640px) { ... }

      'smm': '542px',
      // => @media (min-width: 640px) { ... }

      'sm': '640px',
      // => @media (min-width: 640px) { ... }


      'sd': '768px',
      // => @media (min-width: 768px) { ... }

      'md': '880px',
      // => @media (min-width: 768px) { ... }

      'nd': '930px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }

    },
  },
  plugins: [
    require('@themesberg/flowbite/plugin'),
    require('tailwind-scrollbar'),
    require('flowbite/plugin')
  ],
  variants: {
    scrollbar: ['rounded']
  },
};

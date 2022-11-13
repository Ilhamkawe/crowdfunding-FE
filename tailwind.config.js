module.exports = {
    purge: [
        './components/**/*.{vue,js}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        colors : {
          "blue-main" : "#5352ED",
          "blue-secondary" : "#7FABFF",
          "blue-cat" : "#0A0BC5", 
          "blue-tr" : "#E4EAFF",
          "gray" : "#c4c4c4", 
          "gray-white" : "#dadada",
          "gray-stat" : "#6c6c6c",
          "green-new" : "#2ecc71",
          "green-new-dark" : "#27ae60",
          "red-remove" : "#e74c3c",
          "gray-input" : "#eff0f6",
          "gray-order" : "#dedede",
          "gray-label" : "#6e7191",
        }, 
        width : {
          '9/10' : "90%"
        }
      },
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    variants: {},
    plugins: [],
  }
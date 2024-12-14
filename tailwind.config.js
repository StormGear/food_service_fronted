/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-image': "url('/src/assets/images/food.jpg')",
      },
      transitionProperty: {
        'width-height': 'width, height',
      },
      colors: {
        'primary-color': '#2ECC40',
        'secondary-color': '#122023',
      },
    },
  },
  plugins: [],
}


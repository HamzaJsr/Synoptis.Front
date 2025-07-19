// à la racine
module.exports = {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#16C4CF',
          dark:    '#242D3C',
          slate:   '#2C3543',
          light:   '#F4F5F5',
          gray:    '#555C67',
        },
      },
    },
  },
  plugins: [],
}

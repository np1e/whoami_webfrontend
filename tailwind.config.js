module.exports = {
  purge: [
    './public/**/*.html',
    './src/**/*.vue'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        background: 'var(--background)',
      },
      padding: {
        xs: '4px',
        sm: '10px',
        md: '20px',
        lg: '40px',
        xl: '80px'
      },
      maxWidth: {
        '1/4': '25%',
        '1/3': '30%',
        '1/2': '50%',
        '2/3': '60%',
      },
    },
    container: {
      center: true,
    },
  },
  stroke: theme => ({
    'red': theme('colors.red.500'),
  }),
  variants: {
    extend: {
      borderWidth: ['hover'],
      stroke: ['hover']
    },
  },
  plugins: [],
}

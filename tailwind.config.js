module.exports = {
  purge: [
    './public/**/*.html',
    './src/**/*.vue'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    container: {
      center: true,
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
    colors: {
      primary: {
        DEFAULT: 'var(--primary)',
        dark: 'var(--primary-dark)'
      },
      secondary: 'var(--secondary)',
      gray: 'var(--light-gray)',
      background: 'var(--background)',
      'dark-accent': 'var(--dark-accent)',
      'light-accent': 'var(--light-accent)',
    },
  },
  variants: {
    extend: {
      borderWidth: ['hover'],
    },
  },
  plugins: [],
}

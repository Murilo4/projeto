/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: [
    // './app/**/*.{js,ts,jsx,tsx,mdx}',
    // './pages/**/*.{js,ts,jsx,tsx,mdx}',
    // './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // fontFamily: {
    //   Montserrat: ['Montserrat', 'sans-serif'],
    //   Poppins: ['Poppins', 'sans-serif'],
    // },
    extend: {
      colors: {
        'principal-blue': '#2386B9',
        'light-blue': '#70B4DC',
        'background-blue': '#DCE4E7',
        'text': '#000000',
        'icons-green': '#0F5800',
        'white-background': '#FFFFFF',
        keyword: '#E3681B',
        purple: '#BB4FED',
        green: '#41CD51',
        yellow: '#FFCC00',
        blue: '#00B4DD',
        red: '#FF4949',
      },
      spacing: {
        'screen-header': 'calc(100vh - 62px)',
        '272px': '17rem',
        '310px': '19.375rem',
        '420px': '26.25rem',
        '464px': '29rem',
        '520px': '32.5rem',
        '530px': '33.125rem',
        '656px': '41rem',
        '718px': '44.875rem',
        '842px': '52.625rem',
        '920px': '57.5rem',
        '1248px': '78rem',
        '1440px': '90rem',
        '1664px': '104rem',
      },
      screens: {
        vsm: '610px',
        '1.5xl': '1440px',
      },
      // backgroundImage: {},
      // fontSize: {},
      // padding: {},
      // lineHeight: {},
      // gridTemplateColumns: {},
      boxShadow: {
        clean: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        'very-clean': '1px 2px 6px 2px rgba(100, 100, 111, 0.2)',
        mid: '0px 2px 8px 0px rgba(99, 99, 99, 0.2)',
        hight:
          'rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px',
        input:
          'rgba(0, 0, 0, 0.075) 0px 1px 3px, rgba(0, 0, 0, 0.144) 0px 1px 2px',
      },
      rotate: {
        270: '270deg',
      },
    },
  },
  plugins: [],
}
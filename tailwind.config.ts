import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(176 73% 55%)',
        secondary: 'hsl(220 98% 74%)',
        black: 'hsl(174 56% 4%)',
        creme: 'hsl(40 39% 95%)',
        whiteCreme: 'hsl(40 100% 99%)',
        customGray: 'hsla(0 0% 73% / 0.9)'
      },
      fontFamily: {
        sans: ['Darker Grotesque', 'PP Neue Machina', 'ui-sans-serif', 'system-ui'],
        display: ['PP Neue Machina Display', 'PP Neue Machina', 'ui-sans-serif', 'system-ui']
      },
      screens: {
        '1xl': '1350px',
        '2xl': '1250px',
        '3xl': '1920px'
      },
      boxShadow: {
        reboot: '0 24px 80px rgba(4, 32, 29, 0.28)'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};

export default config;


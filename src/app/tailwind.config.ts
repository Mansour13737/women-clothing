import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', 'ui-serif', 'serif'],
        display: ['var(--font-display)', 'ui-serif', 'serif'],
        cinzel: ['var(--font-cinzel)', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config;
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // Every value here points at a token in src/styles/mate-tokens.css.
      // No literal belongs in this file — edit the DTCG source upstream.
      fontFamily: {
        mono: 'var(--font-mono)',
        sans: 'var(--font-sans)',
        serif: 'var(--font-serif)',
      },
      colors: {
        bg: 'var(--bg)',
        'bg-2': 'var(--bg-2)',
        'bg-3': 'var(--bg-3)',
        surface: 'var(--surface)',
        border: 'var(--border)',
        'border-2': 'var(--border-2)',
        'border-3': 'var(--border-3)',
        tx: 'var(--tx)',
        'tx-2': 'var(--tx-2)',
        'tx-3': 'var(--tx-3)',
        'tx-4': 'var(--tx-4)',
        accent: 'var(--accent)',
        'accent-text': 'var(--accent-text)',
        'on-accent': 'var(--on-accent)',
        link: 'var(--blue)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius-md)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
      },
    },
  },
  plugins: [],
}


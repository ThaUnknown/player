/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './lib/**/*.{svelte,md}',
    './app/**/*.{html,svelte,md}',
    './app/**/.markdoc/**/*.{md,svelte}',
    './app/**/.previews/**/*.{md,svelte}',
    './app/**/.snippets/**/*.{md,svelte}',
  ],
  experimental: {
    optimizeUniversalDefaults: true,
  },
  theme: {
    fontFamily: {
      sans: ['var(--font-family-sans)'],
      mono: ['var(--font-family-mono)'],
    },
    screens: {
      420: '420px',
      576: '576px',
      768: '768px',
      992: '992px',
      1200: '1200px',
      1280: '1280px',
      1440: '1440px',
      1460: '1460px',
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: 'rgb(var(--color-brand) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--color-secondary) / <alpha-value>)',
        },
        focus: {
          DEFAULT: 'rgb(var(--color-focus) / <alpha-value>)',
        },
        gray: {},
        border: 'rgb(var(--color-border) / <alpha-value>)',
        soft: 'rgb(var(--color-soft) / <alpha-value>)',
        inverse: 'rgb(var(--color-inverse) / <alpha-value>)',
        body: 'rgb(var(--color-body) / <alpha-value>)',
        elevate: 'rgb(var(--color-elevate) / <alpha-value>)',
      },
      animation: {
        indeterminate: 'indeterminate 1.2s linear infinite',
      },
      keyframes: {
        indeterminate: {
          '0%': { transform: 'translateX(0) scaleX(0)' },
          '40%': { transform: 'translateX(0) scaleX(0.4)' },
          '100%': { transform: 'translateX(100%) scaleX(0.5)' },
        },
      },
      typography,
    },
  },
  plugins: [require('@tailwindcss/typography'), require('vidstack/tailwind.cjs'), customVariants],
};

function customVariants({ addVariant }) {
  addVariant(
    'supports-backdrop-blur',
    '@supports (backdrop-filter: blur(0)) or (-webkit-backdrop-filter: blur(0))',
  );
}

function typography(theme) {
  return {
    DEFAULT: {
      css: {
        '--tw-prose-counters': 'rgb(var(--color-inverse))',
        '--tw-prose-invert-counters': 'rgb(var(--color-inverse))',
        color: 'rgb(var(--color-soft))',
        fontSize: '18px',
        maxWidth: 'none',
        hr: {
          borderColor: 'rgb(var(--color-border))',
          marginTop: '3em',
          marginBottom: '3em',
        },
        'h1, h2, h3': {
          letterSpacing: '-0.025em',
        },
        h2: {
          marginTop: `1.75em`,
          marginBottom: `${16 / 24}em`,
        },
        h3: {
          marginTop: '2.4em',
          lineHeight: '1.4',
        },
        h4: {
          marginTop: '1.75em',
          fontSize: '1.125em',
        },
        'h2 small, h3 small, h4 small': {
          fontFamily: theme('fontFamily.mono').join(', '),
          fontWeight: 500,
        },
        'h2 small': {
          fontSize: theme('fontSize.lg')[0],
          ...theme('fontSize.lg')[1],
        },
        'h3 small': {
          fontSize: theme('fontSize.base')[0],
          ...theme('fontSize.base')[1],
        },
        'h4 small': {
          fontSize: theme('fontSize.sm')[0],
          ...theme('fontSize.sm')[1],
        },
        ul: {
          paddingLeft: '1.25rem',
        },
        'ul > li': {
          position: 'relative',
          paddingLeft: '0.25rem',
        },
        'ul > li::marker': {
          color: 'rgb(var(--color-inverse))',
        },
        'ul > li::before': {
          content: '""',
          width: '0.75em',
          height: '0.125em',
          position: 'absolute',
          top: 'calc(0.875em - 0.0625em)',
          left: 0,
          borderRadius: '999px',
        },
        'li > p': {
          margin: 0,
        },
        a: {
          fontWeight: theme('fontWeight.normal'),
          textDecoration: 'none',
          borderBottom: `1px solid rgb(var(--color-brand))`,
        },
        'a:hover': {
          borderBottomWidth: '2px',
        },
        'a code': {
          color: 'inherit',
          fontWeight: 'inherit',
        },
        strong: {
          fontWeight: theme('fontWeight.semibold'),
        },
        'a strong': {
          color: 'inherit',
          fontWeight: 'inherit',
        },
        code: {
          fontWeight: theme('fontWeight.semibold'),
          fontVariantLigatures: 'none',
        },
        pre: {
          backgroundColor: 'var(--code-fence-bg)',
          boxShadow: 'none',
          display: 'flex',
        },
        'p + pre': {
          marginTop: `${-4 / 14}em`,
        },
        'pre code': {
          flex: 'none',
          minWidth: '100%',
        },
        table: {
          margin: 0,
          width: '100%',
          borderCollapse: 'collapse',
        },
        thead: {
          color: 'rgb(var(--color-inverse))',
          borderBottomColor: 'rgb(var(--color-border))',
        },
        tbody: {
          verticalAlign: 'baseline',
        },
        'thead th': {
          paddingTop: 0,
          fontWeight: theme('fontWeight.semibold'),
        },
        'tbody tr': {
          fontSize: theme('fontSize.sm')[0],
          borderBottomColor: 'rgb(var(--color-border))',
        },
        'tbody td': {
          whiteSpace: 'nowrap',
        },
        'tbody tr:last-child': {
          borderBottomWidth: '1px',
        },
        'tbody code': {
          fontSize: theme('fontSize.sm')[0],
        },
        'thead th:first-child': {
          paddingLeft: '0.5714286em',
        },
        'thead th:last-child': {
          paddingRight: '0.5714286em',
        },
        'tbody td:first-child': {
          paddingLeft: '0.5714286em',
        },
        'tbody td:last-child': {
          paddingRight: '0.5714286em',
        },
        'tbody tr td:first-child code': {
          color: theme('colors.indigo.500'),
          paddingLeft: '8px',
          '&::before': { display: 'none' },
          '&::after': { display: 'none' },
        },
        'figure figcaption': {
          textAlign: 'center',
          fontStyle: 'italic',
        },
        'figure > figcaption': {
          marginTop: `${12 / 14}em`,
        },
        blockQuote: {
          color: 'rgb(var(--color-inverse))',
          borderRadius: 2,
          borderColor: 'currentColor',
        },
      },
    },
    invert: {
      css: {
        color: 'rgb(var(--color-soft))',
        'tbody tr td:first-child code': {
          color: theme('colors.indigo.300'),
        },
        'tbody tr': {
          borderBottomColor: 'rgb(var(--color-border))',
        },
      },
    },
  };
}

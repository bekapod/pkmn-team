module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      white: 'var(--color-white)',
      carnation: {
        50: 'var(--color-carnation-50)',
        100: 'var(--color-carnation-100)',
        200: 'var(--color-carnation-200)',
        300: 'var(--color-carnation-300)',
        400: 'var(--color-carnation-400)',
        500: 'var(--color-carnation-500)',
        600: 'var(--color-carnation-600)',
        700: 'var(--color-carnation-700)',
        800: 'var(--color-carnation-800)',
        900: 'var(--color-carnation-900)'
      },
      kournikova: {
        50: 'var(--color-kournikova-50)',
        100: 'var(--color-kournikova-100)',
        200: 'var(--color-kournikova-200)',
        300: 'var(--color-kournikova-300)',
        400: 'var(--color-kournikova-400)',
        500: 'var(--color-kournikova-500)',
        600: 'var(--color-kournikova-600)',
        700: 'var(--color-kournikova-700)',
        800: 'var(--color-kournikova-800)',
        900: 'var(--color-kournikova-900)'
      },
      'sugar-cane': {
        50: 'var(--color-sugar-cane-50)',
        100: 'var(--color-sugar-cane-100)',
        200: 'var(--color-sugar-cane-200)',
        300: 'var(--color-sugar-cane-300)',
        400: 'var(--color-sugar-cane-400)',
        500: 'var(--color-sugar-cane-500)',
        600: 'var(--color-sugar-cane-600)',
        700: 'var(--color-sugar-cane-700)',
        800: 'var(--color-sugar-cane-800)',
        900: 'var(--color-sugar-cane-900)'
      },
      downy: {
        50: 'var(--color-downy-50)',
        100: 'var(--color-downy-100)',
        200: 'var(--color-downy-200)',
        300: 'var(--color-downy-300)',
        400: 'var(--color-downy-400)',
        500: 'var(--color-downy-500)',
        600: 'var(--color-downy-600)',
        700: 'var(--color-downy-700)',
        800: 'var(--color-downy-800)',
        900: 'var(--color-downy-900)'
      },
      'sherpa-blue': {
        50: 'var(--color-sherpa-blue-50)',
        100: 'var(--color-sherpa-blue-100)',
        200: 'var(--color-sherpa-blue-200)',
        300: 'var(--color-sherpa-blue-300)',
        400: 'var(--color-sherpa-blue-400)',
        500: 'var(--color-sherpa-blue-500)',
        600: 'var(--color-sherpa-blue-600)',
        700: 'var(--color-sherpa-blue-700)',
        800: 'var(--color-sherpa-blue-800)',
        900: 'var(--color-sherpa-blue-900)'
      }
    },
    extend: {
      spacing: {
        px: '1px',
        0: '0px',
        0.5: 'calc(var(--baseline) * 0.125rem)',
        1: 'calc(var(--baseline) * 0.25rem)',
        1.5: 'calc(var(--baseline) * 0.375rem)',
        2: 'calc(var(--baseline) * 0.5rem)',
        2.5: 'calc(var(--baseline) * 0.625rem)',
        3: 'calc(var(--baseline) * 0.75rem)',
        3.5: 'calc(var(--baseline) * 0.875rem)',
        4: 'calc(var(--baseline) * 1rem)',
        5: 'calc(var(--baseline) * 1.25rem)',
        6: 'calc(var(--baseline) * 1.5rem)',
        7: 'calc(var(--baseline) * 1.75rem)',
        8: 'calc(var(--baseline) * 2rem)',
        9: 'calc(var(--baseline) * 2.25rem)',
        10: 'calc(var(--baseline) * 2.5rem)',
        11: 'calc(var(--baseline) * 2.75rem)',
        12: 'calc(var(--baseline) * 3rem)',
        14: 'calc(var(--baseline) * 3.5rem)',
        16: 'calc(var(--baseline) * 4rem)'
      },
      fontFamily: {
        sans: ['brandon-grotesque', 'sans-serif']
      },
      fontSize: {
        xs: ['0.3125rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1.125rem', { lineHeight: '1.5rem' }],
        lg: ['1.375rem', { lineHeight: '1.75rem' }],
        xl: ['2rem', { lineHeight: '1.75rem' }],
        '2xl': ['3rem', { lineHeight: '2rem' }],
        '3xl': ['4rem', { lineHeight: '2.25rem' }]
      },
      fontWeight: {
        thin: '100',
        light: '300',
        normal: '400',
        medium: '500',
        bold: '700',
        black: '900'
      },
      keyframes: {
        pulseFade: {
          from: {
            opacity: 0.5,
            transform: 'scale3d(1, 1, 1)'
          },
          '50%': {
            opacity: 1,
            transform: 'scale3d(1.1, 1.1, 1.1)'
          },
          to: {
            opacity: 0.5,
            transform: 'scale3d(1, 1, 1)'
          }
        },
        spaceUpOut: {
          from: {
            opacity: 1,
            transformOrigin: '50% 0',
            transform: 'scale(1) translate(0%, 0%)'
          },
          to: {
            opacity: 0,
            transformOrigin: '50% 0',
            transform: 'scale(.2) translate(0%, -200%)'
          }
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};

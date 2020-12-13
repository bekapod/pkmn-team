import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --color-primary: #e84118;
    --color-primary-dark: #c23616;
    --color-secondary: #273c75;
    --color-secondary-dark: #192a56;
    --color-secondary-transparent: #273c7515;
    --color-selection: #fbc531;
    --color-tertiary: #fbc531;

    --color-gray: #7f8fa6;
    --color-gray-dark: #353b48;
    --color-gray-darker: #2f3640;
    --color-gray-light: #dcdde1;
    --color-white: #f5f6fa;

    --color-error: #e84118;

    --color-bug: #A8B820;
    --color-dark: #705848;
    --color-dragon: #7038F8;
    --color-electric: #F8D030;
    --color-fairy: #EE99AC;
    --color-fighting: #C03028;
    --color-fire: #F08030;
    --color-flying: #A890F0;
    --color-ghost: #705898;
    --color-grass: #78C850;
    --color-ground: #E0C068;
    --color-ice: #98D8D8;
    --color-normal: #A8A878;
    --color-poison: #A040A0;
    --color-psychic: #F85888;
    --color-rock: #B8A038;
    --color-shadow: #604E82;
    --color-steel: #B8B8D0;
    --color-unknown: #68A090;
    --color-water: #6890F0;

    --color-physical: #c23616;
    --color-special: #192a56;
    --color-status: #7f8fa6;

    --font-base: 'brandon-grotesque', sans-serif;

    --baseline: 1.5;
    line-height: var(--baseline);

    --font-size-base: 1.125rem;
    --font-size-xxs: 0.3125rem;
    --font-size-xs: 0.875rem;
    --font-size-sm: 1.125rem;
    --font-size-md: 1.375rem;
    --font-size-lg: 2rem;
    --font-size-xl: 3rem;
    --font-size-xxl: 4rem;

    --spacing-xxs: calc(var(--baseline) * 0.125rem);
    --spacing-xs: calc(var(--baseline) * 0.25rem);
    --spacing-sm: calc(var(--baseline) * 0.5rem);
    --spacing-md: calc(var(--baseline) * 1rem);
    --spacing-lg: calc(var(--baseline) * 2rem);
    --spacing-xl: calc(var(--baseline) * 3rem);
    --spacing-xxl: calc(var(--baseline) * 4rem);

    --gutter-grid: 32px;
    --gutter-page: 20px;
    --gutter-page-md: 40px;

    --border-radius: 0.75rem;
    --border-radius-sm: 0.25rem;

    --zig-zag: 2rem;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    overflow-x: hidden;
    color: var(--color-gray-dark);
    font-family: var(--font-base);
    font-weight: 400;
    line-height: var(----rhythm-unit);
    background-color: var(--color-gray-light);
    -webkit-font-smoothing: antialiased;
  }

  ::selection {
    background-color: var(--color-selection);
    color: var(--color-gray-dark);
  }

  body {
    margin: 0;
  }

  p {
    margin: var(--spacing-md) 0;
    font-size: var(--font-size-base);
    line-height: var(--spacing-md);
  }
`;

export const theme = {
  colors: {
    primary: '#0070f3'
  }
};

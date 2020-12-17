import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`

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

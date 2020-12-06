import React from 'react';
import { makeDecorator } from '@storybook/addons';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyles } from '../src/GlobalStyles';

const withTheme = makeDecorator({
  name: 'withTheme',
  parameterName: 'theme',
  wrapper: (Story, context) => (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Story {...context} />
      </ThemeProvider>
    </>
  )
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' }
};

export const decorators = [withTheme];

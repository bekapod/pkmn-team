import { css } from 'styled-components';
import type {
  DefaultTheme,
  FlattenInterpolation,
  Interpolation,
  ThemeProps
} from 'styled-components';

const sizes: { [key: string]: string } = {
  large: '(min-width: 1280px)',
  medium: '(min-width: 768px)',
  mediumOnly: '(min-width: 768px) and (max-width: 1279px)'
};

export const media = Object.keys(sizes).reduce(
  (
    accumulator: {
      [key: string]: <T>(
        ...args: Interpolation<ThemeProps<DefaultTheme> & T>[]
      ) => FlattenInterpolation<ThemeProps<DefaultTheme> & T>;
    },
    label
  ) => {
    const size = sizes[label];
    accumulator[label] = <T>(
      ...args: Interpolation<ThemeProps<DefaultTheme> & T>[]
    ) => css`
      @media ${size} {
        ${css({}, ...args)};
      }
    `;
    return accumulator;
  },
  {}
);

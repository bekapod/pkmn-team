import { css } from 'styled-components/macro';
import type {
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
      [key: string]: (
        ...args: Interpolation<ThemeProps<unknown>>[]
      ) => FlattenInterpolation<ThemeProps<unknown>>;
    },
    label
  ) => {
    const size = sizes[label];
    accumulator[label] = (...args: Interpolation<ThemeProps<unknown>>[]) => css`
      @media ${size} {
        ${css({}, ...args)};
      }
    `;
    return accumulator;
  },
  {}
);

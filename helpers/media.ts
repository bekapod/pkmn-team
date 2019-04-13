import { css } from "styled-components/macro";
import { BaseThemedCssFunction } from "styled-components";

const sizes: { [key: string]: string } = {
  large: "(min-width: 1280px)",
  medium: "(min-width: 768px)",
  mediumOnly: "(min-width: 768px) and (max-width: 1279px)"
};

export const media: {
  [key: string]: BaseThemedCssFunction<any>;
} = Object.keys(sizes).reduce((accumulator: { [key: string]: any }, label): {
  [key: string]: any;
} => {
  const size = sizes[label];
  accumulator[label] = (...args: any[]): any => css`
    @media ${size} {
      ${css({}, ...args)};
    }
  `;
  return accumulator;
}, {});

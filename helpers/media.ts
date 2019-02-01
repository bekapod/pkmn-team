import { css } from "styled-components/macro";

const sizes: { [key: string]: number } = {
  large: 1024,
  medium: 768
};

export const media: {
  [key: string]: (_: TemplateStringsArray) => TemplateStringsArray;
} = Object.keys(sizes).reduce((accumulator: { [key: string]: any }, label) => {
  const size = sizes[label];
  accumulator[label] = (...args: any[]) => css`
    @media (min-width: ${size}px) {
      ${css({}, ...args)};
    }
  `;
  return accumulator;
}, {});

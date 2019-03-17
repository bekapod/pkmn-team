import { css } from "styled-components/macro";

const sizes: { [key: string]: number } = {
  large: 1280,
  medium: 768
};

const standardMediaQueries: {
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

export const media = {
  ...standardMediaQueries,
  mediumOnly: (...args: any[]) => css`
    @media (min-width: ${sizes.medium}px) and (max-width: ${sizes.large -
        1}px) {
      ${css({}, ...args)};
    }
  `
};

// @flow
import { css } from "styled-components/macro";

const sizes = {
  large: 1024,
  medium: 768
};

/* eslint-disable no-param-reassign */
export const media = Object.keys(sizes).reduce((accumulator, label) => {
  const size = sizes[label];
  accumulator[label] = (...args: any) => css`
    @media (min-width: ${size}px) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});
/* eslint-enable no-param-reassign */

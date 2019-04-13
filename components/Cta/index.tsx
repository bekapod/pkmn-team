import { always, cond, T } from "lodash/fp";
import React, { ReactNode, ReactNodeArray } from "react";
import styled, { css } from "styled-components/macro";
import { radialIn } from "../../helpers/animations";
import * as variables from "../../helpers/variables";
import { lineHeight } from "../../helpers/verticalRhythm";
import { media } from "../../helpers/media";

interface Props {
  secondary?: boolean;
  small?: boolean;
  children: ReactNode | ReactNodeArray;
}

const not = (value: any): boolean => !value;

const styles = css`
  display: block;
  width: 100%;
  padding: ${({ small }: Props): string =>
    cond([
      [not, always(`${variables.spacing.md}px ${variables.spacing.lg}px`)],
      [T, always(`${variables.spacing.xs}px ${variables.spacing.md}px`)]
    ])(small)};
  color: ${variables.colors.white};
  font-family: ${variables.fonts.base};
  font-size: ${({ small }: Props): string =>
    cond([
      [not, always(`${variables.fontSizes.md}px`)],
      [T, always(`${variables.fontSizes.sm}px`)]
    ])(small)};
  font-weight: 900;
  line-height: ${lineHeight("md")};
  text-decoration: none;
  text-transform: uppercase;
  background-color: ${({ secondary }: Props): string =>
    cond([
      [not, always(variables.colors.primaryDark)],
      [T, always(variables.colors.secondaryDark)]
    ])(secondary)};
  border: none;
  border-radius: ${variables.sizes.borderRadius}px 0;
  ${radialIn};
  &::before {
    background-color: ${({ secondary }: Props): string =>
      cond([
        [not, always(variables.colors.primary)],
        [T, always(variables.colors.secondary)]
      ])(secondary)};
  }

  &[disabled] {
    &,
    &::before {
      background-color: ${variables.colors.gray};
    }
  }

  ${media.medium`
    width: auto;
  `}
`;

export const CtaInternalLink = styled(
  ({ secondary, small, ...props }: Props): JSX.Element => <a {...props} /> // eslint-disable-line jsx-a11y/anchor-has-content, @typescript-eslint/no-unused-vars
)`
  ${styles};
`;

export const CtaButton = styled.button`
  ${styles};
`;

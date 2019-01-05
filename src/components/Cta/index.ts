import styled, { css } from "styled-components/macro";
import { Link } from "react-router-dom";
import { cond, always, not, T } from "ramda";
import * as variables from "../../helpers/variables";
import { lineHeight } from "../../helpers/verticalRhythm";
import { radialIn } from "../../helpers/animations";

type Props = {
  secondary?: boolean,
  small?: boolean
};

const styles = css`
  margin: 0;
  padding: ${({ small }: Props) =>
    cond([
      [not, always(`${variables.spacing.md}px ${variables.spacing.lg}px`)],
      [T, always(`${variables.spacing.xs}px ${variables.spacing.md}px`)]
    ])(small)};
  color: ${variables.colors.white};
  font-family: ${variables.fonts.base};
  font-size: ${({ small }: Props) =>
    cond([
      [not, always(`${variables.fontSizes.md}px`)],
      [T, always(`${variables.fontSizes.sm}px`)]
    ])(small)};
  font-weight: 900;
  line-height: ${lineHeight("md")};
  text-decoration: none;
  text-transform: uppercase;
  background-color: ${({ secondary }: Props) =>
    cond([
      [not, always(variables.colors.primaryDark)],
      [T, always(variables.colors.secondaryDark)]
    ])(secondary)};
  border: none;
  border-radius: ${variables.sizes.borderRadius}px 0;
  ${radialIn};
  &::before {
    background-color: ${({ secondary }: Props) =>
      cond([
        [not, always(variables.colors.primary)],
        [T, always(variables.colors.secondary)]
      ])(secondary)};
  }
`;

export const CtaInternalLink = styled(Link)`
  ${styles};
`;

export const CtaButton = styled.button`
  ${styles};
`;

import { always, cond, not, T } from "ramda";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components/macro";
import { radialIn } from "../../helpers/animations";
import * as variables from "../../helpers/variables";
import { lineHeight } from "../../helpers/verticalRhythm";

interface IProps {
  secondary?: boolean;
  small?: boolean;
}

const styles = css`
  margin: 0;
  padding: ${({ small }: IProps) =>
    cond([
      [not, always(`${variables.spacing.md}px ${variables.spacing.lg}px`)],
      [T, always(`${variables.spacing.xs}px ${variables.spacing.md}px`)]
    ])(small)};
  color: ${variables.colors.white};
  font-family: ${variables.fonts.base};
  font-size: ${({ small }: IProps) =>
    cond([
      [not, always(`${variables.fontSizes.md}px`)],
      [T, always(`${variables.fontSizes.sm}px`)]
    ])(small)};
  font-weight: 900;
  line-height: ${lineHeight("md")};
  text-decoration: none;
  text-transform: uppercase;
  background-color: ${({ secondary }: IProps) =>
    cond([
      [not, always(variables.colors.primaryDark)],
      [T, always(variables.colors.secondaryDark)]
    ])(secondary)};
  border: none;
  border-radius: ${variables.sizes.borderRadius}px 0;
  ${radialIn};
  &::before {
    background-color: ${({ secondary }: IProps) =>
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

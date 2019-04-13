import { rgba } from "polished";
import React from "react";
import styled from "styled-components/macro";
import { pulseFade, spin } from "../../helpers/animations";
import * as variables from "../../helpers/variables";
import { lineHeight } from "../../helpers/verticalRhythm";

interface Props {
  spinner?: boolean;
  small?: boolean;
  color?: string;
}

const Styled = styled.div`
  animation: ${pulseFade} 2s linear infinite;
  margin: ${variables.spacing.xl}px 0;
  color: ${variables.colors.grayDark};
  font-family: ${variables.fonts.base};
  font-size: ${variables.fontSizes.md}px;
  font-weight: 700;
  letter-spacing: ${variables.spacing.xxs}px;
  line-height: ${lineHeight("md")};
  text-align: center;
  text-transform: uppercase;
`;

const StyledSpinner = styled.div`
  position: relative;
  border: ${({ small, color }: Props): string =>
    `${small ? "5px" : "10px"} solid ${rgba(
      color || variables.colors.secondary,
      0.15
    )}`};
  border-left: ${({ small, color }: Props): string =>
    `${small ? "5px" : "10px"} solid ${color || variables.colors.secondary}`};
  transform: translateZ(0);
  animation: ${spin} 1s linear infinite;

  &,
  &:after {
    width: ${({ small }: Props): number =>
      small ? variables.spacing.lg : variables.spacing.xl}px;
    height: ${({ small }: Props): number =>
      small ? variables.spacing.lg : variables.spacing.xl}px;
    border-radius: 50%;
  }
`;

const loadingText = "Loading";

const LoadingIcon = ({ spinner, ...props }: Props): JSX.Element =>
  spinner ? (
    <StyledSpinner
      data-testid="loading-spinner"
      role="img"
      aria-label={loadingText}
      {...props}
    />
  ) : (
    <Styled>{loadingText}</Styled>
  );

export default LoadingIcon;

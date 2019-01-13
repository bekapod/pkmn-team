import { rgba } from "polished";
import React from "react";
import styled from "styled-components/macro";
import { pulseFade, spin } from "../../helpers/animations";
import * as variables from "../../helpers/variables";
import { lineHeight } from "../../helpers/verticalRhythm";

interface IProps {
  spinner?: boolean;
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
  margin: ${variables.spacing.sm}px 0;
  font-size: ${variables.fontSizes.xxs}px;
  border: 1.5em solid ${rgba(variables.colors.secondary, 0.15)};
  border-left: 1.5em solid ${variables.colors.secondary};
  transform: translateZ(0);
  animation: ${spin} 1s linear infinite;

  &,
  &:after {
    width: 10em;
    height: 10em;
    border-radius: 50%;
  }
`;

const loadingText = "Loading";

const LoadingIcon = ({ spinner }: IProps) =>
  spinner ? (
    <StyledSpinner
      data-testid="loading-spinner"
      role="img"
      aria-label={loadingText}
    />
  ) : (
    <Styled>{loadingText}</Styled>
  );

export default LoadingIcon;

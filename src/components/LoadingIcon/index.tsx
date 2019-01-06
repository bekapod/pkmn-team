import React from "react";
import styled from "styled-components/macro";
import { pulseFade } from "../../helpers/animations";
import * as variables from "../../helpers/variables";
import { lineHeight } from "../../helpers/verticalRhythm";

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

const LoadingIcon = () => <Styled>Loading</Styled>;

export default LoadingIcon;

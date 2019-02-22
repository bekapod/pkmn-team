import React, { ReactNode, ReactNodeArray } from "react";
import styled from "styled-components/macro";
import * as variables from "../../helpers/variables";

interface Props {
  isBig?: boolean;
  children: ReactNode | ReactNodeArray;
}

const StyledError = styled.div`
  color: ${variables.colors.error};
  font-weight: 700;

  ${({ isBig }: Props) =>
    isBig
      ? `
    margin: ${variables.spacing.xl}px 0;
    font-size: ${variables.fontSizes.md}px;
    text-align: center;
  `
      : ""}

  &::before {
    content: "";
    width: 100%;
  }
`;

const ErrorMessage = ({ isBig, children }: Props): JSX.Element => (
  <StyledError isBig={isBig} role="alert">
    {children}
  </StyledError>
);

export default ErrorMessage;

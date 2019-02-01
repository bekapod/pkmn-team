import React, { ReactNode, ReactNodeArray } from "react";
import styled from "styled-components/macro";
import * as variables from "../../helpers/variables";

interface IProps {
  isBig?: boolean;
  children: ReactNode | ReactNodeArray;
}

const StyledError = styled.div`
  color: ${variables.colors.error};
  font-weight: 700;

  ${({ isBig }: IProps) =>
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

const ErrorMessage = ({ isBig, children }: IProps) => (
  <StyledError isBig={isBig} role="alert">
    {children}
  </StyledError>
);

export default ErrorMessage;

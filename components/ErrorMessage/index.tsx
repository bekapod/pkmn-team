import React, { ReactNode, ReactNodeArray } from "react";
import styled from "styled-components/macro";
import * as variables from "../../helpers/variables";

interface Props {
  isBig?: boolean;
  color?: string;
  children: ReactNode | ReactNodeArray;
}

const StyledError = styled.div`
  color: ${({ color }: Props) => color || variables.colors.error};
  font-weight: 400;

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

const ErrorMessage = ({ children, ...props }: Props): JSX.Element => (
  <StyledError role="alert" {...props}>
    {children}
  </StyledError>
);

export default ErrorMessage;

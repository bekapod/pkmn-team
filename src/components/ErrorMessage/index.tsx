import React, { ReactNode, ReactNodeArray } from "react";
import styled from "styled-components/macro";
import * as variables from "../../helpers/variables";

interface IProps {
  children: ReactNode | ReactNodeArray;
}

const StyledError = styled.div`
  color: ${variables.colors.error};
  font-weight: 700;

  &::before {
    content: "";
    width: 100%;
  }
`;

const ErrorMessage = ({ children }: IProps) => (
  <StyledError role="alert">{children}</StyledError>
);

export default ErrorMessage;

// @flow
import * as React from "react";
import styled from "styled-components/macro";
import * as variables from "../../helpers/variables";

type Props = {
  children: React.ChildrenArray<React.Element<*>> | string
};

const StyledError = styled.div`
  color: ${variables.colors.error};
  font-weight: 700;

  &::before {
    content: "";
    width: 100%;
  }
`;

const ErrorMessage = ({ children }: Props) => (
  <StyledError role="alert">{children}</StyledError>
);

export default ErrorMessage;

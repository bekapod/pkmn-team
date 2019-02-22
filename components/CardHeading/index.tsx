import React, { ReactNode, ReactNodeArray } from "react";
import styled from "styled-components/macro";
import * as variables from "../../helpers/variables";

interface Props {
  headingType?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: ReactNode | ReactNodeArray;
}

const CardHeading = styled(({ headingType = "h2", ...props }: Props) =>
  React.createElement(headingType, props)
)`
  overflow: hidden;
  margin: ${variables.spacing.lg}px 0;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default CardHeading;

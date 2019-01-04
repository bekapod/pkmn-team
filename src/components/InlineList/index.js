// @flow
import styled from "styled-components/macro";
import * as variables from "../../helpers/variables";

const InlineList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  list-style: none;

  & > * {
    margin-right: ${variables.spacing.sm}px;
  }
`;

export default InlineList;

import styled from "styled-components/macro";
import * as variables from "../../helpers/variables";

const Heading = styled.h1`
  margin-top: 0;
  padding: ${variables.spacing.md}px ${variables.gutters.page}px;
  color: ${variables.colors.white};
  background-color: ${variables.colors.secondary};
`;

export default Heading;

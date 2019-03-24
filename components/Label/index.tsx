import styled from "styled-components/macro";
import * as variables from "../../helpers/variables";
import { lineHeight } from "../../helpers/verticalRhythm";

const Label = styled.span`
  color: ${variables.colors.gray};
  font-size: ${variables.fontSizes.xs}px;
  font-weight: 900;
  line-height: ${lineHeight("xs")};
  text-transform: uppercase;
`;

export default Label;

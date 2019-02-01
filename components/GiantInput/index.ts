import styled from "styled-components/macro";
import * as variables from "../../helpers/variables";
import { lineHeight } from "../../helpers/verticalRhythm";
import TextInput from "../TextInput";

const GiantInput = styled(TextInput)`
  width: 100%;
  max-width: 600px;
  padding: 0 ${variables.spacing.md}px;
  height: ${variables.spacing.xl}px;
  font-size: ${variables.fontSizes.lg}px;
  line-height: ${lineHeight("lg")};
  text-align: center;
`;

export default GiantInput;

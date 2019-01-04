// @flow
import styled from "styled-components/macro";
import TextInput from "../TextInput";
import * as variables from "../../helpers/variables";
import { lineHeight } from "../../helpers/verticalRhythm";

const GiantInput = styled(TextInput)`
  width: 600px;
  max-width: 100%;
  padding: 0 ${variables.spacing.md}px;
  height: ${variables.spacing.xl}px;
  font-size: ${variables.fontSizes.lg}px;
  line-height: ${lineHeight("lg")};
  text-align: center;
`;

export default GiantInput;

import styled from "styled-components/macro";
import * as variables from "../../helpers/variables";
import { lineHeight } from "../../helpers/verticalRhythm";
import TextInput from "../TextInput";

interface Props {
  fullWidth?: boolean;
}

const GiantInput = styled(TextInput)`
  width: 100%;
  ${({ fullWidth }: Props) => (fullWidth ? "" : "max-width: 600px")};
  padding: 0 ${variables.spacing.md}px;
  height: ${variables.spacing.xl}px;
  font-size: ${variables.fontSizes.lg}px;
  line-height: ${lineHeight("lg")};
  text-align: center;
`;

export default GiantInput;

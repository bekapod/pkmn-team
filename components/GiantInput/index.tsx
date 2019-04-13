import styled from "styled-components/macro";
import { FlattenSimpleInterpolation } from "styled-components";
import * as variables from "../../helpers/variables";
import { lineHeight } from "../../helpers/verticalRhythm";
import TextInput from "../TextInput";
import { media } from "../../helpers/media";

interface Props {
  fullWidth?: boolean;
}

const GiantInput = styled(TextInput)`
  width: 100%;
  padding: 0 ${variables.spacing.md}px;
  height: ${variables.spacing.xl}px;
  font-size: ${variables.fontSizes.lg}px;
  line-height: ${lineHeight("lg")};
  text-align: center;

  ${({ fullWidth }: Props): string | FlattenSimpleInterpolation =>
    fullWidth ? "" : media.medium`max-width: 600px;`}
`;

export default GiantInput;

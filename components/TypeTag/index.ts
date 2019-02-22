import styled from "styled-components/macro";
import { getTypeColor } from "../../helpers/general";
import * as variables from "../../helpers/variables";
import { lineHeight } from "../../helpers/verticalRhythm";
import { Type } from "../../types"; // eslint-disable-line import/named

interface Props {
  type: Type;
}

const TypeTag = styled.span`
  padding: 0 ${variables.spacing.xs}px;
  color: ${variables.colors.white};
  font-size: ${variables.fontSizes.xs}px;
  font-weight: 700;
  line-height: ${lineHeight("xs")};
  text-shadow: 0 1px 0px ${variables.colors.grayDarker},
    1px 0 0px ${variables.colors.grayDark};
  text-transform: uppercase;
  background-color: ${({ type }: Props) => getTypeColor(type)};
  border-radius: ${variables.sizes.borderRadiusSm}px 0;
`;

export default TypeTag;

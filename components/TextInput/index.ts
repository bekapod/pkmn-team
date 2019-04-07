import { placeholder } from "polished";
import styled from "styled-components/macro";
import * as variables from "../../helpers/variables";
import { lineHeight } from "../../helpers/verticalRhythm";

interface Props {
  isInvalid?: boolean;
}

const TextInput = styled.input`
  width: 300px;
  padding: 0 ${variables.spacing.sm}px;
  font-family: ${variables.fonts.base};
  font-size: ${variables.fontSizes.base}px;
  font-weight: 900;
  line-height: ${lineHeight("base")};
  background-color: ${variables.colors.white};
  box-shadow: ${({ isInvalid }: Props) =>
    isInvalid
      ? `0 0 0 ${variables.spacing.xs}px ${variables.colors.error}`
      : "none"};
  border: none;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 ${variables.spacing.xs}px ${variables.colors.secondary};
  }

  ${placeholder({
    color: variables.colors.gray,
    "text-transform": "uppercase"
  })};
`;

export default TextInput;

import styled from "styled-components/macro";
import * as variables from "../../helpers/variables";

export const AutocompleteDropdown = styled.div`
  position: absolute;
  top: 100%;
  z-index: 1;
  width: 100%;
  height: calc(${variables.spacing.lg}px * 15);
  padding: calc(${variables.spacing.sm}px / 2) 0;
  overflow-y: scroll;
  background-color: ${variables.colors.white};
  box-shadow: 0 0 0 ${variables.spacing.xs}px ${variables.colors.secondary};
`;

const Autocomplete = styled.div`
  position: relative;
`;

export default Autocomplete;

import styled from "styled-components/macro";
import * as variables from "../../helpers/variables";

export const AutocompleteDropdown = styled.div`
  flex: 1;
  width: 100%;
  padding: calc(${variables.spacing.sm}px / 2) 0;
  overflow-y: scroll;
  background-color: ${variables.colors.white};
`;

const Autocomplete = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export default Autocomplete;

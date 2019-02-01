import styled from "styled-components/macro";
import * as variables from "../../helpers/variables";

export const AutocompleteDropdown = styled.div`
  flex: 1;
  width: 100%;
  background-color: ${variables.colors.white};

  > * {
    width: 100% !important;
  }
`;

const Autocomplete = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export default Autocomplete;

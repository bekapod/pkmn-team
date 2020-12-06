import styled from 'styled-components/macro';

export const AutocompleteDropdown = styled.div`
  flex: 1;
  width: 100%;
  background-color: var(--color-white);
  > * {
    width: 100% !important;
  }
`;

export const Autocomplete = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

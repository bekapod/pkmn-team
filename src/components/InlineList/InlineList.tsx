import styled from 'styled-components/macro';

export const InlineList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  list-style: none;

  & > * {
    margin-right: var(--spacing-md);
  }
`;

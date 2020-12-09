import styled from 'styled-components/macro';

export const InlineList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  list-style: none;

  & > *:not(:last-child) {
    margin-right: var(--spacing-sm);
  }
`;

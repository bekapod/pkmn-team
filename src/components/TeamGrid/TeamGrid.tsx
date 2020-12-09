import styled from 'styled-components/macro';

export const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: var(--gutter-grid);
  width: 100%;
`;

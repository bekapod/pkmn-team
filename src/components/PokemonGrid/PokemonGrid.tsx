import styled from 'styled-components/macro';
import { media } from '~lib/media';

export const PokemonGrid = styled.div`
  display: grid;
  grid-gap: var(--gutter-grid);
  grid-template-columns: repeat(1, 1fr);
  width: 100%;
  ${media.medium`
    grid-template-columns: repeat(2, 1fr);
  `};
  ${media.large`
    grid-template-columns: repeat(3, 1fr);
  `};
`;

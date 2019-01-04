// @flow
import styled from "styled-components/macro";
import * as variables from "../../helpers/variables";
import { media } from "../../helpers/media";

const PokemonGrid = styled.div`
  display: grid;
  grid-gap: ${variables.gutters.grid}px;
  grid-template-columns: repeat(1, 1fr);
  width: 100%;

  ${media.medium`
    grid-template-columns: repeat(2, 1fr);
  `};

  ${media.large`
    grid-template-columns: repeat(3, 1fr);
  `};
`;

export default PokemonGrid;

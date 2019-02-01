import styled from "styled-components/macro";
import * as variables from "../../helpers/variables";

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: ${variables.gutters.grid}px;
  width: 100%;
`;

export default CardGrid;

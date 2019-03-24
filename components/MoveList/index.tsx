import React from "react";
import styled from "styled-components/macro";
import { PokemonMove } from "../../types";
import { combineDuplicatePokemonMoves } from "../../helpers/general";
import MoveLine from "../MoveLine";
import * as variables from "../../helpers/variables";

interface Props {
  moves: PokemonMove[];
}

const List = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: ${variables.colors.white};
`;

const MoveList = ({ moves }: Props): JSX.Element => {
  const combinedMoves = combineDuplicatePokemonMoves(moves);

  return (
    <List>
      {combinedMoves.map(move => (
        <li key={move.name}>
          <MoveLine {...move} />
        </li>
      ))}
    </List>
  );
};

export default MoveList;

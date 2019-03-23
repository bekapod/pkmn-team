import React from "react";
import { PokemonMove } from "../../types";
import { combineDuplicatePokemonMoves } from "../../helpers/general";

interface Props {
  moves: PokemonMove[];
}

const MoveList = ({ moves }: Props): JSX.Element => {
  const combinedMoves = combineDuplicatePokemonMoves(moves);
  console.log(combinedMoves);
  return (
    <ul>
      {combinedMoves.map(move => (
        <li key={move.name}>
          <span>{move.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default MoveList;

import React, { useMemo } from "react";
import styled from "styled-components/macro";
import { FixedSizeList as List } from "react-window";
import { size } from "lodash/fp";
import { PokemonMove, DeduplicatedMove } from "../../types";
import { combineDuplicatePokemonMoves } from "../../helpers/general";
import MoveLine from "../MoveLine";
import * as variables from "../../helpers/variables";

interface Props {
  moves: PokemonMove[];
}

interface RowProps {
  data: DeduplicatedMove[];
  index: number;
  style: any;
}

const StyledList = styled(List)`
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: ${variables.colors.white};
`;

const Row = ({ data, index, style }: RowProps): JSX.Element => {
  const move = data[index];
  return (
    <MoveLine
      {...move}
      style={{
        ...style,
        top: `calc(${style.top}px + ${variables.spacing.xs}px)`
      }}
    />
  );
};

const MoveList = ({ moves }: Props): JSX.Element => {
  const combinedMoves = useMemo(() => combineDuplicatePokemonMoves(moves), [
    moves
  ]);
  const itemHeight = variables.spacing.xl;

  return (
    <StyledList
      height={itemHeight * 5}
      itemSize={itemHeight}
      itemCount={size(combinedMoves)}
      width={500}
      itemData={combinedMoves}
    >
      {Row}
    </StyledList>
  );
};

export default MoveList;

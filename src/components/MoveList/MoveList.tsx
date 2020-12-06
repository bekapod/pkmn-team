import { FunctionComponent, HTMLAttributes } from 'react';
import styled from 'styled-components/macro';
import { FixedSizeList as List } from 'react-window';
import { MoveLine } from '../MoveLine';
import { PokemonMove } from '~/generated/graphql';

export type MoveListProps = {
  moves: PokemonMove[];
};

type RowProps = {
  data: PokemonMove[];
  index: number;
  style: HTMLAttributes<HTMLElement>['style'];
};

const StyledList = styled(List)`
  width: auto !important;
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: var(--color-white);
`;

const Row = ({ data, index, style }: RowProps): JSX.Element => {
  const move = data[index];
  return (
    <MoveLine
      {...move.move}
      style={{
        ...style,
        top: `calc(${style?.top ?? 0}px + (var(--spacing-xs) / 2))`
      }}
    />
  );
};

export const MoveList: FunctionComponent<MoveListProps> = ({ moves }) => {
  const itemHeight = 72;

  return (
    <StyledList
      height={itemHeight * 10}
      itemSize={itemHeight}
      itemCount={moves.length}
      width={500}
      itemData={moves}
    >
      {Row}
    </StyledList>
  );
};

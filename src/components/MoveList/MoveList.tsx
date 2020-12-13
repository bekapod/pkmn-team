import {
  FunctionComponent,
  HTMLAttributes,
  useCallback,
  useRef,
  useState
} from 'react';
import styled from 'styled-components/macro';
import { VariableSizeList as List } from 'react-window';
import classNames from 'classnames';
import { MoveLine } from '../MoveLine';
import { Moves, Team_Member, Team_Member_Move } from '~/generated/graphql';
import { useContainerQuery } from '~/hooks/useContainerQuery';
import { CtaButton } from '../Cta';
import {
  add,
  compose,
  cond,
  constant,
  lte,
  multiply,
  size,
  stubTrue
} from 'lodash/fp';

export type MoveListProps = {
  moves: Moves[];
  highlightLearnedMoves?: boolean;
  visibleItems?: number;
  teamMember?: Team_Member;
  addMoveToTeamMember: (move: Moves) => void;
  removeMoveFromTeamMember: (move: Team_Member_Move) => void;
};

type RowProps = {
  data: Moves[];
  index: number;
  style: HTMLAttributes<HTMLElement>['style'];
};

const StyledList = styled(List)`
  width: 100% !important;
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: var(--color-white);
`;

const getTeamMemberMove = (
  teamMember: Team_Member,
  move: Moves
): Team_Member_Move | undefined =>
  teamMember.learned_moves.find(
    teamMemberMove => teamMemberMove.move.id === move.id
  );

const Row = ({
  teamMember,
  highlightLearnedMoves,
  itemStates,
  onItemStateChange,
  addMoveToTeamMember,
  removeMoveFromTeamMember
}: {
  teamMember?: Team_Member;
  highlightLearnedMoves: boolean;
  itemStates: boolean[];
  onItemStateChange: (index: number, isOpen: boolean) => void;
  addMoveToTeamMember: (move: Moves) => void;
  removeMoveFromTeamMember: (move: Team_Member_Move) => void;
}) => ({ data, index, style }: RowProps): JSX.Element => {
  const move = data[index];
  const teamMemberMove = teamMember && getTeamMemberMove(teamMember, move);

  const renderLineActions = () => (
    <>
      {!!teamMember &&
        (!!teamMemberMove ? (
          <CtaButton
            type="button"
            size="tiny"
            onClick={() => removeMoveFromTeamMember(teamMemberMove)}
          >
            Forget
          </CtaButton>
        ) : (
          <CtaButton
            type="button"
            size="tiny"
            onClick={() => addMoveToTeamMember(move)}
          >
            Learn
          </CtaButton>
        ))}
      <CtaButton
        type="button"
        size="tiny"
        secondary
        onClick={() => onItemStateChange(index, !itemStates[index])}
      >
        Details
      </CtaButton>
    </>
  );

  return (
    <MoveLine
      {...move}
      isOpen={itemStates[index]}
      isHighlighted={highlightLearnedMoves && !!teamMemberMove}
      style={{
        ...style,
        top: `calc(${style?.top ?? 0}px + (var(--spacing-xs) / 2))`
      }}
      renderLineActions={renderLineActions}
    />
  );
};

const query = {
  'is-compressed-list': {
    minWidth: 0,
    maxWidth: 440
  },
  'is-spacious-list': {
    minWidth: 560
  }
};

export const MoveList: FunctionComponent<MoveListProps> = ({
  moves,
  visibleItems = 4,
  teamMember,
  highlightLearnedMoves = false,
  addMoveToTeamMember,
  removeMoveFromTeamMember
}) => {
  const listRef = useRef<List>(null);
  const [ref, className] = useContainerQuery(query);
  const [itemStates, setItemState] = useState<boolean[]>(
    new Array(moves.length).fill(false)
  );

  const itemHeight = className.includes('is-compressed-list') ? 96 : 72;
  const hasOverflowingItems = compose(lte(visibleItems), size);

  const getItemHeight = (index: number) => {
    const itemIsOpen = itemStates[index];
    if (itemIsOpen) return itemHeight * 1.85;
    return itemHeight;
  };

  const listHeight = cond([
    [hasOverflowingItems, constant(multiply(itemHeight, visibleItems))],
    [
      stubTrue,
      constant(
        moves.reduce((acc, curr, idx) => add(getItemHeight(idx), acc), 0)
      )
    ]
  ])(moves);

  const onItemStateChange = useCallback((index, isOpen) => {
    setItemState(val =>
      val.map((currentState, itemIndex) => {
        if (itemIndex === index) return isOpen;
        return currentState;
      })
    );
  }, []);

  return (
    <div ref={ref as never}>
      <StyledList
        ref={listRef}
        className={classNames(className)}
        height={listHeight}
        itemSize={getItemHeight}
        itemCount={moves.length}
        width={500}
        itemData={moves}
        css={`
          ${!hasOverflowingItems(moves) ? 'overflow: hidden !important;' : ''}
        `}
      >
        {Row({
          teamMember,
          highlightLearnedMoves,
          itemStates,
          onItemStateChange,
          addMoveToTeamMember,
          removeMoveFromTeamMember
        })}
      </StyledList>
    </div>
  );
};

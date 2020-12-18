import {
  FunctionComponent,
  HTMLAttributes,
  useCallback,
  useRef,
  useState
} from 'react';
import { VariableSizeList as List } from 'react-window';
import classNames from 'classnames';
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
import { MoveLine } from '../MoveLine';
import { Moves, Team_Member, Team_Member_Move } from '~/generated/graphql';
import { useContainerQuery } from '~/hooks/useContainerQuery';
import { CtaButton } from '../Cta';
import styles from './MoveList.module.css';

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
        top: `calc(${style?.top ?? 0}px + (var(--spacing-2) / 2))`
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

  const itemHeight = className.includes('is-compressed-list') ? 96 : 84;
  const hasOverflowingItems = compose(lte(visibleItems), size);

  const getItemHeight = (index: number) => {
    const itemIsOpen = itemStates[index];
    if (itemIsOpen) return itemHeight * 2;
    return itemHeight;
  };

  const listHeight = cond([
    [hasOverflowingItems, constant(multiply(itemHeight, visibleItems))],
    [
      stubTrue,
      constant(
        moves.reduce((acc, _curr, idx) => add(getItemHeight(idx), acc), 0)
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
      <List
        ref={listRef}
        className={classNames(styles.list, className, {
          [styles['has-overflow']]: hasOverflowingItems(moves)
        })}
        height={listHeight}
        itemSize={getItemHeight}
        itemCount={moves.length}
        width={500}
        itemData={moves}
      >
        {Row({
          teamMember,
          highlightLearnedMoves,
          itemStates,
          onItemStateChange,
          addMoveToTeamMember,
          removeMoveFromTeamMember
        })}
      </List>
    </div>
  );
};

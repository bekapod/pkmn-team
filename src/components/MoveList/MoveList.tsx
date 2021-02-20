import {
  ComponentPropsWithoutRef,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import {
  ListChildComponentProps,
  VariableSizeList as List
} from 'react-window';
import classNames from 'classnames';
import {
  add,
  compose,
  cond,
  constant,
  lt,
  multiply,
  size,
  stubTrue
} from 'lodash/fp';
import { MoveLine } from '../MoveLine';
import {
  MoveFragmentFragment,
  TeamMemberFragmentFragment,
  TeamMemberMoveFragmentFragment
} from '~/generated/graphql';
import { useContainerQuery } from '~/hooks/useContainerQuery';
import { CtaButton } from '../Cta';

export type MoveListProps = ComponentPropsWithoutRef<'div'> & {
  moves: MoveFragmentFragment[];
  highlightLearnedMoves?: boolean;
  visibleItems?: number;
  teamMember?: TeamMemberFragmentFragment;
  updateTeamMemberMove?: (
    member: TeamMemberFragmentFragment,
    moveId: MoveFragmentFragment['id']
  ) => void;
  removeMoveFromTeamMember?: (
    member: TeamMemberFragmentFragment,
    moveId: MoveFragmentFragment['id']
  ) => void;
};

type RowProps = ListChildComponentProps & {
  data: {
    move: MoveFragmentFragment;
    teamMember?: MoveListProps['teamMember'];
    highlightLearnedMoves: MoveListProps['highlightLearnedMoves'];
    itemStates: boolean;
    isCompressed: boolean;
    isSpacious: boolean;
    onItemStateChange: (index: number, isOpen: boolean) => void;
    updateTeamMemberMove?: MoveListProps['updateTeamMemberMove'];
    removeMoveFromTeamMember: MoveListProps['removeMoveFromTeamMember'];
  }[];
};

const getTeamMemberMove = (
  teamMember: TeamMemberFragmentFragment,
  move: MoveFragmentFragment
): TeamMemberMoveFragmentFragment | undefined =>
  teamMember.learned_moves.find(
    teamMemberMove => teamMemberMove.move.id === move.id
  );

const Row = ({ data, index, style }: RowProps): JSX.Element => {
  const {
    move,
    teamMember,
    highlightLearnedMoves,
    isOpen,
    isCompressed,
    isSpacious,
    onItemStateChange,
    updateTeamMemberMove,
    removeMoveFromTeamMember
  } = data[index];
  const teamMemberMove = teamMember && getTeamMemberMove(teamMember, move);

  const renderLineActions = () => (
    <>
      {!!teamMember &&
        (!!teamMemberMove ? (
          <CtaButton
            type="button"
            size="tiny"
            variant="destructive"
            aria-label={`Forget ${move.name}`}
            onClick={() => removeMoveFromTeamMember?.(teamMember, move.id)}
          >
            Forget
          </CtaButton>
        ) : (
          <CtaButton
            type="button"
            size="tiny"
            variant="primary"
            aria-label={`Learn ${move.name}`}
            onClick={() => updateTeamMemberMove?.(teamMember, move.id)}
          >
            Learn
          </CtaButton>
        ))}
      <CtaButton
        type="button"
        size="tiny"
        variant="tertiary"
        onClick={() => onItemStateChange(index, !isOpen)}
      >
        Details
      </CtaButton>
    </>
  );

  return (
    <MoveLine
      {...move}
      isOpen={isOpen}
      isHighlighted={highlightLearnedMoves && !!teamMemberMove}
      isCompressed={isCompressed}
      isSpacious={isSpacious}
      style={{
        ...style,
        top: `calc(${style?.top}px + (var(--spacing-2) / 2))`
      }}
      renderLineActions={renderLineActions}
      data-testid="move-list-item"
    />
  );
};

const query = {
  'is-compressed-list': {
    minWidth: 0,
    maxWidth: 440
  }
};

export const MoveList: FunctionComponent<MoveListProps> = ({
  moves,
  visibleItems = 4,
  teamMember,
  highlightLearnedMoves = false,
  updateTeamMemberMove,
  removeMoveFromTeamMember,
  ...props
}) => {
  const listRef = useRef<List>(null);
  const [ref, className] = useContainerQuery(query);
  const [itemStates, setItemState] = useState<boolean[]>(
    new Array(moves.length).fill(false)
  );

  const itemHeight = className.includes('is-compressed-list') ? 126 : 84;
  const hasOverflowingItems = compose(lt(visibleItems), size);
  const isCompressed = className.includes('is-compressed-list');
  const isSpacious = className.includes('is-spacious-list');

  useEffect(() => {
    listRef.current?.resetAfterIndex(0, false);
  }, [itemHeight]);

  const getItemHeight = useCallback(
    (index: number) => {
      const itemIsOpen = itemStates[index];
      if (itemIsOpen) return itemHeight * 2.2;
      return itemHeight;
    },
    [itemHeight, itemStates]
  );

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
    listRef.current?.resetAfterIndex(index, false);
  }, []);

  const itemData = useMemo(
    () =>
      moves.map((move, idx) => ({
        move,
        teamMember,
        highlightLearnedMoves,
        isOpen: itemStates[idx],
        isCompressed,
        isSpacious,
        onItemStateChange,
        updateTeamMemberMove,
        removeMoveFromTeamMember
      })),
    [
      teamMember,
      highlightLearnedMoves,
      isCompressed,
      isSpacious,
      itemStates,
      moves,
      onItemStateChange,
      removeMoveFromTeamMember,
      updateTeamMemberMove
    ]
  );

  return (
    <div ref={ref as never} data-testid="move-list" {...props}>
      <List
        ref={listRef}
        className={classNames('w-full!', 'bg-white', className, {
          'overflow-hidden!': !hasOverflowingItems(moves)
        })}
        height={listHeight}
        itemSize={getItemHeight}
        itemCount={itemData.length}
        width={500}
        itemData={itemData}
      >
        {Row}
      </List>
    </div>
  );
};

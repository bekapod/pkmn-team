import {
  ComponentPropsWithoutRef,
  Dispatch,
  forwardRef,
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
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from 'react-beautiful-dnd';
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
import { Action, MoveActionType, useMoves } from '~/hooks/useMoves';

export type MoveListProps = ComponentPropsWithoutRef<'div'> & {
  allMoves?: MoveFragmentFragment[];
  highlightLearnedMoves?: boolean;
  visibleItems?: number;
  teamMember?: TeamMemberFragmentFragment;
};

type RowProps = ListChildComponentProps & {
  data: {
    move: MoveFragmentFragment;
    teamMember?: MoveListProps['teamMember'];
    highlightLearnedMoves: MoveListProps['highlightLearnedMoves'];
    isOpen: boolean;
    isCompressed: boolean;
    isSpacious: boolean;
    onItemStateChange: (index: number, isOpen: boolean) => void;
    dispatch: Dispatch<Action>;
  }[];
};

const getTeamMemberMove = (
  teamMember: TeamMemberFragmentFragment,
  move: MoveFragmentFragment
): TeamMemberMoveFragmentFragment | undefined =>
  teamMember.learned_moves.find(
    teamMemberMove => teamMemberMove.move.id === move.id
  );

const Row = forwardRef(
  (
    { data, index, style, isScrolling, ...rest }: RowProps,
    ref
  ): JSX.Element => {
    const {
      move,
      teamMember,
      highlightLearnedMoves,
      isOpen,
      isCompressed,
      isSpacious,
      onItemStateChange,
      dispatch
    } = data[index];
    const teamMemberMove = teamMember && getTeamMemberMove(teamMember, move);

    const renderLineActions = useCallback(
      () => (
        <>
          {!!teamMemberMove ? (
            <CtaButton
              type="button"
              size="tiny"
              variant="destructive"
              aria-label={`Forget ${move.name}`}
              onClick={() =>
                dispatch({
                  type: MoveActionType.RemoveMove,
                  payload: move
                })
              }
            >
              Forget
            </CtaButton>
          ) : (
            <CtaButton
              type="button"
              size="tiny"
              variant="primary"
              aria-label={`Learn ${move.name}`}
              onClick={() =>
                dispatch({
                  type: MoveActionType.AddMove,
                  payload: move
                })
              }
            >
              Learn
            </CtaButton>
          )}
          <CtaButton
            type="button"
            size="tiny"
            variant="tertiary"
            onClick={() => onItemStateChange(index, !isOpen)}
          >
            Details
          </CtaButton>
        </>
      ),
      [index, isOpen, teamMemberMove, move, onItemStateChange, dispatch]
    );

    return (
      <MoveLine
        {...move}
        ref={ref}
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
        {...rest}
      />
    );
  }
);

const query = {
  'is-compressed-list': {
    minWidth: 0,
    maxWidth: 440
  }
};

export const MoveList: FunctionComponent<MoveListProps> = ({
  allMoves,
  visibleItems = 4,
  teamMember,
  highlightLearnedMoves = false,
  ...props
}) => {
  const listRef = useRef<List>(null);
  const [teamMemberMoves, dispatch] = useMoves();
  const moves = allMoves ? allMoves : teamMemberMoves;
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

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) {
        return;
      }

      if (result.destination.droppableId === 'move-list') {
        if (!moves?.[result.source.index]) {
          return;
        }

        dispatch({
          type: MoveActionType.ReorderMove,
          payload: {
            sourceIndex: result.source.index,
            destinationIndex: result.destination.index
          }
        });
      }
    },
    [moves, dispatch]
  );

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
        dispatch
      })),
    [
      teamMember,
      highlightLearnedMoves,
      isCompressed,
      isSpacious,
      itemStates,
      moves,
      onItemStateChange,
      dispatch
    ]
  );

  return (
    <div ref={ref as never} data-testid="move-list" {...props}>
      {allMoves && (
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
      )}

      {!allMoves && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="move-list" direction="vertical">
            {droppableProvided => (
              <div
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                <div
                  className={classNames('w-full!', 'bg-white', className, {
                    'overflow-hidden!': !hasOverflowingItems(moves)
                  })}
                >
                  {itemData.map((data, idx) => (
                    <Draggable
                      key={data.move.id}
                      draggableId={data.move.id}
                      index={idx}
                    >
                      {draggableProvided => (
                        <Row
                          data={itemData}
                          {...draggableProvided.draggableProps}
                          {...draggableProvided.dragHandleProps}
                          ref={draggableProvided.innerRef}
                          index={idx}
                          style={{
                            ...draggableProvided.draggableProps.style
                          }}
                        />
                      )}
                    </Draggable>
                  ))}

                  {droppableProvided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

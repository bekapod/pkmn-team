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
import add from 'lodash/fp/add';
import compose from 'lodash/fp/compose';
import cond from 'lodash/fp/cond';
import constant from 'lodash/fp/constant';
import lt from 'lodash/fp/lt';
import multiply from 'lodash/fp/multiply';
import size from 'lodash/fp/size';
import stubTrue from 'lodash/fp/stubTrue';
import { MoveLine } from '../MoveLine';
import {
  PokemonMoveFragment,
  TeamMemberFragment,
  TeamMemberMoveFragment
} from '~/generated/graphql';
import { useContainerQuery } from '~/hooks/useContainerQuery';
import { CtaButton } from '../Cta';
import { Action, MoveActionType, useMoves } from '~/hooks/useMoves';

export type MoveListProps = ComponentPropsWithoutRef<'div'> & {
  allMoves?: PokemonMoveFragment[];
  highlightLearnedMoves?: boolean;
  visibleItems?: number;
  teamMember?: TeamMemberFragment;
};

type RowData = {
  move: PokemonMoveFragment | TeamMemberMoveFragment;
  teamMember?: MoveListProps['teamMember'];
  highlightLearnedMoves: MoveListProps['highlightLearnedMoves'];
  isOpen: boolean;
  isCompressed: boolean;
  isSpacious: boolean;
  onItemStateChange: (index: number, isOpen: boolean) => void;
  dispatch: Dispatch<Action>;
};

type RowProps = ListChildComponentProps<RowData[]>;

const getTeamMemberMove = (
  teamMember: TeamMemberFragment,
  move: PokemonMoveFragment
) =>
  teamMember.moves.edges?.find(
    teamMemberMove => teamMemberMove?.node?.id === move.node?.id
  );

// eslint-disable-next-line react/display-name
const Row = forwardRef<HTMLDivElement, RowProps>(
  ({ data, index, style, isScrolling, ...rest }, ref) => {
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
    const teamMemberMove =
      teamMember && getTeamMemberMove(teamMember, move as PokemonMoveFragment);

    const renderLineActions = useCallback(
      () => (
        <>
          {teamMember &&
            (!!teamMemberMove ? (
              <CtaButton
                type="button"
                size="tiny"
                variant="destructive"
                aria-label={`Forget ${move.node?.name}`}
                onClick={() =>
                  dispatch({
                    type: MoveActionType.RemoveMove,
                    payload: teamMemberMove
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
                aria-label={`Learn ${move.node?.name}`}
                onClick={() =>
                  dispatch({
                    type: MoveActionType.AddMove,
                    payload: move as PokemonMoveFragment
                  })
                }
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
      ),
      [
        index,
        isOpen,
        teamMember,
        teamMemberMove,
        move,
        onItemStateChange,
        dispatch
      ]
    );

    return move.node ? (
      <MoveLine
        {...move.node}
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
    ) : null;
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
      if (itemIsOpen) return itemHeight * 2;
      return itemHeight;
    },
    [itemHeight, itemStates]
  );

  const listHeight = cond([
    [hasOverflowingItems, constant(multiply(itemHeight, visibleItems))],
    [
      stubTrue,
      constant(
        (moves as unknown[]).reduce(
          (acc: number, _curr, idx) => add(getItemHeight(idx), acc),
          0
        )
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
                    'overflow-hidden! pt-1': !hasOverflowingItems(moves)
                  })}
                >
                  {itemData
                    .filter(({ move: { node } }) => !!node)
                    .map((data, idx) => (
                      <Draggable
                        key={data.move.node?.id}
                        draggableId={data.move.node?.id as string}
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

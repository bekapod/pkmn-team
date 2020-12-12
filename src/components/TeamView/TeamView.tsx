/* eslint-disable @typescript-eslint/no-empty-function */
import {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from 'react-beautiful-dnd';
import wait from 'waait';
import { BiTrash as Trash } from 'react-icons/bi';
import { v4 as uuid } from 'uuid';
import { PokemonSearch } from '../PokemonSearch';
import { CtaButton } from '../Cta';
import { MoveList } from '../MoveList';
import { PokemonCard } from '../PokemonCard';
import { PokemonLine } from '../PokemonLine';
import { useTabs } from '../../hooks/useTabs';
import {
  TabBar,
  TabScroller,
  TabItem,
  AddButton,
  Bin,
  TabContent
} from './styled';
import { Pokemon, Team_Member } from '~/generated/graphql';
import { TeamMemberActionType, useTeamMembersReducer } from './reducer';

export type TeamViewProps = {
  initialTeamMembers?: Team_Member[];
  allPokemon: Pokemon[];
  updateTeamMembers: (members: Team_Member[]) => void;
};

const onDragStart = () => {
  document.body.classList.add('is-dragging');
};

export const TeamView: FunctionComponent<TeamViewProps> = ({
  updateTeamMembers,
  initialTeamMembers = [],
  allPokemon
}) => {
  const isInitialValue = useRef(true);
  const [teamMembers, dispatch] = useTeamMembersReducer(initialTeamMembers);
  const [currentSearchPokemon, setCurrentSearchPokemon] = useState<
    Pokemon | undefined
  >();
  const [deletedItems, setDeletedItems] = useState<Team_Member[]>([]);
  const { getTabItemProps, getTabContentProps } = useTabs();

  useEffect(() => {
    if (!isInitialValue.current) {
      updateTeamMembers(teamMembers);
    }

    isInitialValue.current = false;
  }, [teamMembers, updateTeamMembers]);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) {
        document.body.classList.remove('is-dragging');
        return;
      }

      if (result.destination.droppableId === 'teamview-tabs') {
        if (!teamMembers?.[result.source.index]) {
          return;
        }

        dispatch({
          type: TeamMemberActionType.ReorderTeamMember,
          payload: {
            sourceIndex: result.source.index,
            destinationIndex: result.destination.index
          }
        });

        document.body.classList.remove('is-dragging');
      }

      if (result.destination.droppableId === 'teamview-bin') {
        const binnedMember = teamMembers[result.source.index];

        if (binnedMember) {
          setDeletedItems(val => [...val, binnedMember]);
          dispatch({
            type: TeamMemberActionType.RemoveTeamMember,
            payload: binnedMember
          });
        }
      }
    },
    [dispatch, teamMembers]
  );

  const emptyBin = useCallback(async () => {
    document.body.classList.remove('is-dragging');
    await wait(250);
    setDeletedItems([]);
  }, []);

  const renderCardActions = useCallback(
    ({
      teamMember,
      pokemon
    }: {
      teamMember?: Team_Member;
      pokemon: Pokemon;
    }) => {
      if (teamMember) {
        return () => (
          <CtaButton
            type="button"
            size="small"
            onClick={() =>
              dispatch({
                type: TeamMemberActionType.RemoveTeamMember,
                payload: teamMember
              })
            }
          >{`Remove ${pokemon.name} from team`}</CtaButton>
        );
      }

      return () => (
        <CtaButton
          type="button"
          size="small"
          onClick={() =>
            dispatch({
              type: TeamMemberActionType.AddTeamMember,
              payload: {
                id: uuid(),
                pokemon: pokemon,
                order: teamMembers.length,
                learned_moves: []
              }
            })
          }
        >{`Add ${pokemon.name} to team`}</CtaButton>
      );
    },
    [dispatch, teamMembers]
  );

  const addPokemonTabItemProps = getTabItemProps('add-pokemon');
  const addPokemonTabContentProps = getTabContentProps('add-pokemon');

  return (
    <>
      <TabBar>
        <DragDropContext onBeforeDragStart={onDragStart} onDragEnd={onDragEnd}>
          <Droppable droppableId="teamview-tabs" direction="horizontal">
            {droppableProvided => (
              <div
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                <TabScroller>
                  {teamMembers.map(({ id, pokemon }, index) => {
                    const tabItemProps = getTabItemProps(id);
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {draggableProvided => (
                          <TabItem
                            {...tabItemProps}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                            ref={draggableProvided.innerRef}
                            data-testid={`tab-item-${id}`}
                            style={{
                              ...draggableProvided.draggableProps.style
                            }}
                          >
                            <PokemonLine pokemon={pokemon} />
                          </TabItem>
                        )}
                      </Draggable>
                    );
                  })}

                  {teamMembers.length < 6 && (
                    <Draggable
                      key="Add new Pokemon"
                      draggableId="Add new Pokemon"
                      index={teamMembers.length}
                      isDragDisabled
                    >
                      {draggableProvided => (
                        <TabItem
                          {...addPokemonTabItemProps}
                          {...draggableProvided.draggableProps}
                          {...draggableProvided.dragHandleProps}
                          ref={draggableProvided.innerRef}
                          data-testid="tab-item-add-pokemon"
                          data-add-button
                          style={{
                            ...draggableProvided.draggableProps.style
                          }}
                        >
                          <AddButton aria-label="Add new pokemon to team">
                            +
                          </AddButton>
                        </TabItem>
                      )}
                    </Draggable>
                  )}

                  {droppableProvided.placeholder}
                </TabScroller>
              </div>
            )}
          </Droppable>

          <Droppable droppableId="teamview-bin" direction="horizontal">
            {(droppableProvided, droppableSnapshot) => (
              <Bin
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
                data-bin
                css={`
                  width: calc(100% / ${teamMembers.length + 1});

                  ${droppableSnapshot.isDraggingOver
                    ? `
                  --background: var(--color-primary-dark);
                        --color: var(--color-white);
                `
                    : ''}
                `}
              >
                {droppableProvided.placeholder}
                <span className="zig-zag-helper" />
                <Trash />

                {deletedItems.map(({ id, pokemon }) => (
                  <TabItem
                    key={id}
                    aria-selected={false}
                    data-testid={`binned-item-${id}`}
                    data-binned-item
                    onAnimationEnd={emptyBin}
                  >
                    <PokemonLine pokemon={pokemon} />
                  </TabItem>
                ))}
              </Bin>
            )}
          </Droppable>
        </DragDropContext>
      </TabBar>

      {teamMembers.map(member => {
        const tabContentProps = getTabContentProps(member.id);
        return (
          <TabContent
            {...tabContentProps}
            key={member.id}
            data-testid={`tab-content-${member.id}`}
          >
            <PokemonCard
              teamMember={member}
              pokemon={member.pokemon}
              moves={member.learned_moves.map(({ move }) => move)}
              renderCardActions={renderCardActions({
                teamMember: member,
                pokemon: member.pokemon
              })}
            />
            <MoveList
              moves={member.pokemon.learnable_moves.map(({ move }) => move)}
              visibleItems={10}
              highlightLearnedMoves
              addMoveToTeamMember={() => {}}
              removeMoveFromTeamMember={() => {}}
            />
          </TabContent>
        );
      })}

      {teamMembers.length < 6 && (
        <TabContent
          {...addPokemonTabContentProps}
          key="Pokemon search"
          data-testid="tab-content-add-pokemon"
        >
          <PokemonSearch
            setCurrentSearchPokemon={setCurrentSearchPokemon}
            pokemon={allPokemon}
          />
          {currentSearchPokemon ? (
            <PokemonCard
              pokemon={currentSearchPokemon}
              renderCardActions={renderCardActions({
                pokemon: currentSearchPokemon
              })}
            />
          ) : null}
        </TabContent>
      )}
    </>
  );
};

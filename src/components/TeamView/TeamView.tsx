/* eslint-disable @typescript-eslint/no-empty-function */
import {
  FunctionComponent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import isEqual from 'react-fast-compare';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from 'react-beautiful-dnd';
import { BiPlusMedical as Plus } from 'react-icons/bi';
import { v4 as uuid } from 'uuid';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { PokemonSearch } from '../PokemonSearch';
import { CtaButton } from '../Cta';
import { MoveList } from '../MoveList';
import { PokemonCard } from '../PokemonCard';
import { PokemonLine } from '../PokemonLine';
import { useTabs } from '../../hooks/useTabs';
import { Pokemon, Team_Member } from '~/generated/graphql';
import { TeamMemberActionType, useTeamMembersReducer } from './reducer';
import styles from './TeamView.module.css';

export type TeamViewProps = {
  initialTeamMembers?: Team_Member[];
  allPokemon?: Pokemon[];
  updateTeamMembers?: (members: Team_Member[]) => void;
  isSkeleton?: boolean;
};

const onDragStart = () => {
  document.body.classList.add('is-dragging');
};

export const TeamView: FunctionComponent<TeamViewProps> = memo(
  ({ updateTeamMembers, initialTeamMembers = [], allPokemon, isSkeleton }) => {
    const isInitialValue = useRef(true);
    const [teamMembers, dispatch] = useTeamMembersReducer(initialTeamMembers);
    const [currentSearchPokemon, setCurrentSearchPokemon] = useState<
      Pokemon | undefined
    >();
    const { getTabItemProps, getTabContentProps, setSelectedTab } = useTabs(
      initialTeamMembers?.[0]?.id ?? 'add-pokemon'
    );

    useEffect(() => {
      if (!isSkeleton && initialTeamMembers.length > 0)
        setSelectedTab(initialTeamMembers[0].id);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSkeleton]);

    useEffect(() => {
      if (!isInitialValue.current) {
        updateTeamMembers?.(teamMembers);
      }

      isInitialValue.current = false;
    }, [teamMembers, updateTeamMembers]);

    useDeepCompareEffect(() => {
      dispatch({
        type: TeamMemberActionType.ResetTeamMembers,
        payload: initialTeamMembers
      });
    }, [initialTeamMembers]);

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
      },
      [dispatch, teamMembers]
    );

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
              variant="destructive"
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
            variant="secondary"
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
        <div className={styles['tab-bar']} aria-busy={isSkeleton}>
          <DragDropContext
            onBeforeDragStart={onDragStart}
            onDragEnd={onDragEnd}
          >
            <Droppable droppableId="teamview-tabs" direction="horizontal">
              {droppableProvided => (
                <div
                  {...droppableProvided.droppableProps}
                  ref={droppableProvided.innerRef}
                >
                  <div className={styles['tab-scroller']}>
                    {teamMembers.map(({ id, pokemon }, index) => {
                      const tabItemProps = getTabItemProps(id);
                      return (
                        <Draggable key={id} draggableId={id} index={index}>
                          {draggableProvided => (
                            <div
                              className={styles['tab-item']}
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
                            </div>
                          )}
                        </Draggable>
                      );
                    })}

                    {teamMembers.length < 6 && !isSkeleton && (
                      <Draggable
                        key="Add new Pokemon"
                        draggableId="Add new Pokemon"
                        index={teamMembers.length}
                        isDragDisabled
                      >
                        {draggableProvided => (
                          <div
                            className={styles['tab-item']}
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
                            <span
                              className={styles['add-button']}
                              aria-label="Add new pokemon to team"
                            >
                              <Plus className={styles['add-icon']} />
                            </span>
                          </div>
                        )}
                      </Draggable>
                    )}

                    {droppableProvided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        {teamMembers.map(member => {
          const tabContentProps = getTabContentProps(member.id);
          return (
            <div
              className={styles['tab-content']}
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
            </div>
          );
        })}

        {teamMembers.length < 6 && (
          <div
            className={styles['tab-content']}
            {...addPokemonTabContentProps}
            key="Pokemon search"
            data-testid="tab-content-add-pokemon"
            aria-busy={isSkeleton}
          >
            {allPokemon && (
              <PokemonSearch
                setCurrentSearchPokemon={setCurrentSearchPokemon}
                pokemon={allPokemon}
              />
            )}
            {currentSearchPokemon ? (
              <PokemonCard
                pokemon={currentSearchPokemon}
                renderCardActions={renderCardActions({
                  pokemon: currentSearchPokemon
                })}
              />
            ) : null}
          </div>
        )}
      </>
    );
  },
  isEqual
);

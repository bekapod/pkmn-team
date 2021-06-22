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
import classNames from 'classnames';
import { PokemonSearch } from '../PokemonSearch';
import { CtaButton } from '../Cta';
import { MoveList } from '../MoveList';
import { PokemonCard } from '../PokemonCard';
import { PokemonLine } from '../PokemonLine';
import { useTabs } from '../../hooks/useTabs';
import type {
  TeamMemberFragmentFragment,
  PokemonFragmentFragment,
  TeamMemberMoveFragmentFragment
} from '~/generated/graphql';
import { TeamMemberActionType, useTeamMembersReducer } from './reducer';
import { MovesProvider } from '~/hooks/useMoves';

export type TeamViewProps = {
  initialTeamMembers?: TeamMemberFragmentFragment[];
  updateTeamMembers?: (members: TeamMemberFragmentFragment[]) => void;
  updateTeamMemberMoves?: (
    member: TeamMemberFragmentFragment,
    moves: TeamMemberMoveFragmentFragment['move'][]
  ) => void;
  isSkeleton?: boolean;
};

export const TeamView: FunctionComponent<TeamViewProps> = memo(
  ({
    updateTeamMembers,
    updateTeamMemberMoves,
    initialTeamMembers = [],
    isSkeleton
  }) => {
    const isInitialValue = useRef(true);
    const [teamMembers, dispatch] = useTeamMembersReducer(initialTeamMembers);
    const [currentSearchPokemon, setCurrentSearchPokemon] = useState<
      | Omit<PokemonFragmentFragment, 'eggGroups' | 'evolvesTo' | 'evolvesFrom'>
      | undefined
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
        }
      },
      [dispatch, teamMembers]
    );

    const renderCardActions = useCallback(
      ({
        teamMember,
        pokemon
      }: {
        teamMember?: TeamMemberFragmentFragment;
        pokemon: Omit<
          PokemonFragmentFragment,
          'eggGroups' | 'evolvesTo' | 'evolvesFrom'
        >;
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
                  slot: teamMembers.length,
                  pokemon
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
        <div
          className={classNames('-mt-2', 'children:overflow-x-auto', {
            'animate-pulse mt-10 bg-indigo-200': isSkeleton
          })}
          aria-busy={isSkeleton}
        >
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="teamview-tabs" direction="horizontal">
              {droppableProvided => (
                <div
                  {...droppableProvided.droppableProps}
                  ref={droppableProvided.innerRef}
                >
                  <div
                    className={classNames(
                      'inline-flex',
                      'min-w-full',
                      'pt-10',
                      'children:flex-grow',
                      'children:flex-shrink-0',
                      'children:min-w-250px',
                      {
                        'pt-0 h-10 animate-pulse': isSkeleton
                      }
                    )}
                  >
                    {teamMembers.map(({ id, pokemon }, index) => {
                      const tabItemProps = getTabItemProps(id);
                      return (
                        <Draggable key={id} draggableId={id} index={index}>
                          {draggableProvided => (
                            <div
                              className={classNames('cursor-pointer', 'group', {
                                'text-white bg-indigo-900': !tabItemProps[
                                  'aria-selected'
                                ],
                                'text-initial bg-white':
                                  tabItemProps['aria-selected']
                              })}
                              {...tabItemProps}
                              {...draggableProvided.draggableProps}
                              {...draggableProvided.dragHandleProps}
                              ref={draggableProvided.innerRef}
                              data-testid={`tab-item-${id}`}
                              style={{
                                ...draggableProvided.draggableProps.style
                              }}
                            >
                              <PokemonLine
                                pokemon={pokemon}
                                className={classNames(
                                  'duration-300',
                                  'ease-out',
                                  'bg-inherit',
                                  'transform-gpu',
                                  'transition-transform',
                                  'group-hover:-translate-y-3'
                                )}
                              />
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
                            className={classNames(
                              'text-initial',
                              'bg-white',
                              'cursor-pointer',
                              'group'
                            )}
                            {...addPokemonTabItemProps}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                            ref={draggableProvided.innerRef}
                            aria-label="Add new pokemon to team"
                            data-testid="tab-item-add-pokemon"
                            style={{
                              ...draggableProvided.draggableProps.style
                            }}
                          >
                            <span
                              className={classNames(
                                'pokeball-button',
                                'duration-300',
                                'ease-out',
                                'bg-inherit',
                                'h-10',
                                'transform-gpu',
                                'transition-transform',
                                'group-hover:-translate-y-3'
                              )}
                            >
                              <Plus className={classNames('w-1/3', 'h-1/3')} />
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
              className={classNames(
                'py-6',
                'px-4',
                'gap-5',
                'md:px-6',
                'lg:grid-cols-2',
                {
                  hidden: tabContentProps['aria-hidden'],
                  grid: !tabContentProps['aria-hidden'],
                  'bg-indigo-100': !isSkeleton,
                  'bg-indigo-50 min-h-screen-1/4': isSkeleton
                }
              )}
              {...tabContentProps}
              key={member.id}
              data-testid={`tab-content-${member.id}`}
            >
              <MovesProvider
                teamMember={member}
                updateTeamMemberMoves={updateTeamMemberMoves}
              >
                <PokemonCard
                  teamMember={member}
                  pokemon={member.pokemon}
                  renderCardActions={renderCardActions({
                    teamMember: member,
                    pokemon: member.pokemon
                  })}
                />
                <MoveList
                  teamMember={member}
                  allMoves={member.pokemon.moves?.pokemonMoves?.map(
                    ({ move }) => move
                  )}
                  visibleItems={10}
                  highlightLearnedMoves
                />
              </MovesProvider>
            </div>
          );
        })}

        {teamMembers.length < 6 && (
          <div
            className={classNames(
              'py-6',
              'px-4',
              'gap-5',
              'md:px-6',
              'lg:grid-cols-2',
              {
                hidden: addPokemonTabContentProps['aria-hidden'],
                grid: !addPokemonTabContentProps['aria-hidden'],
                'bg-indigo-100': !isSkeleton,
                'bg-indigo-50 min-h-screen-1/4': isSkeleton
              }
            )}
            {...addPokemonTabContentProps}
            key="Pokemon search"
            data-testid="tab-content-add-pokemon"
            aria-busy={isSkeleton}
          >
            <PokemonSearch setCurrentSearchPokemon={setCurrentSearchPokemon} />
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

TeamView.displayName = 'TeamView';

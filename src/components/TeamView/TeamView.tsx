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
import useDeepCompareEffect from 'use-deep-compare-effect';
import classNames from 'classnames';
import { PokemonSearch } from '../PokemonSearch';
import { CtaButton } from '../Cta';
import { MoveList } from '../MoveList';
import { PokemonCard } from '../PokemonCard';
import { PokemonLine } from '../PokemonLine';
import { useTabs } from '../../hooks/useTabs';
import type {
  TeamMemberFragment,
  PokemonFragment,
  TeamMemberMoveFragment,
  PokemonMoveFragment,
  TeamMemberInTeamFragment
} from '~/generated/graphql';
import { TeamMemberActionType, useTeamMembersReducer } from './reducer';
import { MovesProvider } from '~/hooks/useMoves';

export type TeamViewProps = {
  initialTeamMembers?: TeamMemberInTeamFragment[];
  updateTeam?: (values: {
    name?: string;
    members?: TeamMemberInTeamFragment[];
  }) => void;
  updateTeamMemberMoves?: (values: {
    member: TeamMemberFragment;
    moves: TeamMemberMoveFragment[];
  }) => void;
  isSkeleton?: boolean;
};

export const TeamView: FunctionComponent<TeamViewProps> = memo(
  ({
    updateTeam,
    updateTeamMemberMoves,
    initialTeamMembers = [],
    isSkeleton
  }) => {
    const isInitialValue = useRef(true);
    const [teamMembers, dispatch] = useTeamMembersReducer(initialTeamMembers);
    const [currentSearchPokemon, setCurrentSearchPokemon] = useState<
      PokemonFragment | undefined
    >();
    const { getTabItemProps, getTabContentProps, setSelectedTab } = useTabs(
      initialTeamMembers?.[0]?.node?.id ?? 'add-pokemon'
    );

    useEffect(() => {
      if (!isSkeleton && initialTeamMembers.length > 0)
        setSelectedTab(initialTeamMembers[0].node?.id);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSkeleton]);

    useEffect(() => {
      if (!isInitialValue.current) {
        updateTeam?.({ members: teamMembers });
      }

      isInitialValue.current = false;
    }, [teamMembers, updateTeam]);

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
        teamMember?: TeamMemberInTeamFragment;
        pokemon: PokemonFragment;
      }) => {
        if (teamMember) {
          // eslint-disable-next-line react/display-name
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

        // eslint-disable-next-line react/display-name
        return () => (
          <CtaButton
            type="button"
            size="small"
            variant="secondary"
            onClick={() =>
              dispatch({
                type: TeamMemberActionType.AddTeamMember,
                payload: {
                  pokemon,
                  moves: {}
                }
              })
            }
          >{`Add ${pokemon.name} to team`}</CtaButton>
        );
      },
      [dispatch]
    );

    const addPokemonTabItemProps = getTabItemProps('add-pokemon');
    const addPokemonTabContentProps = getTabContentProps('add-pokemon');

    return (
      <>
        <div
          className={classNames('children:overflow-x-auto', {
            '-mt-2': !isSkeleton,
            'animate-pulse mt-6 bg-indigo-200': isSkeleton
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
                      'children:flex-grow',
                      'children:flex-shrink-0',
                      'children:min-w-250px',
                      {
                        'pt-4': !isSkeleton,
                        'pt-0 h-10 animate-pulse': isSkeleton
                      }
                    )}
                  >
                    {teamMembers.map(({ node: member, slot }, index) => {
                      const tabItemProps = getTabItemProps(
                        member?.id as string
                      );
                      return member ? (
                        <Draggable
                          key={member.id ?? slot}
                          draggableId={`member-${member.id}`}
                          index={index}
                        >
                          {draggableProvided => (
                            <div
                              className={classNames('cursor-pointer', 'group', {
                                'text-white bg-indigo-900':
                                  !tabItemProps['aria-selected'],
                                'text-initial bg-white':
                                  tabItemProps['aria-selected']
                              })}
                              {...tabItemProps}
                              {...draggableProvided.draggableProps}
                              {...draggableProvided.dragHandleProps}
                              ref={draggableProvided.innerRef}
                              data-testid={`tab-item-${member.id}`}
                              style={{
                                ...draggableProvided.draggableProps.style
                              }}
                            >
                              <PokemonLine
                                pokemon={member.pokemon}
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
                      ) : null;
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

        {teamMembers.map(({ node: member, ...rest }) => {
          const tabContentProps = getTabContentProps(member?.id as string);
          return member ? (
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
              key={member.id ?? rest.slot}
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
                    teamMember: { ...rest, node: member },
                    pokemon: member.pokemon
                  })}
                />
                <MoveList
                  teamMember={member}
                  allMoves={
                    member.pokemon.moves.edges?.filter(
                      (edge): edge is PokemonMoveFragment => !!edge
                    ) ?? []
                  }
                  visibleItems={10}
                  highlightLearnedMoves
                />
              </MovesProvider>
            </div>
          ) : null;
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
            {!isSkeleton && (
              <>
                <PokemonSearch
                  setCurrentSearchPokemon={setCurrentSearchPokemon}
                />
                {currentSearchPokemon ? (
                  <PokemonCard
                    pokemon={currentSearchPokemon}
                    renderCardActions={renderCardActions({
                      pokemon: currentSearchPokemon
                    })}
                  />
                ) : null}
              </>
            )}
          </div>
        )}
      </>
    );
  },
  isEqual
);

TeamView.displayName = 'TeamView';

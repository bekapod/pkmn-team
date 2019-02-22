import {
  compose,
  first,
  getOr,
  lt,
  map,
  size,
  get,
  add,
  set,
  nth
} from "lodash/fp";
import React, { Component } from "react";
import isEqual from "react-fast-compare";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from "react-beautiful-dnd";
import styled from "styled-components/macro";
import wait from "waait";
import PokemonSearch from "../../containers/PokemonSearch";
import { baseTransition, spaceUpOut } from "../../helpers/animations";
import * as variables from "../../helpers/variables";
import { Pokemon, TeamMember } from "../../types";
import { CtaButton } from "../Cta";
import PokemonCard from "../PokemonCard";
import PokemonLine from "../PokemonLine";
import Tabs from "../Tabs";

interface Props {
  teamMembers: TeamMember[];
  currentSearchPokemon?: Pokemon;
  addPokemonToTeam: (pokemon: Pokemon, order: number) => void;
  removePokemonFromTeam: (member: string) => void;
  reorderTeamMembers: (members: TeamMember[]) => void;
}

interface State {
  deletedItems: TeamMember[];
}

const AddButton = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${variables.spacing.xxl}px;
  color: ${variables.colors.white};
  font-size: ${variables.fontSizes.xxl}px;
  font-weight: 700;
  line-height: 0;
  background: linear-gradient(
    to bottom,
    ${variables.colors.primaryDark} 0%,
    ${variables.colors.primaryDark} 41%,
    ${variables.colors.grayDarker} 41%,
    ${variables.colors.grayDarker} 59%,
    ${variables.colors.white} 59%,
    ${variables.colors.white} 100%
  );

  [aria-selected="true"] > & {
    background: linear-gradient(
      to bottom,
      ${variables.colors.primary} 0%,
      ${variables.colors.primary} 41%,
      ${variables.colors.grayDarker} 41%,
      ${variables.colors.grayDarker} 59%,
      ${variables.colors.white} 59%,
      ${variables.colors.white} 100%
    );
  }

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: -1;
    transform: translate(-50%, -50%);
    display: block;
    width: 1em;
    height: 1em;
    background-color: ${variables.colors.grayDarker};
    border-radius: 50%;
  }
`;

interface TabItemProps {
  "aria-selected": boolean;
}

interface TabContentProps {
  "aria-hidden": boolean;
}

const TabBar = styled.div`
  [data-react-beautiful-dnd-droppable] {
    display: flex;
  }

  [data-react-beautiful-dnd-draggable],
  [data-binned-item],
  [data-add-button] {
    flex: 1;
  }

  [data-bin] {
    opacity: 0;
    position: fixed;
    left: 50%;
    bottom: 0;
    z-index: 1;
    height: 99px;
    background: rgba(125, 213, 43, 0.5);
    pointer-events: none;
    transform: translateX(-50%);
    transition: opacity 0.5s linear;

    .is-dragging & {
      opacity: 1;
    }

    &::before {
      content: "";
      width: 150vw;
      background: rgba(125, 213, 43, 0.5);
      position: absolute;
      top: 0;
      left: -50vw;
      height: 100%;
    }

    [data-binned-item] {
      animation: ${spaceUpOut} 0.75s linear;
      animation-fill-mode: forwards;
    }
  }
`;

const TabItem = styled.div`
  color: ${(props: TabItemProps) =>
    props["aria-selected"] ? "initial" : variables.colors.white};
  background-color: ${(props: TabItemProps) =>
    props["aria-selected"]
      ? variables.colors.white
      : variables.colors.grayDark};
  cursor: pointer;

  &[data-add-button] {
    background-color: ${variables.colors.white};
  }

  > * {
    ${baseTransition}
    background-color: inherit;
    transition-property: transform;
    will-change: transform;
  }

  &:hover,
  &:focus {
    > * {
      transform: translateY(-${variables.spacing.md}px);
    }
  }
`;

const TabContent = styled.div`
  grid-template-columns: 1fr 1fr;
  grid-gap: ${variables.gutters.grid}px;
  padding: ${variables.spacing.lg}px;
  background-color: ${variables.colors.gray};

  ${(props: TabContentProps) =>
    props["aria-hidden"] ? "display: none !important;" : "display: grid;"}
`;

const reorder = (list: any[], startIndex: number, endIndex: number): any[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class TeamView extends Component<Props, State> {
  public state = {
    deletedItems: []
  };

  public constructor(props: Props) {
    super(props);

    this.onDragEnd = this.onDragEnd.bind(this);
    this.emptyBin = this.emptyBin.bind(this);
    this.renderCardActions = this.renderCardActions.bind(this);
  }

  public shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
  }

  public onDragStart = (): void => {
    document.body.classList.add("is-dragging");
  };

  public onDragEnd(result: DropResult): void {
    if (!result.destination) {
      document.body.classList.remove("is-dragging");
      return;
    }

    const {
      reorderTeamMembers,
      removePokemonFromTeam,
      teamMembers
    } = this.props;

    if (result.destination.droppableId === "teamview-tabs") {
      reorderTeamMembers(
        reorder(
          teamMembers,
          result.source.index,
          get(["destination", "index"], result)
        ).map((member, index) => set("order", add(index, 1), member))
      );

      document.body.classList.remove("is-dragging");
    }

    if (result.destination.droppableId === "teamview-bin") {
      const binnedMember = nth(result.source.index, teamMembers);

      if (binnedMember) {
        this.setState(state => ({
          deletedItems: [...state.deletedItems, binnedMember]
        }));
        removePokemonFromTeam(get("id", binnedMember));
      }
    }
  }

  public emptyBin(): void {
    document.body.classList.remove("is-dragging");

    wait(250).then(() => {
      this.setState(() => ({
        deletedItems: []
      }));
    });
  }

  public renderCardActions({
    memberId,
    pokemon
  }: {
    memberId?: string;
    pokemon: Pokemon;
  }): () => JSX.Element {
    const { teamMembers, addPokemonToTeam, removePokemonFromTeam } = this.props;

    const onClick = memberId
      ? () => removePokemonFromTeam(memberId)
      : () => addPokemonToTeam(pokemon, add(size(teamMembers), 1));

    const buttonText = memberId
      ? `Remove ${pokemon.name} from team`
      : `Add ${pokemon.name} to team`;

    return () => (
      <CtaButton small onClick={onClick}>
        {buttonText}
      </CtaButton>
    );
  }

  public render(): JSX.Element {
    const { teamMembers, currentSearchPokemon } = this.props;
    const { deletedItems } = this.state;

    return (
      <Tabs
        selectedItem={compose(
          getOr("add-pokemon", "id"),
          first
        )(teamMembers)}
      >
        {({ getTabItemProps, getTabContentProps }) => {
          const addPokemonTabItemProps = getTabItemProps("add-pokemon");
          const addPokemonTabContentProps = getTabContentProps("add-pokemon");
          return (
            <>
              <TabBar>
                <DragDropContext
                  onBeforeDragStart={this.onDragStart}
                  onDragEnd={this.onDragEnd}
                >
                  <Droppable droppableId="teamview-tabs" direction="horizontal">
                    {droppableProvided => (
                      <div
                        {...droppableProvided.droppableProps}
                        ref={droppableProvided.innerRef}
                      >
                        {droppableProvided.placeholder}

                        {teamMembers.map(
                          ({ id, pokemon }: TeamMember, index: number) => {
                            const tabItemProps = getTabItemProps(id);
                            return (
                              <Draggable
                                key={id}
                                draggableId={id}
                                index={index}
                              >
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
                          }
                        )}

                        {lt(size(teamMembers), 6) ? (
                          <TabItem
                            {...addPokemonTabItemProps}
                            key="Add new Pokemon"
                            data-testid="tab-item-add-pokemon"
                            data-add-button
                          >
                            <AddButton aria-label="Add new pokemon to team">
                              +
                            </AddButton>
                          </TabItem>
                        ) : null}
                      </div>
                    )}
                  </Droppable>

                  <Droppable droppableId="teamview-bin" direction="horizontal">
                    {(droppableProvided, droppableSnapshot) => (
                      <div
                        {...droppableProvided.droppableProps}
                        ref={droppableProvided.innerRef}
                        data-bin
                        style={{
                          width: `calc((100% - 80px) / ${teamMembers.length +
                            1})`,
                          backgroundColor: droppableSnapshot.isDraggingOver
                            ? "red"
                            : "initial"
                        }}
                      >
                        {droppableProvided.placeholder}
                        {deletedItems.map(({ id, pokemon }) => (
                          <TabItem
                            key={id}
                            aria-selected={false}
                            data-testid={`binned-item-${id}`}
                            data-binned-item
                            onAnimationEnd={this.emptyBin}
                          >
                            <PokemonLine pokemon={pokemon} />
                          </TabItem>
                        ))}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </TabBar>

              {map(({ id, pokemon: pkmn }) => {
                const tabContentProps = getTabContentProps(id);
                return (
                  <TabContent
                    {...tabContentProps}
                    key={id}
                    data-testid={`tab-content-${id}`}
                  >
                    <PokemonCard
                      memberId={id}
                      pokemon={pkmn}
                      renderCardActions={this.renderCardActions({
                        memberId: id,
                        pokemon: pkmn
                      })}
                    />
                  </TabContent>
                );
              })(teamMembers)}

              {lt(size(teamMembers), 6) ? (
                <TabContent
                  {...addPokemonTabContentProps}
                  key="Pokemon search"
                  data-testid="tab-content-add-pokemon"
                >
                  <PokemonSearch />
                  {currentSearchPokemon ? (
                    <PokemonCard
                      pokemon={currentSearchPokemon}
                      renderCardActions={this.renderCardActions({
                        pokemon: currentSearchPokemon
                      })}
                    />
                  ) : null}
                </TabContent>
              ) : null}
            </>
          );
        }}
      </Tabs>
    );
  }
}

export default TeamView;

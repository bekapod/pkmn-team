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
  nth,
  last
} from "lodash/fp";
import React, { Component } from "react";
import isEqual from "react-fast-compare";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from "react-beautiful-dnd";
import { css } from "styled-components/macro";
import wait from "waait";
import PokemonSearch from "../../containers/PokemonSearch";
import * as variables from "../../helpers/variables";
import { Pokemon, TeamMember } from "../../types";
import { CtaButton } from "../Cta";
import PokemonCard from "../PokemonCard";
import PokemonLine from "../PokemonLine";
import Tabs from "../Tabs";
import BinIcon from "../BinIcon";
import { TabBar, TabScroller, TabItem, AddButton, Bin, TabContent } from "./styles";
import { reorder } from "./helpers";

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
      if (!getOr(false, [result.source.index], teamMembers)) {
        return;
      }

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
      : () =>
          addPokemonToTeam(
            pokemon,
            compose(
              add(1),
              getOr(0, "order"),
              last
            )(teamMembers)
          );

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
                        <TabScroller>
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
                                        ...draggableProvided.draggableProps
                                          .style
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
                        css={css`
                          width: calc(
                            (100% - 80px) / ${teamMembers.length + 1}
                          );

                          ${droppableSnapshot.isDraggingOver
                            ? `
                              --background: ${variables.colors.grayDark};
                              --helperOpacity: 1;
                              color: ${variables.colors.white};
                            `
                            : ""}
                        `}
                      >
                        {droppableProvided.placeholder}
                        <span className="zig-zag-helper" />
                        <BinIcon />
                        {deletedItems.map(({ id, pokemon }) => (
                          <TabItem
                            key={id}
                            aria-selected={false}
                            data-testid={`binned-item-${id}`}
                            data-binned-item
                            onAnimationEnd={this.emptyBin}
                          >
                            <PokemonLine pokemon={pokemon} compact />
                          </TabItem>
                        ))}
                      </Bin>
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

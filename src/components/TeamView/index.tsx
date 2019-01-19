import { compose, first, get, lt, map, size } from "lodash/fp";
import React, { PureComponent } from "react";
import styled from "styled-components/macro";
import PokemonSearch from "../../containers/PokemonSearch";
import { getUniqueId } from "../../helpers/general";
import * as variables from "../../helpers/variables";
import { IPokemon, ITeamMember } from "../../types";
import PokemonCard from "../PokemonCard";
import PokemonLine from "../PokemonLine";
import Tabs from "../Tabs";

interface IProps {
  teamBuilderMembers: ITeamMember[];
  pokemonSearchCurrentSelection?: IPokemon;
  addPokemonToTeam: (member: ITeamMember) => void;
  removePokemonFromTeam: (member: { id: string }) => void;
}

interface ITabItemProps {
  "aria-selected": boolean;
}

interface ITabContentProps {
  "aria-hidden": boolean;
}

const TabBar = styled.div`
  display: flex;

  > * {
    flex: 1;
  }
`;

const TabItem = styled.div`
  color: ${(props: ITabItemProps) =>
    props["aria-selected"] ? "initial" : variables.colors.white};
  background-color: ${(props: ITabItemProps) =>
    props["aria-selected"]
      ? variables.colors.white
      : variables.colors.grayDark};
`;

const TabContent = styled.div`
  grid-template-columns: 1fr 1fr;
  grid-gap: ${variables.gutters.grid}px;
  padding: ${variables.spacing.lg}px;
  background-color: ${variables.colors.gray};

  ${(props: ITabContentProps) =>
    props["aria-hidden"] ? "display: none !important;" : "display: grid;"}
`;

class TeamView extends PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);

    this.handleAddPokemonToTeam = this.handleAddPokemonToTeam.bind(this);
    this.handleRemovePokemonFromTeam = this.handleRemovePokemonFromTeam.bind(
      this
    );
  }

  public handleAddPokemonToTeam(pokemon: IPokemon) {
    return () => {
      this.props.addPokemonToTeam({
        id: getUniqueId(),
        pokemon
      });
    };
  }

  public handleRemovePokemonFromTeam(memberId: string) {
    return () => {
      this.props.removePokemonFromTeam({ id: memberId });
    };
  }

  public render() {
    const { teamBuilderMembers, pokemonSearchCurrentSelection } = this.props;

    return (
      <Tabs
        selectedItem={compose(
          get("id"),
          first
        )(teamBuilderMembers)}
      >
        {({ getTabItemProps, getTabContentProps }) => {
          const addPokemonTabItemProps = getTabItemProps("add-pokemon");
          const addPokemonTabContentProps = getTabContentProps("add-pokemon");
          return (
            <>
              <TabBar>
                {map(({ id, pokemon: pkmn }) => {
                  const tabItemProps = getTabItemProps(id);
                  return (
                    <TabItem
                      {...tabItemProps}
                      key={id}
                      data-testid={`tab-item-${id}`}
                    >
                      <PokemonLine pokemon={pkmn} />
                    </TabItem>
                  );
                })(teamBuilderMembers)}

                {lt(size(teamBuilderMembers), 6) ? (
                  <TabItem
                    {...addPokemonTabItemProps}
                    key={"Add new Pokemon"}
                    data-testid="tab-item-add-pokemon"
                  >
                    +
                  </TabItem>
                ) : null}
              </TabBar>

              {map(({ id, pokemon: pkmn }) => {
                const tabContentProps = getTabContentProps(id);
                return (
                  <TabContent
                    {...tabContentProps}
                    key={id}
                    data-testid={`tab-content-${id}`}
                  >
                    <PokemonCard memberId={id} pokemon={pkmn} />
                  </TabContent>
                );
              })(teamBuilderMembers)}

              {lt(size(teamBuilderMembers), 6) ? (
                <TabContent
                  {...addPokemonTabContentProps}
                  key="Pokemon search"
                  data-testid="tab-content-add-pokemon"
                >
                  <PokemonSearch />
                  {pokemonSearchCurrentSelection ? (
                    <PokemonCard pokemon={pokemonSearchCurrentSelection} />
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

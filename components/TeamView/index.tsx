import { compose, first, getOr, lt, map, size } from "lodash/fp";
import React, { Component } from "react";
import isEqual from "react-fast-compare";
import styled from "styled-components/macro";
import PokemonSearch from "../../containers/PokemonSearch";
import { baseTransition } from "../../helpers/animations";
import * as variables from "../../helpers/variables";
import { IPokemon, ITeamMember } from "../../types";
import { CtaButton } from "../Cta";
import PokemonCard from "../PokemonCard";
import PokemonLine from "../PokemonLine";
import Tabs from "../Tabs";

interface IProps {
  teamMembers: ITeamMember[];
  currentSearchPokemon?: IPokemon;
  addPokemonToTeam: (pokemon: IPokemon) => void;
  removePokemonFromTeam: (member: string) => void;
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

  ${(props: ITabContentProps) =>
    props["aria-hidden"] ? "display: none !important;" : "display: grid;"}
`;

class TeamView extends Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.renderCardActions = this.renderCardActions.bind(this);
  }

  public shouldComponentUpdate(nextProps: IProps) {
    return !isEqual(this.props, nextProps);
  }

  public renderCardActions({
    memberId,
    pokemon
  }: {
    memberId?: string;
    pokemon: IPokemon;
  }) {
    const { addPokemonToTeam, removePokemonFromTeam } = this.props;

    const onClick = memberId
      ? () => removePokemonFromTeam(memberId)
      : () => addPokemonToTeam(pokemon);

    const buttonText = memberId
      ? `Remove ${pokemon.name} from team`
      : `Add ${pokemon.name} to team`;

    return () => (
      <CtaButton small={true} onClick={onClick}>
        {buttonText}
      </CtaButton>
    );
  }

  public render() {
    const { teamMembers, currentSearchPokemon } = this.props;

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
                })(teamMembers)}

                {lt(size(teamMembers), 6) ? (
                  <TabItem
                    {...addPokemonTabItemProps}
                    key={"Add new Pokemon"}
                    data-testid="tab-item-add-pokemon"
                    data-add-button={true}
                  >
                    <AddButton aria-label="Add new pokemon to team">
                      +
                    </AddButton>
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

import { ApolloError } from "apollo-client";
import {
  anyPass,
  first,
  get,
  getOr,
  gt,
  isEmpty,
  isNil,
  keys,
  lt,
  map,
  prop,
  propOr,
  set,
  size,
  unset,
  values
} from "lodash/fp";
import React, { ChangeEvent, Component } from "react";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { getUniqueId } from "../../helpers/general";
import withScrollToTop from "../../hocs/withScrollToTop";
import { IPokemon, ITeam, ITeamMember } from "../../types";
import CenteredRow from "../CenteredRow";
import { CtaButton } from "../Cta";
import ErrorMessage from "../ErrorMessage";
import GiantInput from "../GiantInput";
import LoadingIcon from "../LoadingIcon";
import PokemonCard from "../PokemonCard";
import PokemonLine from "../PokemonLine";
import PokemonSearch from "../PokemonSearch";
import Tabs from "../Tabs";
import { TabBar, TabContent, TabItem } from "./styled";

interface IProps {
  team?: ITeam;
  pokemon: IPokemon[];
  createdTeamId?: string;
  loading?: boolean;
  error?: ApolloError;
  createTeamMutation: (
    mutation: {
      variables: {
        name: string;
        pokedexIds: number[];
      };
    }
  ) => void;
  updateTeamMutation: (
    mutation: {
      variables: {
        id: string;
        name: string;
        pokedexIds: number[];
      };
    }
  ) => void;
  setTeamName: (name: string) => void;
  setTeamMembers: (members: ITeamMember[]) => void;
  setCurrentSearchPokemon: (pokemon: IPokemon) => void;
  addPokemonToTeam: (member: ITeamMember) => void;
  removePokemonFromTeam: (member: { id: string }) => void;
  teamBuilderName?: string;
  teamBuilderCurrentSearchPokemon?: IPokemon;
  teamBuilderMembers?: { [key: string]: ITeamMember };
  scrollToTop?: () => void;
}

interface IState {
  isValid: boolean;
  isTouched: boolean;
  errors: { [key: string]: string };
}

const validate = (
  props: IProps,
  state: IState,
  options: { setTouched?: boolean } = {}
) => {
  const { teamBuilderName, teamBuilderMembers } = props;
  const isInvalid = anyPass([isEmpty, isNil]);
  let updatedState = { ...state };

  if (options.setTouched) {
    updatedState = set("isTouched", true, updatedState);
  }

  updatedState =
    isInvalid(teamBuilderName) || isInvalid(teamBuilderMembers)
      ? set("isValid", false, updatedState)
      : set("isValid", true, updatedState);

  if (isInvalid(teamBuilderName)) {
    updatedState = set(
      "errors",
      { ...updatedState.errors, name: "Team name is required" },
      updatedState
    );
  } else {
    updatedState = set(
      "errors",
      unset("name", updatedState.errors),
      updatedState
    );
  }

  if (isInvalid(teamBuilderMembers)) {
    updatedState = set(
      "errors",
      { ...updatedState.errors, members: "Your team must have some pokemon" },
      updatedState
    );
  } else {
    updatedState = set(
      "errors",
      unset("members", updatedState.errors),
      updatedState
    );
  }

  return updatedState;
};

class TeamBuilder extends Component<IProps, IState> {
  public static getDerivedStateFromProps(props: IProps, state: IState) {
    return validate(props, state);
  }

  public state = {
    errors: {},
    isTouched: false,
    isValid: false
  };

  constructor(props: IProps) {
    super(props);

    this.handleTeamNameChange = this.handleTeamNameChange.bind(this);
    this.handleAddPokemonToTeam = this.handleAddPokemonToTeam.bind(this);
    this.handleUpsertTeam = this.handleUpsertTeam.bind(this);

    if (props.team) {
      const { name, members } = props.team;
      props.setTeamName(name);
      props.setTeamMembers(members);
    } else {
      props.setTeamName("");
      props.setTeamMembers([]);
    }
  }

  public handleTeamNameChange(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    this.props.setTeamName(value);

    this.setState(() => ({
      isTouched: true
    }));
  }

  public handleAddPokemonToTeam(pokemon: IPokemon) {
    this.props.addPokemonToTeam({
      id: getUniqueId(),
      pokemon
    });

    this.setState(() => ({
      isTouched: true
    }));
  }

  public handleRemovePokemonFromTeam(memberId: string) {
    return () => {
      this.props.removePokemonFromTeam({ id: memberId });

      this.setState(() => ({
        isTouched: true
      }));
    };
  }

  public handleUpsertTeam() {
    const {
      team,
      createTeamMutation,
      updateTeamMutation,
      teamBuilderName,
      teamBuilderMembers
    } = this.props;
    const teamId = getOr(undefined, "id", team);

    if (this.state.isValid && teamBuilderName && teamBuilderMembers) {
      const pokedexIds = keys(teamBuilderMembers).map(key => {
        const { pokemon } = teamBuilderMembers[key];
        return prop("pokedexId", pokemon);
      });

      if (teamId) {
        updateTeamMutation({
          variables: {
            id: teamId,
            name: teamBuilderName,
            pokedexIds
          }
        });
      } else {
        createTeamMutation({
          variables: {
            name: teamBuilderName,
            pokedexIds
          }
        });
      }
    } else if (this.props.scrollToTop) {
      this.setState({ isTouched: true });
      this.props.scrollToTop();
    }
  }

  public render() {
    const {
      team,
      pokemon,
      teamBuilderMembers,
      teamBuilderName,
      createdTeamId,
      loading,
      error,
      setCurrentSearchPokemon
    } = this.props;
    const nameErrorMessage = propOr(undefined, "name", this.state.errors);
    const nameHasError = this.state.isTouched && !!nameErrorMessage;

    if (createdTeamId) {
      return <Redirect to={`/team/edit/${createdTeamId}`} />;
    }

    return (
      <>
        <CenteredRow stackVertically={true}>
          <GiantInput
            aria-label="Choose a team name"
            placeholder="Choose a team name"
            onChange={this.handleTeamNameChange}
            value={teamBuilderName}
            isInvalid={nameHasError}
          />

          {this.state.isTouched && nameHasError && nameErrorMessage && (
            <ErrorMessage>{nameErrorMessage}</ErrorMessage>
          )}

          {gt(size(teamBuilderMembers), 0) && [
            !!error && (
              <CenteredRow key="Error">
                <ErrorMessage>{error.message}</ErrorMessage>
              </CenteredRow>
            ),
            loading && !error ? (
              <CenteredRow key="Loading">
                <LoadingIcon spinner={true} />
              </CenteredRow>
            ) : (
              <CenteredRow key={team ? "Save button" : "Create button"}>
                <CtaButton onClick={this.handleUpsertTeam}>
                  {team ? "Save team" : "Create this team!"}
                </CtaButton>
              </CenteredRow>
            )
          ]}
        </CenteredRow>

        <Tabs
          selectedItem={compose(
            get("id"),
            first,
            values
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
                      <TabItem {...tabItemProps} key={id}>
                        <PokemonLine pokemon={pkmn} />
                      </TabItem>
                    );
                  })(teamBuilderMembers)}

                  {lt(size(teamBuilderMembers), 6) ? (
                    <TabItem
                      {...addPokemonTabItemProps}
                      key={"Add new Pokemon"}
                    >
                      +
                    </TabItem>
                  ) : null}
                </TabBar>

                {map(({ id, pokemon: pkmn }) => {
                  const tabContentProps = getTabContentProps(id);
                  return (
                    <TabContent {...tabContentProps} key={id}>
                      <PokemonCard
                        memberId={id}
                        pokemon={pkmn}
                        isSquared={true}
                      />
                    </TabContent>
                  );
                })(teamBuilderMembers)}

                {lt(size(teamBuilderMembers), 6) ? (
                  <TabContent
                    {...addPokemonTabContentProps}
                    key="Pokemon search"
                  >
                    <PokemonSearch
                      pokemon={pokemon}
                      setCurrentSearchPokemon={setCurrentSearchPokemon}
                    />
                  </TabContent>
                ) : null}
              </>
            );
          }}
        </Tabs>
      </>
    );
  }
}

export default withScrollToTop(TeamBuilder);

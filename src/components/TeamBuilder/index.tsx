import { ApolloError } from "apollo-client";
import {
  anyPass,
  getOr,
  gt,
  isEmpty,
  isNil,
  keys,
  lt,
  prop,
  propOr,
  set,
  unset
} from "lodash/fp";
import React, { ChangeEvent, Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { getUniqueId } from "../../helpers/general";
import withScrollToTop from "../../hocs/withScrollToTop";
import { IPokemon, ITeam, ITeamMember } from "../../types";
import CenteredRow from "../CenteredRow";
import { CtaButton } from "../Cta";
import ErrorMessage from "../ErrorMessage";
import GiantInput from "../GiantInput";
import LoadingIcon from "../LoadingIcon";
import PokemonCard from "../PokemonCard";
import PokemonGrid from "../PokemonGrid";
import PokemonSearch from "../PokemonSearch";

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

  public handleAddPokemonToTeam() {
    if (this.props.teamBuilderCurrentSearchPokemon) {
      this.props.addPokemonToTeam({
        id: getUniqueId(),
        pokemon: this.props.teamBuilderCurrentSearchPokemon
      });

      this.setState(() => ({
        isTouched: true
      }));
    }
  }

  public handleRemovePokemonFromTeam(memberId: string) {
    return () => {
      this.props.removePokemonFromTeam({ id: memberId });
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
      setCurrentSearchPokemon,
      teamBuilderCurrentSearchPokemon,
      teamBuilderMembers,
      teamBuilderName,
      createdTeamId,
      loading,
      error
    } = this.props;
    const currentSearchPokemonName =
      teamBuilderCurrentSearchPokemon &&
      prop("name", teamBuilderCurrentSearchPokemon);
    const numberOfMembersInTeam = keys(teamBuilderMembers).length;
    const nameErrorMessage = propOr(undefined, "name", this.state.errors);
    const nameHasError = this.state.isTouched && !!nameErrorMessage;

    if (createdTeamId) {
      return <Redirect to={`/team/edit/${createdTeamId}`} />;
    }

    return (
      <Fragment>
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
        </CenteredRow>

        {lt(numberOfMembersInTeam, 6) && [
          <CenteredRow key="Search form">
            <PokemonSearch
              pokemon={pokemon}
              setCurrentSearchPokemon={setCurrentSearchPokemon}
            />
          </CenteredRow>,
          currentSearchPokemonName && (
            <CenteredRow key="Add member button">
              <CtaButton secondary={true} onClick={this.handleAddPokemonToTeam}>
                {`Add ${currentSearchPokemonName} to your team`}
              </CtaButton>
            </CenteredRow>
          )
        ]}

        {gt(numberOfMembersInTeam, 0) && [
          <CenteredRow key="Team members">
            <PokemonGrid>
              {teamBuilderMembers &&
                Object.keys(teamBuilderMembers).map(id => {
                  const { pokemon: pkmn } = teamBuilderMembers[id];
                  const renderCardActions = () => (
                    <CtaButton
                      secondary={true}
                      small={true}
                      onClick={this.handleRemovePokemonFromTeam(id)}
                    >
                      {`Remove ${pkmn.name} from team`}
                    </CtaButton>
                  );
                  return (
                    <PokemonCard
                      key={id}
                      memberId={id}
                      pokemon={pkmn}
                      renderCardActions={renderCardActions}
                    />
                  );
                })}
            </PokemonGrid>
          </CenteredRow>,
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
      </Fragment>
    );
  }
}

export default withScrollToTop(TeamBuilder);

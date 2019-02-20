import { ApolloError } from "apollo-client";
import { get, getOr, gt, propOr, size } from "lodash/fp";
import Router from "next/router";
import React, { ChangeEvent, Component } from "react";
import isEqual from "react-fast-compare";
import { getUniqueId } from "../../helpers/general";
import withScrollToTop from "../../hocs/withScrollToTop";
import { IPokemon, ITeam, ITeamMember } from "../../types";
import CenteredRow from "../CenteredRow";
import { CtaButton } from "../Cta";
import ErrorMessage from "../ErrorMessage";
import GiantInput from "../GiantInput";
import LoadingIcon from "../LoadingIcon";
import TeamView from "../TeamView";
import { validate } from "./helpers";

interface IProps {
  team?: ITeam;
  currentSearchPokemon?: IPokemon;
  createdTeamId?: string;
  loading?: boolean;
  error?: ApolloError;
  createTeamMutation: (mutation: {
    variables: {
      name: string;
      pokedexIds: number[];
    };
  }) => void;
  updateTeamMutation: (mutation: {
    variables: {
      id: string;
      name: string;
      pokedexIds: number[];
    };
  }) => void;
  scrollToTop?: () => void;
}

interface IState {
  isValid: boolean;
  isTouched: boolean;
  errors: { [key: string]: string };
  teamMembers: ITeamMember[];
  teamName: string;
}

class TeamBuilder extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.handleTeamNameChange = this.handleTeamNameChange.bind(this);
    this.handleUpsertTeam = this.handleUpsertTeam.bind(this);
    this.handleAddPokemonToTeam = this.handleAddPokemonToTeam.bind(this);
    this.handleRemovePokemonFromTeam = this.handleRemovePokemonFromTeam.bind(
      this
    );

    this.state = {
      errors: {},
      isTouched: false,
      isValid: false,
      teamMembers: getOr([], ["team", "members"], props),
      teamName: getOr("", ["team", "name"], props)
    };

    this.state = {
      ...this.state,
      ...validate(this.state)
    };
  }

  public componentDidUpdate(prevProps: IProps) {
    const { team } = this.props;

    if (!isEqual(team, prevProps.team)) {
      this.setState(() => ({
        errors: {},
        isTouched: false,
        isValid: false,
        teamMembers: getOr([], ["team", "members"], this.props),
        teamName: getOr("", ["team", "name"], this.props)
      }));
    }
  }

  public handleTeamNameChange(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    this.setState(state => {
      const newState = {
        ...state,
        teamName: value
      };

      return {
        ...newState,
        ...validate(newState, { setTouched: true })
      };
    });
  }

  public handleAddPokemonToTeam(pokemon: IPokemon) {
    this.setState(state => {
      const newState = {
        ...state,
        teamMembers: [...state.teamMembers, { id: getUniqueId(), pokemon }]
      };

      return {
        ...newState,
        ...validate(newState, { setTouched: true })
      };
    });
  }

  public handleRemovePokemonFromTeam(memberId: string) {
    this.setState(state => ({
      isTouched: true,
      teamMembers: state.teamMembers.filter(
        teamMember => teamMember.id !== memberId
      )
    }));
  }

  public handleUpsertTeam() {
    const { team, createTeamMutation, updateTeamMutation } = this.props;
    const { teamName, teamMembers } = this.state;
    const teamId = getOr(undefined, "id", team);

    if (this.state.isValid && teamName && teamMembers) {
      const pokedexIds = teamMembers.map(get(["pokemon", "pokedexId"]));

      if (teamId) {
        updateTeamMutation({
          variables: {
            id: teamId,
            name: teamName,
            pokedexIds
          }
        });
      } else {
        createTeamMutation({
          variables: {
            name: teamName,
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
      currentSearchPokemon,
      createdTeamId,
      loading,
      error
    } = this.props;
    const { teamName, teamMembers } = this.state;
    const nameErrorMessage = propOr(undefined, "name", this.state.errors);
    const nameHasError = this.state.isTouched && !!nameErrorMessage;

    if (createdTeamId) {
      Router.push(`/team/edit/${createdTeamId}`);
    }

    return (
      <>
        <CenteredRow stackVertically={true}>
          <GiantInput
            aria-label="Choose a team name"
            placeholder="Choose a team name"
            onChange={this.handleTeamNameChange}
            value={teamName}
            isInvalid={nameHasError}
          />

          {this.state.isTouched && nameHasError && nameErrorMessage && (
            <ErrorMessage>{nameErrorMessage}</ErrorMessage>
          )}

          {!!error && (
            <ErrorMessage key="Error message">{error.message}</ErrorMessage>
          )}

          {loading && !error ? (
            <LoadingIcon key="Loading icon" spinner={true} />
          ) : null}

          {gt(size(teamMembers), 0) && !error && !loading && (
            <CtaButton
              key={team ? "Save button" : "Create button"}
              onClick={this.handleUpsertTeam}
            >
              {team ? "Save team" : "Create this team!"}
            </CtaButton>
          )}
        </CenteredRow>

        <TeamView
          teamMembers={teamMembers}
          currentSearchPokemon={currentSearchPokemon}
          addPokemonToTeam={this.handleAddPokemonToTeam}
          removePokemonFromTeam={this.handleRemovePokemonFromTeam}
        />
      </>
    );
  }
}

export default withScrollToTop(TeamBuilder);

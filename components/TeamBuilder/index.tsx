import { ApolloError } from "apollo-client";
import { getOr, propOr, get } from "lodash/fp";
import Router from "next/router";
import React, { ChangeEvent, Component } from "react";
import isEqual from "react-fast-compare";
import { css } from "styled-components/macro";
import { getUniqueId } from "../../helpers/general";
import * as variables from "../../helpers/variables";
import { Pokemon, Team, TeamMember } from "../../types";
import CenteredRow from "../CenteredRow";
import { CtaButton } from "../Cta";
import ErrorMessage from "../ErrorMessage";
import GiantInput from "../GiantInput";
import LoadingIcon from "../LoadingIcon";
import TeamView from "../TeamView";
import { validate } from "./helpers";

interface Props {
  team?: Team;
  currentSearchPokemon?: Pokemon;
  createdTeamId?: string;
  deletedTeamId?: string;
  loading?: boolean;
  error?: ApolloError;
  createTeamMutation: (mutation: {
    variables: {
      team: {
        name: string;
        members: { pokemonId: string; order: number }[];
      };
    };
  }) => void;
  updateTeamMutation: (mutation: {
    variables: {
      team: {
        id: string;
        name: string;
        members: { pokemonId: string; order: number }[];
      };
    };
  }) => void;
  deleteTeamMutation: (mutation: {
    variables: {
      team: {
        id: string;
      };
    };
  }) => void;
}

interface State {
  isValid: boolean;
  isTouched: boolean;
  errors: { [key: string]: string };
  teamMembers: TeamMember[];
  teamName: string;
}

class TeamBuilder extends Component<Props, State> {
  public constructor(props: Props) {
    super(props);

    this.handleTeamNameChange = this.handleTeamNameChange.bind(this);
    this.handleUpsertTeam = this.handleUpsertTeam.bind(this);
    this.handleDeleteTeam = this.handleDeleteTeam.bind(this);
    this.handleAddPokemonToTeam = this.handleAddPokemonToTeam.bind(this);
    this.handleRemovePokemonFromTeam = this.handleRemovePokemonFromTeam.bind(
      this
    );
    this.handleReorderTeamMembers = this.handleReorderTeamMembers.bind(this);

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

  public componentDidUpdate(prevProps: Props): void {
    const { team } = this.props;

    if (!isEqual(team, prevProps.team)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(() => ({
        errors: {},
        isTouched: false,
        isValid: false,
        teamMembers: getOr([], ["team", "members"], this.props),
        teamName: getOr("", ["team", "name"], this.props)
      }));
    }
  }

  public handleTeamNameChange(e: ChangeEvent<HTMLInputElement>): void {
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

  public handleAddPokemonToTeam(pokemon: Pokemon, order: number): void {
    this.setState(state => {
      const newState = {
        ...state,
        teamMembers: [
          ...state.teamMembers,
          { id: getUniqueId(), order, pokemon }
        ]
      };

      return {
        ...newState,
        ...validate(newState, { setTouched: true })
      };
    });
  }

  public handleRemovePokemonFromTeam(memberId: string): void {
    this.setState(state => ({
      isTouched: true,
      teamMembers: state.teamMembers.filter(
        teamMember => teamMember.id !== memberId
      )
    }));
  }

  public handleReorderTeamMembers(members: TeamMember[]): void {
    this.setState(() => ({
      isTouched: true,
      teamMembers: members
    }));
  }

  public handleUpsertTeam(): void {
    const { team, createTeamMutation, updateTeamMutation } = this.props;
    const { teamName, teamMembers, isValid } = this.state;
    const teamId = getOr(undefined, "id", team);

    if (isValid && teamName && teamMembers) {
      const input = teamMembers.map(member => ({
        pokemonId: get(["pokemon", "id"], member),
        order: get(["order"], member)
      }));

      if (teamId) {
        updateTeamMutation({
          variables: {
            team: {
              id: teamId,
              name: teamName,
              members: input
            }
          }
        });
      } else {
        createTeamMutation({
          variables: {
            team: {
              name: teamName,
              members: input
            }
          }
        });
      }
    }
  }

  public handleDeleteTeam(): void {
    const { team, deleteTeamMutation } = this.props;

    if (team) {
      deleteTeamMutation({
        variables: {
          team: {
            id: team.id
          }
        }
      });
    }
  }

  public render(): JSX.Element {
    const {
      team,
      currentSearchPokemon,
      createdTeamId,
      deletedTeamId,
      loading,
      error
    } = this.props;
    const { teamName, teamMembers, errors, isTouched, isValid } = this.state;
    const nameErrorMessage = propOr(undefined, "name", errors);
    const nameHasError = isTouched && !!nameErrorMessage;

    if (createdTeamId) {
      Router.push(`/team/edit/${createdTeamId}`);
    }

    if (deletedTeamId) {
      Router.push("/");
    }

    return (
      <>
        <CenteredRow stackVertically>
          <GiantInput
            aria-label="Choose a team name"
            placeholder="Choose a team name"
            onChange={this.handleTeamNameChange}
            value={teamName}
            isInvalid={nameHasError}
          />

          {isTouched && nameHasError && nameErrorMessage && (
            <ErrorMessage>{nameErrorMessage}</ErrorMessage>
          )}

          {!!error && (
            <ErrorMessage key="Error message">{error.message}</ErrorMessage>
          )}

          {loading && !error ? (
            <LoadingIcon key="Loading icon" spinner />
          ) : null}

          <div>
            <CtaButton
              key={team ? "Save button" : "Create button"}
              onClick={this.handleUpsertTeam}
              disabled={!isTouched || !!error || !!loading || !isValid}
              css={css`
                display: inline-block;
                margin-right: ${variables.spacing.md}px;
              `}
            >
              {team ? "Save team" : "Create this team!"}
            </CtaButton>

            {!!team && (
              <CtaButton
                key="Delete team"
                onClick={this.handleDeleteTeam}
                css={css`
                  display: inline-block;
                `}
              >
                Delete team
              </CtaButton>
            )}
          </div>
        </CenteredRow>

        <TeamView
          teamMembers={teamMembers}
          currentSearchPokemon={currentSearchPokemon}
          addPokemonToTeam={this.handleAddPokemonToTeam}
          removePokemonFromTeam={this.handleRemovePokemonFromTeam}
          reorderTeamMembers={this.handleReorderTeamMembers}
        />
      </>
    );
  }
}

export default TeamBuilder;

import { ApolloError } from "apollo-client";
import { map, merge, getOr, isEmpty, concat } from "lodash/fp";
import Router from "next/router";
import React, { FocusEvent, Component } from "react";
import { css } from "styled-components/macro";
import { Pokemon, Team, TeamMember, TeamInput } from "../../types";
import CenteredRow from "../CenteredRow";
import { CtaButton } from "../Cta";
import ErrorMessage from "../ErrorMessage";
import GiantInput from "../GiantInput";
import LoadingIcon from "../LoadingIcon";
import TeamView from "../TeamView";

interface Props {
  team: Team;
  currentSearchPokemon?: Pokemon;
  createdTeamId?: string;
  deletedTeamId?: string;
  loading?: boolean;
  error?: ApolloError;
  createTeamMutation: (mutation: { variables: { team: TeamInput } }) => void;
  updateTeamMutation: (mutation: { variables: { team: TeamInput } }) => void;
  deleteTeamMutation: (mutation: {
    variables: {
      team: {
        id: string;
      };
    };
  }) => void;
}

const transformMembersToInput = map(
  ({ id, order, pokemon: { id: pokemonId } }) => ({
    id,
    order,
    pokemonId
  })
);

const transformTeamToInput = ({ id, name, members }: Team): TeamInput => ({
  id,
  name,
  members: transformMembersToInput(members)
});

class TeamBuilder extends Component<Props> {
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
  }

  public handleTeamNameChange(e: FocusEvent<HTMLInputElement>): void {
    const { value } = e.target;
    const { team } = this.props;
    const newTeam = merge(transformTeamToInput(team), { name: value });

    this.handleUpsertTeam(newTeam);
  }

  public handleAddPokemonToTeam(pokemon: Pokemon, order: number): void {
    const { team } = this.props;
    const teamInput = transformTeamToInput(team);

    const newTeam = merge(teamInput, {
      members: concat(getOr([], "members", teamInput), [
        { order, pokemonId: pokemon.id }
      ])
    });

    this.handleUpsertTeam(newTeam);
  }

  public handleRemovePokemonFromTeam(memberId: string): void {
    const { team } = this.props;
    const transformedTeam = transformTeamToInput(team);

    const newTeam: TeamInput = {
      ...transformedTeam,
      members: transformedTeam.members.filter(
        member => getOr(null, "id", member) !== memberId
      )
    };

    this.handleUpsertTeam(newTeam);
  }

  public handleReorderTeamMembers(members: TeamMember[]): void {
    const { team } = this.props;
    const newTeam = merge(transformTeamToInput(team), {
      members: transformMembersToInput(members)
    });

    this.handleUpsertTeam(newTeam);
  }

  public handleUpsertTeam(newTeam: TeamInput): void {
    const { createTeamMutation, updateTeamMutation } = this.props;
    const variables = { team: newTeam };

    if (newTeam.id) {
      updateTeamMutation({ variables });
    } else {
      createTeamMutation({ variables });
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

    if (createdTeamId) {
      const url = `/team/edit/${createdTeamId}`;
      Router.replace(url, url, { shallow: true });
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
            defaultValue={team.name}
            onBlur={this.handleTeamNameChange}
          />

          {!!error && (
            <ErrorMessage key="Error message">{error.message}</ErrorMessage>
          )}

          {loading && !error ? (
            <LoadingIcon key="Loading icon" spinner />
          ) : null}

          {!isEmpty(team) && (
            <CtaButton
              onClick={this.handleDeleteTeam}
              css={css`
                display: inline-block;
              `}
            >
              Delete team
            </CtaButton>
          )}
        </CenteredRow>

        <TeamView
          teamMembers={getOr([], "members", team)}
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

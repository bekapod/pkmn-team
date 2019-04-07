import { ApolloError } from "apollo-client";
import { map, merge, getOr, concat, get, find, pipe } from "lodash/fp";
import Router from "next/router";
import React, { FocusEvent, Component, KeyboardEvent } from "react";
import { Pokemon, Team, TeamMember, TeamInput } from "../../types";
import CenteredRow from "../CenteredRow";
import { CtaButton } from "../Cta";
import ErrorMessage from "../ErrorMessage";
import GiantInput from "../GiantInput";
import LoadingIcon from "../LoadingIcon";
import TeamView from "../TeamView";
import { getUniqueId } from "../../helpers/general";
import StickyBar from "../StickyBar";
import * as variables from "../../helpers/variables";

interface Props {
  team: Team;
  currentSearchPokemon?: Pokemon;
  createdTeamId?: string;
  deletedTeamId?: string;
  loading?: boolean;
  error?: ApolloError;
  createTeamMutation: (mutation: { variables: { team: TeamInput } }) => void;
  updateTeamMutation: (mutation: {
    variables: { team: TeamInput };
    optimisticResponse: { __typename: "Mutation"; updateTeam: Team };
  }) => void;
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

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSaveTeam = this.handleSaveTeam.bind(this);
    this.handleTeamNameChange = this.handleTeamNameChange.bind(this);
    this.handleUpsertTeam = this.handleUpsertTeam.bind(this);
    this.handleDeleteTeam = this.handleDeleteTeam.bind(this);
    this.handleAddPokemonToTeam = this.handleAddPokemonToTeam.bind(this);
    this.handleRemovePokemonFromTeam = this.handleRemovePokemonFromTeam.bind(
      this
    );
    this.handleReorderTeamMembers = this.handleReorderTeamMembers.bind(this);
  }

  public handleKeyPress(e: KeyboardEvent<HTMLInputElement>): void {
    if (e.key === "Enter") {
      this.handleTeamNameChange(e);
    }
  }

  public handleSaveTeam(): void {
    const { team } = this.props;
    const newTeam = transformTeamToInput(team);

    this.handleUpsertTeam(newTeam);
  }

  public handleTeamNameChange(
    e: FocusEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>
  ): void {
    const { value } = e.target as HTMLInputElement;
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
      members: transformedTeam.members.filter(({ id }) => id !== memberId)
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
    const {
      team,
      currentSearchPokemon,
      createTeamMutation,
      updateTeamMutation
    } = this.props;
    const mutationVariables = { team: newTeam };

    if (newTeam.id) {
      updateTeamMutation({
        variables: mutationVariables,
        optimisticResponse: {
          __typename: "Mutation",
          updateTeam: {
            id: newTeam.id,
            name: newTeam.name,
            createdAt: team.createdAt,
            __typename: "Team",
            members: newTeam.members.map(member => ({
              order: member.order,
              id: member.id || getUniqueId(),
              pokemon: pipe(
                find(({ id }) => member.id === id),
                get("pokemon")
              )(team.members) || { ...currentSearchPokemon, moves: [] },
              __typename: "TeamMember"
            }))
          }
        }
      });
    } else {
      createTeamMutation({ variables: mutationVariables });
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
        <StickyBar>
          {!error && !loading ? (
            <>
              <CtaButton onClick={this.handleSaveTeam} small>
                Save team
              </CtaButton>
              <CtaButton onClick={this.handleDeleteTeam} small>
                Delete team
              </CtaButton>
            </>
          ) : null}

          {!!error && (
            <ErrorMessage key="Error message" color={variables.colors.white}>
              {error.message}
            </ErrorMessage>
          )}

          {loading && !error ? (
            <LoadingIcon
              key="Loading icon"
              spinner
              small
              color={variables.colors.white}
            />
          ) : null}
        </StickyBar>

        <CenteredRow stackVertically>
          <GiantInput
            aria-label="Choose a team name"
            placeholder="Choose a team name"
            defaultValue={team.name}
            onBlur={this.handleTeamNameChange}
            onKeyPress={this.handleKeyPress}
          />
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

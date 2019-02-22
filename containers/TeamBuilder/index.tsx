import { getOr } from "lodash/fp";
import React, { PureComponent } from "react";
import { adopt } from "react-adopt";
import {
  Mutation,
  MutationResult,
  OperationVariables,
  Query,
  QueryResult
} from "react-apollo";
import TeamBuilder from "../../components/TeamBuilder";
import { createTeam, updateTeam } from "../../mutations/team";
import { getCurrentSearchPokemon } from "../../queries/search";
import { getTeamById } from "../../queries/team";
import { Pokemon, Team } from "../../types";

interface Props {
  query?: { teamId?: string };
}

interface QueryProps {
  createTeamMutation: {
    mutation: (mutation: {
      variables: {
        name: string;
        members: { pokedexId: number; order: number }[];
      };
    }) => void;
    result: MutationResult<{ createTeam: Team }>;
  };
  updateTeamMutation: {
    mutation: (mutation: {
      variables: {
        id: string;
        name: string;
        members: { pokedexId: number; order: number }[];
      };
    }) => void;
    result: MutationResult<{ updateTeam: Team }>;
  };
  getTeamQuery?: QueryResult<{ teamById: Team }, OperationVariables>;
  getCurrentSearchPokemonQuery: QueryResult<
    { currentSearchPokemon: Pokemon },
    OperationVariables
  >;
}

const mutations = {
  createTeamMutation: ({ render }: any) => (
    <Mutation mutation={createTeam}>
      {(mutation, result) => render({ mutation, result })}
    </Mutation>
  ),
  updateTeamMutation: ({ render }: any) => (
    <Mutation mutation={updateTeam}>
      {(mutation, result) => render({ mutation, result })}
    </Mutation>
  )
};

const queries = {
  getCurrentSearchPokemonQuery: ({ render }: any) => (
    <Query query={getCurrentSearchPokemon}>{render}</Query>
  ),
  getTeamQuery: ({ teamId, render }: any) =>
    teamId ? (
      <Query query={getTeamById} variables={{ id: teamId }}>
        {render}
      </Query>
    ) : (
      render()
    )
};

const WithQueriesAndMutations = adopt({ ...queries, ...mutations });

class TeamBuilderContainer extends PureComponent<Props> {
  public render(): JSX.Element {
    const teamId = getOr(null, ["query", "teamId"], this.props);

    return (
      <WithQueriesAndMutations teamId={teamId}>
        {({
          createTeamMutation: {
            mutation: createTeamMutation,
            result: {
              data: createdTeam,
              loading: createTeamLoading,
              error: createTeamError
            }
          },
          updateTeamMutation: {
            mutation: updateTeamMutation,
            result: { loading: updateTeamLoading, error: updateTeamError }
          },
          getCurrentSearchPokemonQuery,
          getTeamQuery
        }: QueryProps) => {
          const team = getOr(undefined, ["data", "teamById"], getTeamQuery);
          const currentSearchPokemon = getOr(
            undefined,
            ["data", "currentSearchPokemon"],
            getCurrentSearchPokemonQuery
          );

          return (
            <TeamBuilder
              {...this.props}
              team={team}
              currentSearchPokemon={currentSearchPokemon}
              createTeamMutation={createTeamMutation}
              updateTeamMutation={updateTeamMutation}
              createdTeamId={createdTeam && createdTeam.createTeam.id}
              loading={createTeamLoading || updateTeamLoading}
              error={createTeamError || updateTeamError}
            />
          );
        }}
      </WithQueriesAndMutations>
    );
  }
}

export default TeamBuilderContainer;

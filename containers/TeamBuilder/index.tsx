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
import { createTeam, updateTeam, deleteTeam } from "../../mutations/team";
import { getCurrentSearchPokemon } from "../../queries/search";
import { getTeamById } from "../../queries/team";
import { Pokemon, Team, TeamInput } from "../../types";

interface Props {
  query?: { teamId?: string };
}

interface QueryProps {
  createTeamMutation: {
    mutation: (mutation: {
      variables: {
        team: TeamInput;
      };
    }) => void;
    result: MutationResult<{ createTeam: Team }>;
  };
  updateTeamMutation: {
    mutation: (mutation: {
      variables: {
        team: TeamInput;
        optimisticResponse: { __typename: "Mutation"; updateTeam: Team };
      };
    }) => void;
    result: MutationResult<{ updateTeam: Team }>;
  };
  deleteTeamMutation: {
    mutation: (mutation: {
      variables: {
        team: {
          id: string;
        };
      };
    }) => void;
    result: MutationResult<{ deleteTeam: Team }>;
  };
  getTeamQuery?: QueryResult<{ team: Team }, OperationVariables>;
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
  ),
  deleteTeamMutation: ({ render }: any) => (
    <Mutation mutation={deleteTeam}>
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
            result: {
              data: updatedTeam,
              loading: updateTeamLoading,
              error: updateTeamError
            }
          },
          deleteTeamMutation: {
            mutation: deleteTeamMutation,
            result: {
              data: deletedTeam,
              loading: deleteTeamLoading,
              error: deleteTeamError
            }
          },
          getCurrentSearchPokemonQuery,
          getTeamQuery
        }: QueryProps) => {
          const team =
            getOr(undefined, ["updateTeam"], updatedTeam) ||
            getOr({}, ["data", "team"], getTeamQuery);

          return (
            <TeamBuilder
              {...this.props}
              team={team}
              currentSearchPokemon={
                getCurrentSearchPokemonQuery.data.currentSearchPokemon
              }
              createTeamMutation={createTeamMutation}
              updateTeamMutation={updateTeamMutation}
              deleteTeamMutation={deleteTeamMutation}
              createdTeamId={createdTeam && createdTeam.createTeam.id}
              deletedTeamId={deletedTeam && deletedTeam.deleteTeam.id}
              loading={
                createTeamLoading || updateTeamLoading || deleteTeamLoading
              }
              error={createTeamError || updateTeamError || deleteTeamError}
            />
          );
        }}
      </WithQueriesAndMutations>
    );
  }
}

export default TeamBuilderContainer;

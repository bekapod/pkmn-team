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
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import * as teamBuilderActions from "../../actions/teamBuilder";
import Page from "../../components/Page";
import TeamBuilder from "../../components/TeamBuilder";
import { createTeam, updateTeam } from "../../mutations/team";
import { getAllPokemon } from "../../queries/pokemon";
import { getTeamById } from "../../queries/team";
import * as teamBuilderSelectors from "../../selectors/teamBuilder";
import { IPokemon, IState, ITeam, ITeamMember } from "../../types";

interface IProps {
  addPokemonToTeam: (_: ITeamMember) => void;
  removePokemonFromTeam: (_: { id: string }) => void;
  setCurrentSearchPokemon: (_: IPokemon) => void;
  setTeamName: (_: string) => void;
  setTeamMembers: (_: ITeamMember[]) => void;
  teamBuilderName?: string;
  teamBuilderMembers: { [key: string]: ITeamMember };
  teamBuilderCurrentSearchPokemon?: IPokemon;
  match?: { params: { teamId?: string } };
}

interface IQueryProps {
  createTeamMutation: {
    mutation: (
      mutation: {
        variables: {
          name: string;
          pokedexIds: number[];
        };
      }
    ) => void;
    result: MutationResult<{ createTeam: ITeam }>;
  };
  updateTeamMutation: {
    mutation: (
      mutation: {
        variables: {
          id: string;
          name: string;
          pokedexIds: number[];
        };
      }
    ) => void;
    result: MutationResult<{ updateTeam: ITeam }>;
  };
  getAllPokemonQuery: QueryResult<
    { allPokemon: IPokemon[] },
    OperationVariables
  >;
  getTeamQuery?: QueryResult<{ teamById: ITeam }, OperationVariables>;
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
  getAllPokemonQuery: ({ render }: any) => (
    <Query query={getAllPokemon}>{render}</Query>
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

class TeamBuilderContainer extends PureComponent<IProps> {
  public render() {
    const teamId = getOr(null, "match.params.teamId", this.props);

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
          getAllPokemonQuery: {
            data: allPokemonData,
            loading: allPokemonLoading,
            error: allPokemonError
          },
          getTeamQuery
        }: IQueryProps) => {
          const team = getOr(undefined, "data.teamById", getTeamQuery);

          return (
            <Page
              title={team ? "Edit Team" : "Create a Team"}
              loading={
                allPokemonLoading || getOr(false, "loading", getTeamQuery)
              }
              error={allPokemonError || getOr(undefined, "error", getTeamQuery)}
            >
              <TeamBuilder
                {...this.props}
                team={team}
                pokemon={getOr([], "allPokemon", allPokemonData)}
                createTeamMutation={createTeamMutation}
                updateTeamMutation={updateTeamMutation}
                createdTeamId={createdTeam && createdTeam.createTeam.id}
                loading={createTeamLoading || updateTeamLoading}
                error={createTeamError || updateTeamError}
              />
            </Page>
          );
        }}
      </WithQueriesAndMutations>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  teamBuilderCurrentSearchPokemon: teamBuilderSelectors.getTeamBuilderCurrentSearchPokemon(
    state
  ),
  teamBuilderMembers: teamBuilderSelectors.getTeamBuilderMembers(state),
  teamBuilderName: teamBuilderSelectors.getTeamBuilderName(state)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(teamBuilderActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamBuilderContainer);

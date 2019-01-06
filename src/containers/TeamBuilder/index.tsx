import { getOr } from "lodash/fp";
import React, { PureComponent } from "react";
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
import { createTeam } from "../../mutations/team";
import { getAllPokemon } from "../../queries/pokemon";
import * as teamBuilderSelectors from "../../selectors/teamBuilder";
import { IPokemon, IState, ITeam, ITeamMember } from "../../types";

interface IProps {
  addPokemonToTeam: (_: ITeamMember) => void;
  removePokemonFromTeam: (_: { id: string }) => void;
  setCurrentSearchPokemon: (_: IPokemon) => void;
  setTeamName: (_: string) => void;
  teamBuilderName?: string;
  teamBuilderMembers: { [key: string]: ITeamMember };
  teamBuilderCurrentSearchPokemon?: IPokemon;
}

type QueryProps = QueryResult<{ allPokemon: IPokemon[] }, OperationVariables>;
type MutationProps = MutationResult<{ createTeam: ITeam }>;

class TeamBuilderContainer extends PureComponent<IProps> {
  public render() {
    return (
      <Mutation mutation={createTeam}>
        {(
          createTeamMutation,
          { data: mutationData /* , loading, error */ }: MutationProps
        ) => (
          <Query query={getAllPokemon}>
            {({ data: queryData, loading, error }: QueryProps) => (
              <Page title="Create a Team" loading={loading} error={error}>
                <TeamBuilder
                  {...this.props}
                  pokemon={getOr([], "allPokemon", queryData)}
                  createTeamMutation={createTeamMutation}
                  createdTeamId={mutationData && mutationData.createTeam.id}
                />
              </Page>
            )}
          </Query>
        )}
      </Mutation>
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

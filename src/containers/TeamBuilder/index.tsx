import React, { PureComponent } from "react";
import { Query, Mutation, QueryResult, OperationVariables, MutationResult } from "react-apollo";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { applySpec, propOr, compose } from "ramda";
import { getAllPokemon } from "../../queries/pokemon";
import { createTeam } from "../../mutations/team";
import * as teamBuilderActions from "../../actions/teamBuilder";
import * as teamBuilderSelectors from "../../selectors/teamBuilder";
import TeamBuilder from "../../components/TeamBuilder";
import { Pokemon, TeamMember, Team } from "../../types";;

type Props = {
  addPokemonToTeam: (_: TeamMember) => void;
  removePokemonFromTeam: (_: { id: string }) => void;
  setCurrentSearchPokemon: (_: Pokemon) => void;
  setTeamName: (_: string) => void;
  teamBuilderName?: string;
  teamBuilderMembers: { [key: string]: TeamMember };
  teamBuilderCurrentSearchPokemon?: Pokemon;
};

type QueryProps = QueryResult<{ allPokemon: Pokemon[]; }, OperationVariables>
type MutationProps = MutationResult<{ createTeam: Team; }>

class TeamBuilderContainer extends PureComponent<Props> {
  static defaultProps = {
    teamBuilderName: undefined,
    teamBuilderCurrentSearchPokemon: undefined
  };

  render() {
    return (
      <Mutation mutation={createTeam}>
        {(createTeamMutation, { data: mutationData /* , loading, error */ }: MutationProps) => (
          <Query query={getAllPokemon}>
            {({ data: queryData /* , loading, error */ }: QueryProps) => (
              queryData && (
                <TeamBuilder
                  {...this.props}
                  pokemon={queryData.allPokemon}
                  createTeamMutation={createTeamMutation}
                  createdTeamId={mutationData && mutationData.createTeam.id}
                />
              )
            )}
          </Query>
        )}
      </Mutation>
    );
  }
}

const mapStateToProps = applySpec({
  teamBuilderName: teamBuilderSelectors.getTeamBuilderName,
  teamBuilderMembers: teamBuilderSelectors.getTeamBuilderMembers,
  teamBuilderCurrentSearchPokemon:
    teamBuilderSelectors.getTeamBuilderCurrentSearchPokemon
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(teamBuilderActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamBuilderContainer);

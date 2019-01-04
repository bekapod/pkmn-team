// @flow
import React, { PureComponent } from "react";
import { Query, Mutation } from "react-apollo";
import { bindActionCreators, type Dispatch } from "redux";
import { connect } from "react-redux";
import { applySpec, propOr, compose } from "ramda";
import { getAllPokemon } from "../../queries/pokemon";
import { createTeam } from "../../mutations/team";
import * as teamBuilderActions from "../../actions/teamBuilder";
import * as teamBuilderSelectors from "../../selectors/teamBuilder";
import TeamBuilder from "../../components/TeamBuilder";
import type { Pokemon, TeamMember } from "../../types";

type QueryResponse = {
  data: {
    allPokemon: Array<Pokemon>
  }
};

type MutationResponse = {
  data: {
    createTeam: {
      id: string
    }
  }
};

type Props = {
  addPokemonToTeam: TeamMember => void,
  removePokemonFromTeam: TeamMember => void,
  setCurrentSearchPokemon: Pokemon => void,
  setTeamName: string => void,
  teamBuilderName?: string,
  teamBuilderMembers: { [key: string]: TeamMember },
  teamBuilderCurrentSearchPokemon?: Pokemon
};

class TeamBuilderContainer extends PureComponent<Props> {
  static defaultProps = {
    teamBuilderName: undefined,
    teamBuilderCurrentSearchPokemon: undefined
  };

  render() {
    return (
      <Mutation mutation={createTeam}>
        {(
          createTeamMutation: ({
            variables: {
              name: string,
              pokedexIds: Array<number>
            }
          }) => void,
          { data: mutationData /* , loading, error */ }: MutationResponse
        ) => (
          <Query query={getAllPokemon}>
            {({ data: queryData /* , loading, error */ }: QueryResponse) => (
              <TeamBuilder
                {...this.props}
                pokemon={queryData.allPokemon}
                createTeamMutation={createTeamMutation}
                createdTeamId={compose(
                  propOr(undefined, "id"),
                  propOr({}, "createTeam")
                )(mutationData)}
              />
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

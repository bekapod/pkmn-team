import { connect } from "react-redux";
import {
  addPokemonToTeam,
  removePokemonFromTeam
} from "../../actions/teamBuilder";
import TeamView from "../../components/TeamView";
import * as pokemonSearchSelectors from "../../selectors/pokemonSearch";
import * as teamBuilderSelectors from "../../selectors/teamBuilder";
import { IState } from "../../types";

const mapStateToProps = (state: IState) => ({
  pokemonSearchCurrentSelection: pokemonSearchSelectors.getPokemonSearchCurrentSelection(
    state
  ),
  teamBuilderMembers: teamBuilderSelectors.getTeamBuilderMembers(state)
});

const mapDispatchToProps = {
  addPokemonToTeam,
  removePokemonFromTeam
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamView);

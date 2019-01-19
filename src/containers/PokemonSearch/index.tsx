import { getOr } from "lodash/fp";
import React, { PureComponent } from "react";
import { Query } from "react-apollo";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import * as pokemonSearchActions from "../../actions/pokemonSearch";
import PokemonSearch from "../../components/PokemonSearch";
import { getAllPokemon } from "../../queries/pokemon";
import { IPokemon } from "../../types";

interface IProps {
  setCurrentSelection: (_: IPokemon) => void;
}

class PokemonSearchContainer extends PureComponent<IProps> {
  public render() {
    return (
      <Query query={getAllPokemon}>
        {({ data, loading, error }) => {
          return (
            <PokemonSearch
              {...this.props}
              pokemon={getOr([], "allPokemon", data)}
              loading={loading}
              error={error}
            />
          );
        }}
      </Query>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(pokemonSearchActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonSearchContainer);

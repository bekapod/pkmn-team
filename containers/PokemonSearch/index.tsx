import { getOr } from "lodash/fp";
import React, { PureComponent } from "react";
import { Query } from "react-apollo";
import { connect } from "react-redux";
import * as pokemonSearchActions from "../../actions/pokemonSearch";
import PokemonSearch from "../../components/PokemonSearch";
import { getAllPokemon } from "../../queries/pokemon";
import * as pokemonSearchSelectors from "../../selectors/pokemonSearch";
import { IPokemon, IState } from "../../types";

interface IProps {
  highlightedIndex: number;
  inputValue?: string;
  filteredList: IPokemon[];
  setCurrentSelection: (_: IPokemon) => void;
  setHighlightedIndex: (_: number) => void;
  setInputValue: (_: string) => void;
  setUnfilteredList: (_: IPokemon[]) => void;
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

const mapStateToProps = (state: IState) => ({
  filteredList: pokemonSearchSelectors.getPokemonSearchFilteredList(state),
  highlightedIndex: pokemonSearchSelectors.getPokemonSearchHighlightedIndex(
    state
  ),
  inputValue: pokemonSearchSelectors.getPokemonSearchInputValue(state)
});

const mapDispatchToProps = pokemonSearchActions;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonSearchContainer);

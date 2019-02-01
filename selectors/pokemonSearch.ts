import { get } from "lodash/fp";
import { createSelector } from "reselect";

export const getPokemonSearch = get("pokemonSearch");

export const getPokemonSearchCurrentSelection = createSelector(
  getPokemonSearch,
  get("currentSelection")
);

export const getPokemonSearchHighlightedIndex = createSelector(
  getPokemonSearch,
  get("highlightedIndex")
);

export const getPokemonSearchFilteredList = createSelector(
  getPokemonSearch,
  get("filteredList")
);

export const getPokemonSearchInputValue = createSelector(
  getPokemonSearch,
  get("inputValue")
);

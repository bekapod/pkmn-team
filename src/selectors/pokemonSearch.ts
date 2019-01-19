import { get } from "lodash/fp";
import { createSelector } from "reselect";

export const getPokemonSearch = get("pokemonSearch");

export const getPokemonSearchCurrentSelection = createSelector(
  getPokemonSearch,
  get("currentSelection")
);

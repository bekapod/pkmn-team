import { get } from "lodash/fp";
import { createSelector } from "reselect";

export const getTeamBuilder = get("teamBuilder");

export const getTeamBuilderName = createSelector(
  getTeamBuilder,
  get("name")
);

export const getTeamBuilderMembers = createSelector(
  getTeamBuilder,
  get("members")
);

export const getTeamBuilderCurrentSearchPokemon = createSelector(
  getTeamBuilder,
  get("currentSearchPokemon")
);

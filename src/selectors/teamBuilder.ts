import { prop } from "ramda";
import { createSelector, ParametricSelector } from "reselect";
import { State, TeamBuilderState, Pokemon, TeamMember, Team } from "../types";

export const getTeamBuilder: ParametricSelector<State, any, TeamBuilderState> = prop("teamBuilder");

export const getTeamBuilderName = createSelector(
  getTeamBuilder,
  (teamBuilder) => prop("name", teamBuilder)
);

export const getTeamBuilderMembers = createSelector(
  getTeamBuilder,
  (teamBuilder) => prop("members", teamBuilder)
);

export const getTeamBuilderCurrentSearchPokemon = createSelector(
  getTeamBuilder,
  (teamBuilder) => prop("currentSearchPokemon", teamBuilder)
);

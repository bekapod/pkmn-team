import { prop } from "ramda";
import { createSelector, ParametricSelector } from "reselect";
import { IState, ITeamBuilderState } from "../types";

export const getTeamBuilder: ParametricSelector<
  IState,
  any,
  ITeamBuilderState
> = prop("teamBuilder");

export const getTeamBuilderName = createSelector(
  getTeamBuilder,
  teamBuilder => prop("name", teamBuilder)
);

export const getTeamBuilderMembers = createSelector(
  getTeamBuilder,
  teamBuilder => prop("members", teamBuilder)
);

export const getTeamBuilderCurrentSearchPokemon = createSelector(
  getTeamBuilder,
  teamBuilder => prop("currentSearchPokemon", teamBuilder)
);

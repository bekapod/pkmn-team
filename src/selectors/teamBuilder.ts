import { get } from "lodash/fp";
import { createSelector, ParametricSelector } from "reselect";
import { IState, ITeamBuilderState } from "../types";

export const getTeamBuilder: ParametricSelector<
  IState,
  any,
  ITeamBuilderState
> = get("teamBuilder");

export const getTeamBuilderName = createSelector(
  getTeamBuilder,
  teamBuilder => get("name", teamBuilder)
);

export const getTeamBuilderMembers = createSelector(
  getTeamBuilder,
  teamBuilder => get("members", teamBuilder)
);

export const getTeamBuilderCurrentSearchPokemon = createSelector(
  getTeamBuilder,
  teamBuilder => get("currentSearchPokemon", teamBuilder)
);

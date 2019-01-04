// @flow
import { prop } from "ramda";
import { createSelector } from "reselect";
import type { State, TeamBuilderState, Pokemon, TeamMember } from "../types";

export const getTeamBuilder: (state: State) => TeamBuilderState = prop(
  "teamBuilder"
);

export const getTeamBuilderName: (
  state: State
) => string | typeof undefined = createSelector(
  getTeamBuilder,
  prop("name")
);

export const getTeamBuilderMembers: (
  state: State
) => { [key: string]: TeamMember } = createSelector(
  getTeamBuilder,
  prop("members")
);

export const getTeamBuilderCurrentSearchPokemon: (
  state: State
) => Pokemon | typeof undefined = createSelector(
  getTeamBuilder,
  prop("currentSearchPokemon")
);

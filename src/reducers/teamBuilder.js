// @flow
import { handleActions, combineActions, type ActionType } from "redux-actions";
import { compose, assoc, clone, dissoc } from "ramda";
import {
  setTeamName,
  setCurrentSearchPokemon,
  addPokemonToTeam,
  removePokemonFromTeam
} from "../actions/teamBuilder";
import type { TeamBuilderState } from "../types";

const initialState: TeamBuilderState = {
  name: undefined,
  members: {},
  currentSearchPokemon: undefined
};

export default handleActions(
  {
    [combineActions(setTeamName)]: (
      state: TeamBuilderState,
      action: ActionType<typeof setTeamName>
    ) => ({
      ...state,
      name: action.payload
    }),

    [combineActions(addPokemonToTeam)]: (
      state: TeamBuilderState,
      action: ActionType<typeof addPokemonToTeam>
    ) => ({
      ...state,
      members: compose(
        assoc(action.payload.id, action.payload),
        clone
      )(state.members)
    }),

    [combineActions(removePokemonFromTeam)]: (
      state: TeamBuilderState,
      action: ActionType<typeof removePokemonFromTeam>
    ) => ({
      ...state,
      members: compose(
        dissoc(`${action.payload.id}`),
        clone
      )(state.members)
    }),

    [combineActions(setCurrentSearchPokemon)]: (
      state: TeamBuilderState,
      action: ActionType<typeof setCurrentSearchPokemon>
    ) => ({
      ...state,
      currentSearchPokemon: action.payload
    })
  },
  initialState
);

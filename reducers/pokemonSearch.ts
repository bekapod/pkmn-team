import { Action, combineActions, handleActions } from "redux-actions";
import {
  setCurrentSelection,
  setHighlightedIndex,
  setInputValue,
  setUnfilteredList
} from "../actions/pokemonSearch";
import { IPokemonSearchState } from "../types";

export const initialState: IPokemonSearchState = {
  currentSelection: undefined,
  filteredList: [],
  highlightedIndex: 0,
  inputValue: undefined,
  unfilteredList: []
};

type Payload = any;

export default handleActions(
  {
    [combineActions(setCurrentSelection).toString()]: (
      state: IPokemonSearchState,
      action: Action<Payload>
    ) => ({
      ...state,
      currentSelection: action.payload
    }),

    [combineActions(setHighlightedIndex).toString()]: (
      state: IPokemonSearchState,
      action: Action<Payload>
    ) => ({
      ...state,
      highlightedIndex: action.payload
    }),

    [combineActions(setUnfilteredList).toString()]: (
      state: IPokemonSearchState,
      action: Action<Payload>
    ) => ({
      ...state,
      unfilteredList: action.payload
    }),

    [combineActions(setInputValue).toString()]: (
      state: IPokemonSearchState,
      action: Action<Payload>
    ) => ({
      ...state,
      filteredList: action.payload.length
        ? state.unfilteredList.filter(pkmn =>
            pkmn.name.includes(action.payload)
          )
        : state.unfilteredList,
      inputValue: action.payload
    })
  },
  initialState
);

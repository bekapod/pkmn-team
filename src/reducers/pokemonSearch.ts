import { Action, combineActions, handleActions } from "redux-actions";
import { setCurrentSelection } from "../actions/pokemonSearch";
import { IPokemonSearchState } from "../types";

export const initialState: IPokemonSearchState = {
  currentSelection: undefined
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
    })
  },
  initialState
);

import { Action, combineActions, handleActions } from "redux-actions";
import {
  addPokemonToTeam,
  removePokemonFromTeam,
  setCurrentSearchPokemon,
  setTeamName
} from "../actions/teamBuilder";
import { ITeamBuilderState, ITeamMember } from "../types";

export const initialState: ITeamBuilderState = {
  currentSearchPokemon: undefined,
  members: {},
  name: undefined
};

type Payload = any;

export default handleActions(
  {
    [combineActions(setTeamName).toString()]: (
      state: ITeamBuilderState,
      action: Action<Payload>
    ) => ({
      ...state,
      name: action.payload
    }),

    [combineActions(addPokemonToTeam).toString()]: (
      state: ITeamBuilderState,
      action: Action<Payload>
    ) => ({
      ...state,
      members: {
        ...state.members,
        [action.payload.id]: action.payload
      }
    }),

    [combineActions(removePokemonFromTeam).toString()]: (
      state: ITeamBuilderState,
      action: Action<Payload>
    ) => ({
      ...state,
      members: Object.keys(state.members).reduce(
        (members: { [key: string]: ITeamMember }, id: string) => {
          if (id !== action.payload.id) {
            members[id] = state.members[id];
          }
          return members;
        },
        {}
      )
    }),

    [combineActions(setCurrentSearchPokemon).toString()]: (
      state: ITeamBuilderState,
      action: Action<Payload>
    ) => ({
      ...state,
      currentSearchPokemon: action.payload
    })
  },
  initialState
);

import { handleActions, combineActions, Action } from "redux-actions";
import { compose, assoc, clone, dissoc } from "ramda";
import {
  setTeamName,
  setCurrentSearchPokemon,
  addPokemonToTeam,
  removePokemonFromTeam
} from "../actions/teamBuilder";
import { TeamBuilderState, TeamMember, Team } from "../types";

const initialState: TeamBuilderState = {
  name: undefined,
  members: {},
  currentSearchPokemon: undefined
};

type Payload = any

export default handleActions(
  {
    [combineActions(setTeamName).toString()]: (
      state: TeamBuilderState,
      action: Action<Payload>
    ) => ({
      ...state,
      name: action.payload
    }),

    [combineActions(addPokemonToTeam).toString()]: (
      state: TeamBuilderState,
      action: Action<Payload>
    ) => ({
      ...state,
      members: {
        ...state.members,
        [action.payload.id]: action.payload
      }
    }),

    [combineActions(removePokemonFromTeam).toString()]: (
      state: TeamBuilderState,
      action: Action<Payload>
    ) => ({
      ...state,
      members: Object.keys(state.members).reduce((members: { [key: string]: TeamMember }, id: string) => {
        if (id !== action.payload.id) {
          members[id] = state.members[id]
        }
        return members
      }, {})
    }),

    [combineActions(setCurrentSearchPokemon).toString()]: (
      state: TeamBuilderState,
      action: Action<Payload>
    ) => ({
      ...state,
      currentSearchPokemon: action.payload
    })
  },
  initialState
);

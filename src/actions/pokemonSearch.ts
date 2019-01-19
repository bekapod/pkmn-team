import { createAction } from "redux-actions";
import { IPokemon } from "../types";

export const setCurrentSelection = createAction(
  "pokemon_search/set_current_selection",
  (pokemon: IPokemon) => pokemon
);

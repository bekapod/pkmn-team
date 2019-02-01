import { createAction } from "redux-actions";
import { IPokemon } from "../types";

export const setCurrentSelection = createAction(
  "pokemon_search/set_current_selection",
  (pokemon: IPokemon) => pokemon
);

export const setHighlightedIndex = createAction(
  "pokemon_search/set_highlighted_index",
  (index: number) => index
);

export const setInputValue = createAction(
  "pokemon_search/set_input_value",
  (value: string) => value
);

export const setUnfilteredList = createAction(
  "pokemon_search/set_unfiltered_list",
  (pokemon: IPokemon[]) => pokemon
);

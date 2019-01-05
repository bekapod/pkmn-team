import { createAction } from "redux-actions";
import { Pokemon, TeamMember } from "../types";

export const setTeamName = createAction(
  "team_builder/set_team_name",
  (name: string) => name
);
export const addPokemonToTeam = createAction(
  "team_builder/add_pokemon_to_team",
  (member: TeamMember) => member
);
export const removePokemonFromTeam = createAction(
  "team_builder/remove_pokemon_from_team",
  (member: { id: string }) => member
);
export const setCurrentSearchPokemon = createAction(
  "team_builder/set_current_search_pokemon",
  (pokemon: Pokemon) => pokemon
);

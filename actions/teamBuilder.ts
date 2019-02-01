import { createAction } from "redux-actions";
import { ITeamMember } from "../types";

export const setTeamName = createAction(
  "team_builder/set_team_name",
  (name: string) => name
);
export const setTeamMembers = createAction(
  "team_builder/set_team_members",
  (members: ITeamMember[]) => members
);
export const addPokemonToTeam = createAction(
  "team_builder/add_pokemon_to_team",
  (member: ITeamMember) => member
);
export const removePokemonFromTeam = createAction(
  "team_builder/remove_pokemon_from_team",
  (member: { id: string }) => member
);

import {} from "styled-components/cssprop"; // eslint-disable-line import/no-unresolved

export type Type =
  | "NORMAL"
  | "FIGHTING"
  | "FLYING"
  | "POISON"
  | "GROUND"
  | "ROCK"
  | "BUG"
  | "GHOST"
  | "STEEL"
  | "FIRE"
  | "WATER"
  | "GRASS"
  | "ELECTRIC"
  | "PSYCHIC"
  | "ICE"
  | "DRAGON"
  | "DARK"
  | "FAIRY"
  | "UNKNOWN"
  | "SHADOW";

export interface Pokemon {
  id: string;
  pokedexId: number;
  name: string;
  types: { name: Type }[];
  sprite: string;
}

export interface TeamMember {
  id?: string;
  order: number;
  pokemon: Pokemon;
}

export interface Team {
  id: string;
  name: string;
  members: TeamMember[];
  insertedAt: string;
}

export interface TeamBuilderState {
  name: string;
  members: { [key: string]: TeamMember };
}

export interface PokemonSearchState {
  currentSelection?: Pokemon;
  highlightedIndex: number;
  inputValue?: string;
  filteredList: Pokemon[];
  unfilteredList: Pokemon[];
}

export interface State {
  teamBuilder: TeamBuilderState;
  pokemonSearch: PokemonSearchState;
}

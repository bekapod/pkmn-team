import {} from "styled-components/cssprop"; // eslint-disable-line import/no-unresolved

export type TypeSlug =
  | "normal"
  | "fighting"
  | "flying"
  | "poison"
  | "ground"
  | "rock"
  | "bug"
  | "ghost"
  | "steel"
  | "fire"
  | "water"
  | "grass"
  | "electric"
  | "psychic"
  | "ice"
  | "dragon"
  | "dark"
  | "fairy"
  | "unknown"
  | "shadow"
  | "physical"
  | "special"
  | "status";

export interface Error {
  message: string;
  details: {
    field: string;
    errors: string[];
  };
}

export interface Type {
  name: string;
  slug: TypeSlug;
  __typename?: "Type";
}

export interface Move {
  name: string;
  slug: string;
  type: Type;
  damageClass: "physical" | "special" | "status";
  accuracy?: number;
  power?: number;
  pp: number;
  __typename?: "Move";
}

export interface MoveVariation {
  levelLearnedAt: number;
  learnMethod: string;
  version: string;
}

export interface PokemonMove extends MoveVariation {
  move: Move;
  __typename?: "PokemonMove";
}

export interface DeduplicatedMove extends Move {
  variations: MoveVariation[];
}

export interface Pokemon {
  id: string;
  pokedexId: number;
  name: string;
  slug: string;
  types: Type[];
  sprite: string;
  moves?: PokemonMove[];
  __typename?: "Pokemon";
}

export interface TeamMember {
  id: string;
  order: number;
  pokemon: Pokemon;
  __typename?: "TeamMember";
}

export interface Team {
  id: string;
  name: string;
  members: TeamMember[];
  createdAt: string;
  error?: Error;
  __typename?: "Team";
}

export interface TeamInput {
  id?: string;
  name: string;
  members: {
    id?: string;
    order: number;
    pokemonId: string;
  }[];
}

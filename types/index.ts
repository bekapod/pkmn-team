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

export interface Type {
  name: string;
  slug: TypeSlug;
}

export interface Move {
  name: string;
  slug: string;
  types: Type[];
  damageClass: "physical" | "special" | "status";
  accuracy?: number;
  power?: number;
  pp: number;
}

export interface MoveVariation {
  levelLearnedAt: number;
  learnMethod: string;
  version: string;
}

export interface PokemonMove extends MoveVariation {
  move: Move;
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
}

export interface TeamMember {
  id: string;
  order: number;
  pokemon: Pokemon;
}

export interface Team {
  id: string;
  name: string;
  members: TeamMember[];
  insertedAt: string;
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

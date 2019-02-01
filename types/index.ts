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

export interface IPokemon {
  id: string;
  pokedexId: number;
  name: string;
  types: Type[];
  sprite: string;
}

export interface ITeamMember {
  id: string;
  pokemon: IPokemon;
}

export interface ITeam {
  id: string;
  name: string;
  members: ITeamMember[];
  createdAt: string;
}

export interface ITeamBuilderState {
  name: string;
  members: { [key: string]: ITeamMember };
}

export interface IPokemonSearchState {
  currentSelection?: IPokemon;
  highlightedIndex: number;
  inputValue?: string;
  filteredList: IPokemon[];
  unfilteredList: IPokemon[];
}

export interface IState {
  teamBuilder: ITeamBuilderState;
  pokemonSearch: IPokemonSearchState;
}

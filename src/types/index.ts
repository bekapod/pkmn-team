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

export type Pokemon = {
  id: string;
  pokedexId: number;
  name: string;
  types: Type[];
  sprite: string;
};

export type TeamMember = {
  id: string;
  pokemon: Pokemon;
};

export type Team = {
  id: string;
  name: string;
  members: Array<TeamMember>;
  createdAt: string;
};

export type TeamBuilderState = {
  name?: string;
  members: { [key: string]: TeamMember };
  currentSearchPokemon?: Pokemon;
};

export type State = {
  teamBuilder: TeamBuilderState;
};

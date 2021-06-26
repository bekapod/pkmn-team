import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Time: any;
};

export type Ability = Node & {
  __typename?: 'Ability';
  id: Scalars['ID'];
  slug: Scalars['String'];
  name: Scalars['String'];
  effect?: Maybe<Scalars['String']>;
  pokemon: PokemonWithAbilityConnection;
};

export type AbilityConnection = {
  __typename?: 'AbilityConnection';
  edges?: Maybe<Array<Maybe<AbilityEdge>>>;
  pageInfo: PageInfo;
};

export type AbilityEdge = {
  __typename?: 'AbilityEdge';
  cursor: Scalars['String'];
  node?: Maybe<Ability>;
};

export enum Color {
  Black = 'BLACK',
  Blue = 'BLUE',
  Brown = 'BROWN',
  Gray = 'GRAY',
  Green = 'GREEN',
  Pink = 'PINK',
  Purple = 'PURPLE',
  Red = 'RED',
  White = 'WHITE',
  Yellow = 'YELLOW'
}

export type CreateTeamInput = {
  name: Scalars['String'];
  members?: Maybe<Array<CreateTeamMemberInput>>;
};

export type CreateTeamMemberInput = {
  pokemonId: Scalars['ID'];
  slot: Scalars['Int'];
};

export enum DamageClass {
  Physical = 'PHYSICAL',
  Special = 'SPECIAL',
  Status = 'STATUS'
}

export type EggGroup = Node & {
  __typename?: 'EggGroup';
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type EggGroupConnection = {
  __typename?: 'EggGroupConnection';
  edges?: Maybe<Array<Maybe<EggGroupEdge>>>;
  pageInfo: PageInfo;
};

export type EggGroupEdge = {
  __typename?: 'EggGroupEdge';
  cursor: Scalars['String'];
  node?: Maybe<EggGroup>;
};

export enum EvolutionTrigger {
  LevelUp = 'LEVEL_UP',
  Other = 'OTHER',
  Shed = 'SHED',
  Trade = 'TRADE',
  UseItem = 'USE_ITEM'
}

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
  Any = 'ANY'
}

export enum Habitat {
  Cave = 'CAVE',
  Forest = 'FOREST',
  Grassland = 'GRASSLAND',
  Mountain = 'MOUNTAIN',
  Rare = 'RARE',
  RoughTerrain = 'ROUGH_TERRAIN',
  Sea = 'SEA',
  Urban = 'URBAN',
  WatersEdge = 'WATERS_EDGE'
}

export type Item = Node & {
  __typename?: 'Item';
  id: Scalars['ID'];
  slug: Scalars['String'];
  name: Scalars['String'];
  cost?: Maybe<Scalars['Int']>;
  flingPower?: Maybe<Scalars['Int']>;
  flingEffect?: Maybe<Scalars['String']>;
  effect?: Maybe<Scalars['String']>;
  sprite?: Maybe<Scalars['String']>;
  category: ItemCategory;
  attributes: Array<ItemAttribute>;
};

export enum ItemAttribute {
  Consumable = 'CONSUMABLE',
  Countable = 'COUNTABLE',
  Holdable = 'HOLDABLE',
  HoldableActive = 'HOLDABLE_ACTIVE',
  HoldablePassive = 'HOLDABLE_PASSIVE',
  Underground = 'UNDERGROUND',
  UsableInBattle = 'USABLE_IN_BATTLE',
  UsableOverworld = 'USABLE_OVERWORLD'
}

export enum ItemCategory {
  AllMachines = 'ALL_MACHINES',
  AllMail = 'ALL_MAIL',
  ApricornBalls = 'APRICORN_BALLS',
  ApricornBox = 'APRICORN_BOX',
  BadHeldItems = 'BAD_HELD_ITEMS',
  BakingOnly = 'BAKING_ONLY',
  Choice = 'CHOICE',
  Collectibles = 'COLLECTIBLES',
  DataCards = 'DATA_CARDS',
  DexCompletion = 'DEX_COMPLETION',
  EffortDrop = 'EFFORT_DROP',
  EffortTraining = 'EFFORT_TRAINING',
  EventItems = 'EVENT_ITEMS',
  Evolution = 'EVOLUTION',
  Flutes = 'FLUTES',
  Gameplay = 'GAMEPLAY',
  Healing = 'HEALING',
  HeldItems = 'HELD_ITEMS',
  InAPinch = 'IN_A_PINCH',
  Jewels = 'JEWELS',
  Loot = 'LOOT',
  Medicine = 'MEDICINE',
  MegaStones = 'MEGA_STONES',
  Memories = 'MEMORIES',
  MiracleShooter = 'MIRACLE_SHOOTER',
  Mulch = 'MULCH',
  Other = 'OTHER',
  PickyHealing = 'PICKY_HEALING',
  Plates = 'PLATES',
  PlotAdvancement = 'PLOT_ADVANCEMENT',
  PpRecovery = 'PP_RECOVERY',
  Revival = 'REVIVAL',
  Scarves = 'SCARVES',
  SpecialBalls = 'SPECIAL_BALLS',
  SpeciesSpecific = 'SPECIES_SPECIFIC',
  Spelunking = 'SPELUNKING',
  StandardBalls = 'STANDARD_BALLS',
  StatBoosts = 'STAT_BOOSTS',
  StatusCures = 'STATUS_CURES',
  Training = 'TRAINING',
  TypeEnhancement = 'TYPE_ENHANCEMENT',
  TypeProtection = 'TYPE_PROTECTION',
  Unused = 'UNUSED',
  Vitamins = 'VITAMINS',
  ZCrystals = 'Z_CRYSTALS'
}

export type Move = Node & {
  __typename?: 'Move';
  id: Scalars['ID'];
  slug: Scalars['String'];
  name: Scalars['String'];
  accuracy?: Maybe<Scalars['Int']>;
  pp?: Maybe<Scalars['Int']>;
  power?: Maybe<Scalars['Int']>;
  damageClass: DamageClass;
  effect?: Maybe<Scalars['String']>;
  effectChance?: Maybe<Scalars['Int']>;
  target: MoveTarget;
  type: Type;
  pokemon: PokemonWithMoveConnection;
};

export type MoveConnection = {
  __typename?: 'MoveConnection';
  edges?: Maybe<Array<Maybe<MoveEdge>>>;
  pageInfo: PageInfo;
};

export type MoveEdge = {
  __typename?: 'MoveEdge';
  cursor: Scalars['String'];
  node?: Maybe<Move>;
};

export enum MoveLearnMethod {
  LevelUp = 'LEVEL_UP',
  Egg = 'EGG',
  Tutor = 'TUTOR',
  Machine = 'MACHINE',
  StadiumSurfingPikachu = 'STADIUM_SURFING_PIKACHU',
  LightBallEgg = 'LIGHT_BALL_EGG',
  ColosseumPurification = 'COLOSSEUM_PURIFICATION',
  XdShadow = 'XD_SHADOW',
  XdPurification = 'XD_PURIFICATION',
  FormChange = 'FORM_CHANGE',
  Record = 'RECORD',
  Transfer = 'TRANSFER'
}

export enum MoveTarget {
  SpecificMove = 'SPECIFIC_MOVE',
  SelectedPokemonMeFirst = 'SELECTED_POKEMON_ME_FIRST',
  Ally = 'ALLY',
  UsersField = 'USERS_FIELD',
  UserOrAlly = 'USER_OR_ALLY',
  OpponentsField = 'OPPONENTS_FIELD',
  User = 'USER',
  RandomOpponent = 'RANDOM_OPPONENT',
  AllOtherPokemon = 'ALL_OTHER_POKEMON',
  SelectedPokemon = 'SELECTED_POKEMON',
  AllOpponents = 'ALL_OPPONENTS',
  EntireField = 'ENTIRE_FIELD',
  UserAndAllies = 'USER_AND_ALLIES',
  AllPokemon = 'ALL_POKEMON',
  AllAllies = 'ALL_ALLIES'
}

export type Mutation = {
  __typename?: 'Mutation';
  createTeam: Team;
  updateTeam: Team;
  deleteTeam: Team;
  removeTeamMember: TeamMember;
};


export type MutationCreateTeamArgs = {
  input: CreateTeamInput;
};


export type MutationUpdateTeamArgs = {
  input: UpdateTeamInput;
};


export type MutationDeleteTeamArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveTeamMemberArgs = {
  id: Scalars['ID'];
};

export type Node = {
  id: Scalars['ID'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
  endCursor?: Maybe<Scalars['String']>;
};

export type Pokemon = Node & {
  __typename?: 'Pokemon';
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  pokedexId: Scalars['Int'];
  sprite: Scalars['String'];
  hp: Scalars['Int'];
  attack: Scalars['Int'];
  defense: Scalars['Int'];
  specialAttack: Scalars['Int'];
  specialDefense: Scalars['Int'];
  speed: Scalars['Int'];
  isBaby: Scalars['Boolean'];
  isLegendary: Scalars['Boolean'];
  isMythical: Scalars['Boolean'];
  description?: Maybe<Scalars['String']>;
  color: Color;
  shape: Shape;
  habitat?: Maybe<Habitat>;
  height: Scalars['Int'];
  weight: Scalars['Int'];
  isDefaultVariant: Scalars['Boolean'];
  genus: Scalars['String'];
  abilities: PokemonAbilityConnection;
  types: PokemonTypeConnection;
  moves: PokemonMoveConnection;
  eggGroups: EggGroupConnection;
  evolvesTo: PokemonEvolutionConnection;
  evolvesFrom: PokemonEvolutionConnection;
};

export type PokemonAbilityConnection = {
  __typename?: 'PokemonAbilityConnection';
  edges?: Maybe<Array<Maybe<PokemonAbilityEdge>>>;
  pageInfo: PageInfo;
};

export type PokemonAbilityEdge = {
  __typename?: 'PokemonAbilityEdge';
  cursor: Scalars['String'];
  slot?: Maybe<Scalars['Int']>;
  isHidden?: Maybe<Scalars['Boolean']>;
  node?: Maybe<Ability>;
};

export type PokemonConnection = {
  __typename?: 'PokemonConnection';
  edges?: Maybe<Array<Maybe<PokemonEdge>>>;
  pageInfo: PageInfo;
};

export type PokemonEdge = {
  __typename?: 'PokemonEdge';
  cursor: Scalars['String'];
  node?: Maybe<Pokemon>;
};

export type PokemonEvolution = Node & {
  __typename?: 'PokemonEvolution';
  id: Scalars['ID'];
  pokemon: Pokemon;
  trigger: EvolutionTrigger;
  item?: Maybe<Item>;
  gender: Gender;
  heldItem?: Maybe<Item>;
  knownMove?: Maybe<Move>;
  knownMoveType?: Maybe<Type>;
  minLevel?: Maybe<Scalars['Int']>;
  minHappiness?: Maybe<Scalars['Int']>;
  minBeauty?: Maybe<Scalars['Int']>;
  minAffection?: Maybe<Scalars['Int']>;
  needsOverworldRain: Scalars['Boolean'];
  partyPokemon?: Maybe<Pokemon>;
  partyPokemonType?: Maybe<Type>;
  relativePhysicalStats?: Maybe<Scalars['Int']>;
  timeOfDay: TimeOfDay;
  tradeWithPokemon?: Maybe<Pokemon>;
  turnUpsideDown: Scalars['Boolean'];
  spin: Scalars['Boolean'];
  takeDamage?: Maybe<Scalars['Int']>;
  criticalHits?: Maybe<Scalars['Int']>;
};

export type PokemonEvolutionConnection = {
  __typename?: 'PokemonEvolutionConnection';
  edges?: Maybe<Array<Maybe<PokemonEvolutionEdge>>>;
  pageInfo: PageInfo;
};

export type PokemonEvolutionEdge = {
  __typename?: 'PokemonEvolutionEdge';
  cursor: Scalars['String'];
  node?: Maybe<PokemonEvolution>;
};

export type PokemonMoveConnection = {
  __typename?: 'PokemonMoveConnection';
  edges?: Maybe<Array<Maybe<PokemonMoveEdge>>>;
  pageInfo: PageInfo;
};

export type PokemonMoveEdge = {
  __typename?: 'PokemonMoveEdge';
  cursor: Scalars['String'];
  node?: Maybe<Move>;
  learnMethod?: Maybe<MoveLearnMethod>;
  levelLearnedAt?: Maybe<Scalars['Int']>;
};

export type PokemonTypeConnection = {
  __typename?: 'PokemonTypeConnection';
  edges?: Maybe<Array<Maybe<PokemonTypeEdge>>>;
  pageInfo: PageInfo;
};

export type PokemonTypeEdge = {
  __typename?: 'PokemonTypeEdge';
  cursor: Scalars['String'];
  node?: Maybe<Type>;
  slot?: Maybe<Scalars['Int']>;
};

export type PokemonWithAbilityConnection = {
  __typename?: 'PokemonWithAbilityConnection';
  edges?: Maybe<Array<Maybe<PokemonWithAbilityEdge>>>;
  pageInfo: PageInfo;
};

export type PokemonWithAbilityEdge = {
  __typename?: 'PokemonWithAbilityEdge';
  cursor: Scalars['String'];
  slot?: Maybe<Scalars['Int']>;
  isHidden?: Maybe<Scalars['Boolean']>;
  node?: Maybe<Pokemon>;
};

export type PokemonWithMoveConnection = {
  __typename?: 'PokemonWithMoveConnection';
  edges?: Maybe<Array<Maybe<PokemonWithMoveEdge>>>;
  pageInfo: PageInfo;
};

export type PokemonWithMoveEdge = {
  __typename?: 'PokemonWithMoveEdge';
  cursor: Scalars['String'];
  node?: Maybe<Pokemon>;
  learnMethod?: Maybe<MoveLearnMethod>;
  levelLearnedAt?: Maybe<Scalars['Int']>;
};

export type PokemonWithTypeConnection = {
  __typename?: 'PokemonWithTypeConnection';
  edges?: Maybe<Array<Maybe<PokemonWithTypeEdge>>>;
  pageInfo: PageInfo;
};

export type PokemonWithTypeEdge = {
  __typename?: 'PokemonWithTypeEdge';
  cursor: Scalars['String'];
  node?: Maybe<Pokemon>;
  slot?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  abilityById?: Maybe<Ability>;
  abilities: AbilityConnection;
  moveById?: Maybe<Move>;
  moves: MoveConnection;
  pokemonById?: Maybe<Pokemon>;
  pokemon: PokemonConnection;
  teamById?: Maybe<Team>;
  teams: TeamConnection;
  typeById?: Maybe<Type>;
  types: TypeConnection;
};


export type QueryAbilityByIdArgs = {
  id: Scalars['ID'];
};


export type QueryMoveByIdArgs = {
  id: Scalars['ID'];
};


export type QueryPokemonByIdArgs = {
  id: Scalars['ID'];
};


export type QueryTeamByIdArgs = {
  id: Scalars['ID'];
};


export type QueryTypeByIdArgs = {
  id: Scalars['ID'];
};

export enum Shape {
  Ball = 'BALL',
  Squiggle = 'SQUIGGLE',
  Fish = 'FISH',
  Arms = 'ARMS',
  Blob = 'BLOB',
  Upright = 'UPRIGHT',
  Legs = 'LEGS',
  Quadruped = 'QUADRUPED',
  Wings = 'WINGS',
  Tentacles = 'TENTACLES',
  Heads = 'HEADS',
  Humanoid = 'HUMANOID',
  BugWings = 'BUG_WINGS',
  Armor = 'ARMOR'
}

export type Team = Node & {
  __typename?: 'Team';
  id: Scalars['ID'];
  name: Scalars['String'];
  createdAt: Scalars['Time'];
  updatedAt: Scalars['Time'];
  members: TeamMemberConnection;
};

export type TeamConnection = {
  __typename?: 'TeamConnection';
  edges?: Maybe<Array<Maybe<TeamEdge>>>;
  pageInfo: PageInfo;
};

export type TeamEdge = {
  __typename?: 'TeamEdge';
  cursor: Scalars['String'];
  node?: Maybe<Team>;
};

export type TeamMember = Node & {
  __typename?: 'TeamMember';
  id: Scalars['ID'];
  pokemon: Pokemon;
  moves: TeamMemberMoveConnection;
};

export type TeamMemberConnection = {
  __typename?: 'TeamMemberConnection';
  edges?: Maybe<Array<Maybe<TeamMemberEdge>>>;
  pageInfo: PageInfo;
};

export type TeamMemberEdge = {
  __typename?: 'TeamMemberEdge';
  cursor: Scalars['String'];
  node?: Maybe<TeamMember>;
  slot?: Maybe<Scalars['Int']>;
};

export type TeamMemberMoveConnection = {
  __typename?: 'TeamMemberMoveConnection';
  edges?: Maybe<Array<Maybe<TeamMemberMoveEdge>>>;
  pageInfo: PageInfo;
};

export type TeamMemberMoveEdge = {
  __typename?: 'TeamMemberMoveEdge';
  cursor: Scalars['String'];
  node?: Maybe<Move>;
  learnMethod?: Maybe<MoveLearnMethod>;
  levelLearnedAt?: Maybe<Scalars['Int']>;
};


export enum TimeOfDay {
  Day = 'DAY',
  Night = 'NIGHT',
  Any = 'ANY'
}

export type Type = Node & {
  __typename?: 'Type';
  id: Scalars['ID'];
  slug: Scalars['String'];
  name: Scalars['String'];
  pokemon: PokemonWithTypeConnection;
  moves: MoveConnection;
  noDamageTo: TypeConnection;
  halfDamageTo: TypeConnection;
  doubleDamageTo: TypeConnection;
  noDamageFrom: TypeConnection;
  halfDamageFrom: TypeConnection;
  doubleDamageFrom: TypeConnection;
};

export type TypeConnection = {
  __typename?: 'TypeConnection';
  edges?: Maybe<Array<Maybe<TypeEdge>>>;
  pageInfo: PageInfo;
};

export type TypeEdge = {
  __typename?: 'TypeEdge';
  cursor: Scalars['String'];
  node?: Maybe<Type>;
};

export type UpdateTeamInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  members?: Maybe<Array<UpdateTeamMemberInput>>;
};

export type UpdateTeamMemberInput = {
  id?: Maybe<Scalars['ID']>;
  pokemonId?: Maybe<Scalars['ID']>;
  slot?: Maybe<Scalars['Int']>;
};

export type AbilityFragment = (
  { __typename?: 'Ability' }
  & Pick<Ability, 'id' | 'slug' | 'name' | 'effect'>
);

export type ItemFragment = (
  { __typename?: 'Item' }
  & Pick<Item, 'id' | 'slug' | 'name' | 'cost' | 'flingPower' | 'flingEffect' | 'effect' | 'sprite' | 'category' | 'attributes'>
);

export type MoveFragment = (
  { __typename?: 'Move' }
  & Pick<Move, 'id' | 'slug' | 'name' | 'accuracy' | 'pp' | 'power' | 'damageClass' | 'effect' | 'effectChance' | 'target'>
  & { type: (
    { __typename?: 'Type' }
    & MoveTypeFragment
  ) }
);

export type PokemonMoveFragment = (
  { __typename?: 'PokemonMoveEdge' }
  & Pick<PokemonMoveEdge, 'learnMethod' | 'levelLearnedAt'>
  & { node?: Maybe<(
    { __typename?: 'Move' }
    & MoveFragment
  )> }
);

export type TeamMemberMoveFragment = (
  { __typename?: 'TeamMemberMoveEdge' }
  & Pick<TeamMemberMoveEdge, 'learnMethod' | 'levelLearnedAt'>
  & { node?: Maybe<(
    { __typename?: 'Move' }
    & MoveFragment
  )> }
);

export type PokemonFragment = (
  { __typename?: 'Pokemon' }
  & Pick<Pokemon, 'id' | 'name' | 'slug' | 'pokedexId' | 'sprite' | 'color' | 'shape' | 'habitat' | 'hp' | 'attack' | 'defense' | 'specialAttack' | 'specialDefense' | 'speed' | 'height' | 'weight' | 'isDefaultVariant' | 'isBaby' | 'isLegendary' | 'isMythical' | 'description'>
  & { abilities: (
    { __typename?: 'PokemonAbilityConnection' }
    & { edges?: Maybe<Array<Maybe<(
      { __typename?: 'PokemonAbilityEdge' }
      & Pick<PokemonAbilityEdge, 'slot' | 'isHidden'>
      & { node?: Maybe<(
        { __typename?: 'Ability' }
        & AbilityFragment
      )> }
    )>>> }
  ), eggGroups: (
    { __typename?: 'EggGroupConnection' }
    & { edges?: Maybe<Array<Maybe<(
      { __typename?: 'EggGroupEdge' }
      & { node?: Maybe<(
        { __typename?: 'EggGroup' }
        & Pick<EggGroup, 'id' | 'name' | 'slug'>
      )> }
    )>>> }
  ), evolvesTo: (
    { __typename?: 'PokemonEvolutionConnection' }
    & { edges?: Maybe<Array<Maybe<(
      { __typename?: 'PokemonEvolutionEdge' }
      & { node?: Maybe<(
        { __typename?: 'PokemonEvolution' }
        & PokemonEvolutionFragment
      )> }
    )>>> }
  ), evolvesFrom: (
    { __typename?: 'PokemonEvolutionConnection' }
    & { edges?: Maybe<Array<Maybe<(
      { __typename?: 'PokemonEvolutionEdge' }
      & { node?: Maybe<(
        { __typename?: 'PokemonEvolution' }
        & PokemonEvolutionFragment
      )> }
    )>>> }
  ), types: (
    { __typename?: 'PokemonTypeConnection' }
    & { edges?: Maybe<Array<Maybe<(
      { __typename?: 'PokemonTypeEdge' }
      & Pick<PokemonTypeEdge, 'slot'>
      & { node?: Maybe<(
        { __typename?: 'Type' }
        & PokemonTypeFragment
      )> }
    )>>> }
  ), moves: (
    { __typename?: 'PokemonMoveConnection' }
    & { edges?: Maybe<Array<Maybe<(
      { __typename?: 'PokemonMoveEdge' }
      & PokemonMoveFragment
    )>>> }
  ) }
);

export type PokemonEvolutionFragment = (
  { __typename?: 'PokemonEvolution' }
  & Pick<PokemonEvolution, 'trigger' | 'gender' | 'minLevel' | 'minHappiness' | 'minBeauty' | 'minAffection' | 'needsOverworldRain' | 'relativePhysicalStats' | 'timeOfDay' | 'turnUpsideDown' | 'spin' | 'takeDamage' | 'criticalHits'>
  & { pokemon: (
    { __typename?: 'Pokemon' }
    & Pick<Pokemon, 'id' | 'name'>
  ), item?: Maybe<(
    { __typename?: 'Item' }
    & ItemFragment
  )>, heldItem?: Maybe<(
    { __typename?: 'Item' }
    & ItemFragment
  )>, knownMove?: Maybe<(
    { __typename?: 'Move' }
    & Pick<Move, 'name'>
    & { type: (
      { __typename?: 'Type' }
      & Pick<Type, 'name'>
    ) }
  )>, knownMoveType?: Maybe<(
    { __typename?: 'Type' }
    & Pick<Type, 'name'>
  )>, partyPokemon?: Maybe<(
    { __typename?: 'Pokemon' }
    & Pick<Pokemon, 'name'>
  )>, partyPokemonType?: Maybe<(
    { __typename?: 'Type' }
    & Pick<Type, 'name'>
  )>, tradeWithPokemon?: Maybe<(
    { __typename?: 'Pokemon' }
    & Pick<Pokemon, 'name'>
  )> }
);

export type TeamFragment = (
  { __typename?: 'Team' }
  & Pick<Team, 'id' | 'name' | 'createdAt'>
  & { members: (
    { __typename?: 'TeamMemberConnection' }
    & { edges?: Maybe<Array<Maybe<(
      { __typename?: 'TeamMemberEdge' }
      & Pick<TeamMemberEdge, 'slot'>
      & { node?: Maybe<(
        { __typename?: 'TeamMember' }
        & TeamMemberFragment
      )> }
    )>>> }
  ) }
);

export type TeamMemberFragment = (
  { __typename?: 'TeamMember' }
  & Pick<TeamMember, 'id'>
  & { pokemon: (
    { __typename?: 'Pokemon' }
    & PokemonFragment
  ), moves: (
    { __typename?: 'TeamMemberMoveConnection' }
    & { edges?: Maybe<Array<Maybe<(
      { __typename?: 'TeamMemberMoveEdge' }
      & TeamMemberMoveFragment
    )>>> }
  ) }
);

export type TypeFragment = (
  { __typename?: 'Type' }
  & Pick<Type, 'id' | 'name' | 'slug'>
);

export type PokemonTypeFragment = (
  { __typename?: 'Type' }
  & { noDamageFrom: (
    { __typename?: 'TypeConnection' }
    & { edges?: Maybe<Array<Maybe<(
      { __typename?: 'TypeEdge' }
      & { node?: Maybe<(
        { __typename?: 'Type' }
        & TypeFragment
      )> }
    )>>> }
  ), halfDamageFrom: (
    { __typename?: 'TypeConnection' }
    & { edges?: Maybe<Array<Maybe<(
      { __typename?: 'TypeEdge' }
      & { node?: Maybe<(
        { __typename?: 'Type' }
        & TypeFragment
      )> }
    )>>> }
  ), doubleDamageFrom: (
    { __typename?: 'TypeConnection' }
    & { edges?: Maybe<Array<Maybe<(
      { __typename?: 'TypeEdge' }
      & { node?: Maybe<(
        { __typename?: 'Type' }
        & TypeFragment
      )> }
    )>>> }
  ) }
  & TypeFragment
);

export type MoveTypeFragment = (
  { __typename?: 'Type' }
  & { noDamageTo: (
    { __typename?: 'TypeConnection' }
    & { edges?: Maybe<Array<Maybe<(
      { __typename?: 'TypeEdge' }
      & { node?: Maybe<(
        { __typename?: 'Type' }
        & TypeFragment
      )> }
    )>>> }
  ), halfDamageTo: (
    { __typename?: 'TypeConnection' }
    & { edges?: Maybe<Array<Maybe<(
      { __typename?: 'TypeEdge' }
      & { node?: Maybe<(
        { __typename?: 'Type' }
        & TypeFragment
      )> }
    )>>> }
  ), doubleDamageTo: (
    { __typename?: 'TypeConnection' }
    & { edges?: Maybe<Array<Maybe<(
      { __typename?: 'TypeEdge' }
      & { node?: Maybe<(
        { __typename?: 'Type' }
        & TypeFragment
      )> }
    )>>> }
  ) }
  & TypeFragment
);

export type CreateTeamMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateTeamMutation = (
  { __typename?: 'Mutation' }
  & { createTeam: (
    { __typename?: 'Team' }
    & TeamFragment
  ) }
);

export type DeleteTeamMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteTeamMutation = (
  { __typename?: 'Mutation' }
  & { deleteTeam: (
    { __typename?: 'Team' }
    & TeamFragment
  ) }
);

export type DeleteTeamMembersMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteTeamMembersMutation = (
  { __typename?: 'Mutation' }
  & { removeTeamMember: (
    { __typename?: 'TeamMember' }
    & TeamMemberFragment
  ) }
);

export type UpdateTeamMutationVariables = Exact<{
  id: Scalars['ID'];
  name: Scalars['String'];
  members?: Maybe<Array<UpdateTeamMemberInput> | UpdateTeamMemberInput>;
}>;


export type UpdateTeamMutation = (
  { __typename?: 'Mutation' }
  & { updateTeam: (
    { __typename?: 'Team' }
    & TeamFragment
  ) }
);

export type AllTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTeamsQuery = (
  { __typename?: 'Query' }
  & { teams: (
    { __typename?: 'TeamConnection' }
    & { edges?: Maybe<Array<Maybe<(
      { __typename?: 'TeamEdge' }
      & { node?: Maybe<(
        { __typename?: 'Team' }
        & TeamFragment
      )> }
    )>>> }
  ) }
);

export type TeamByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TeamByIdQuery = (
  { __typename?: 'Query' }
  & { teamById?: Maybe<(
    { __typename?: 'Team' }
    & TeamFragment
  )> }
);

export const AbilityFragmentDoc = gql`
    fragment ability on Ability {
  id
  slug
  name
  effect
}
    `;
export const ItemFragmentDoc = gql`
    fragment item on Item {
  id
  slug
  name
  cost
  flingPower
  flingEffect
  effect
  sprite
  category
  attributes
}
    `;
export const PokemonEvolutionFragmentDoc = gql`
    fragment pokemonEvolution on PokemonEvolution {
  pokemon {
    id
    name
  }
  trigger
  item {
    ...item
  }
  gender
  heldItem {
    ...item
  }
  knownMove {
    name
    type {
      name
    }
  }
  knownMoveType {
    name
  }
  minLevel
  minHappiness
  minBeauty
  minAffection
  needsOverworldRain
  partyPokemon {
    name
  }
  partyPokemonType {
    name
  }
  relativePhysicalStats
  timeOfDay
  tradeWithPokemon {
    name
  }
  turnUpsideDown
  spin
  takeDamage
  criticalHits
}
    ${ItemFragmentDoc}`;
export const TypeFragmentDoc = gql`
    fragment type on Type {
  id
  name
  slug
}
    `;
export const PokemonTypeFragmentDoc = gql`
    fragment pokemonType on Type {
  ...type
  noDamageFrom {
    edges {
      node {
        ...type
      }
    }
  }
  halfDamageFrom {
    edges {
      node {
        ...type
      }
    }
  }
  doubleDamageFrom {
    edges {
      node {
        ...type
      }
    }
  }
}
    ${TypeFragmentDoc}`;
export const MoveTypeFragmentDoc = gql`
    fragment moveType on Type {
  ...type
  noDamageTo {
    edges {
      node {
        ...type
      }
    }
  }
  halfDamageTo {
    edges {
      node {
        ...type
      }
    }
  }
  doubleDamageTo {
    edges {
      node {
        ...type
      }
    }
  }
}
    ${TypeFragmentDoc}`;
export const MoveFragmentDoc = gql`
    fragment move on Move {
  id
  slug
  name
  accuracy
  pp
  power
  damageClass
  effect
  effectChance
  target
  type {
    ...moveType
  }
}
    ${MoveTypeFragmentDoc}`;
export const PokemonMoveFragmentDoc = gql`
    fragment pokemonMove on PokemonMoveEdge {
  learnMethod
  levelLearnedAt
  node {
    ...move
  }
}
    ${MoveFragmentDoc}`;
export const PokemonFragmentDoc = gql`
    fragment pokemon on Pokemon {
  id
  name
  slug
  pokedexId
  sprite
  color
  shape
  habitat
  hp
  attack
  defense
  specialAttack
  specialDefense
  speed
  height
  weight
  isDefaultVariant
  isBaby
  isLegendary
  isMythical
  description
  abilities {
    edges {
      slot
      isHidden
      node {
        ...ability
      }
    }
  }
  eggGroups {
    edges {
      node {
        id
        name
        slug
      }
    }
  }
  evolvesTo {
    edges {
      node {
        ...pokemonEvolution
      }
    }
  }
  evolvesFrom {
    edges {
      node {
        ...pokemonEvolution
      }
    }
  }
  types {
    edges {
      slot
      node {
        ...pokemonType
      }
    }
  }
  moves {
    edges {
      ...pokemonMove
    }
  }
}
    ${AbilityFragmentDoc}
${PokemonEvolutionFragmentDoc}
${PokemonTypeFragmentDoc}
${PokemonMoveFragmentDoc}`;
export const TeamMemberMoveFragmentDoc = gql`
    fragment teamMemberMove on TeamMemberMoveEdge {
  learnMethod
  levelLearnedAt
  node {
    ...move
  }
}
    ${MoveFragmentDoc}`;
export const TeamMemberFragmentDoc = gql`
    fragment teamMember on TeamMember {
  id
  pokemon {
    ...pokemon
  }
  moves {
    edges {
      ...teamMemberMove
    }
  }
}
    ${PokemonFragmentDoc}
${TeamMemberMoveFragmentDoc}`;
export const TeamFragmentDoc = gql`
    fragment team on Team {
  id
  name
  createdAt
  members {
    edges {
      slot
      node {
        ...teamMember
      }
    }
  }
}
    ${TeamMemberFragmentDoc}`;
export const CreateTeamDocument = gql`
    mutation CreateTeam($name: String!) {
  createTeam(input: {name: $name}) {
    ...team
  }
}
    ${TeamFragmentDoc}`;

export function useCreateTeamMutation() {
  return Urql.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument);
};
export const DeleteTeamDocument = gql`
    mutation DeleteTeam($id: ID!) {
  deleteTeam(id: $id) {
    ...team
  }
}
    ${TeamFragmentDoc}`;

export function useDeleteTeamMutation() {
  return Urql.useMutation<DeleteTeamMutation, DeleteTeamMutationVariables>(DeleteTeamDocument);
};
export const DeleteTeamMembersDocument = gql`
    mutation DeleteTeamMembers($id: ID!) {
  removeTeamMember(id: $id) {
    ...teamMember
  }
}
    ${TeamMemberFragmentDoc}`;

export function useDeleteTeamMembersMutation() {
  return Urql.useMutation<DeleteTeamMembersMutation, DeleteTeamMembersMutationVariables>(DeleteTeamMembersDocument);
};
export const UpdateTeamDocument = gql`
    mutation UpdateTeam($id: ID!, $name: String!, $members: [UpdateTeamMemberInput!]) {
  updateTeam(input: {id: $id, name: $name, members: $members}) {
    ...team
  }
}
    ${TeamFragmentDoc}`;

export function useUpdateTeamMutation() {
  return Urql.useMutation<UpdateTeamMutation, UpdateTeamMutationVariables>(UpdateTeamDocument);
};
export const AllTeamsDocument = gql`
    query AllTeams {
  teams {
    edges {
      node {
        ...team
      }
    }
  }
}
    ${TeamFragmentDoc}`;

export function useAllTeamsQuery(options: Omit<Urql.UseQueryArgs<AllTeamsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllTeamsQuery>({ query: AllTeamsDocument, ...options });
};
export const TeamByIdDocument = gql`
    query TeamById($id: ID!) {
  teamById(id: $id) {
    ...team
  }
}
    ${TeamFragmentDoc}`;

export function useTeamByIdQuery(options: Omit<Urql.UseQueryArgs<TeamByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TeamByIdQuery>({ query: TeamByIdDocument, ...options });
};
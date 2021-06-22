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
};

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

export type TeamMemberList = {
  __typename?: 'TeamMemberList';
  total: Scalars['Int'];
  teamMembers: Array<TeamMember>;
};

export type TeamMemberMove = {
  __typename?: 'TeamMemberMove';
  id: Scalars['ID'];
  slot: Scalars['Int'];
  move: PokemonMove;
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

export type TeamMember = {
  __typename?: 'TeamMember';
  id: Scalars['ID'];
  slot: Scalars['Int'];
  pokemon: Pokemon;
  moves: TeamMemberMoveList;
  team?: Maybe<Team>;
};

export type PokemonList = {
  __typename?: 'PokemonList';
  total: Scalars['Int'];
  pokemon: Array<Pokemon>;
};

export type Team = {
  __typename?: 'Team';
  id: Scalars['ID'];
  name: Scalars['String'];
  members: TeamMemberList;
};

export enum DamageClass {
  Physical = 'PHYSICAL',
  Special = 'SPECIAL',
  Status = 'STATUS'
}

export type CreateTeamInput = {
  name: Scalars['String'];
  members?: Maybe<Array<CreateTeamMemberInput>>;
};

export type PokemonAbilityList = {
  __typename?: 'PokemonAbilityList';
  total: Scalars['Int'];
  pokemonAbilities: Array<PokemonAbility>;
};

export type EggGroup = {
  __typename?: 'EggGroup';
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type Item = {
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

export type MoveList = {
  __typename?: 'MoveList';
  total: Scalars['Int'];
  moves: Array<Move>;
};

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
  Any = 'ANY'
}

export type Query = {
  __typename?: 'Query';
  abilityById?: Maybe<Ability>;
  abilities: AbilityList;
  moveById?: Maybe<Move>;
  moves: MoveList;
  pokemonById?: Maybe<Pokemon>;
  pokemon: PokemonList;
  teamById?: Maybe<Team>;
  teams: TeamList;
  typeById?: Maybe<Type>;
  types: TypeList;
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

export type PokemonMove = {
  __typename?: 'PokemonMove';
  move: Move;
  pokemon: Pokemon;
  learnMethod: MoveLearnMethod;
  levelLearnedAt: Scalars['Int'];
};

export type AbilityList = {
  __typename?: 'AbilityList';
  total: Scalars['Int'];
  abilities: Array<Ability>;
};

export type PokemonAbility = {
  __typename?: 'PokemonAbility';
  slot: Scalars['Int'];
  isHidden: Scalars['Boolean'];
  ability: Ability;
  pokemon: Pokemon;
};

export type TeamList = {
  __typename?: 'TeamList';
  total: Scalars['Int'];
  teams: Array<Team>;
};

export type TeamMemberMoveList = {
  __typename?: 'TeamMemberMoveList';
  total: Scalars['Int'];
  teamMemberMoves: Array<TeamMemberMove>;
};

export enum EvolutionTrigger {
  LevelUp = 'LEVEL_UP',
  Other = 'OTHER',
  Shed = 'SHED',
  Trade = 'TRADE',
  UseItem = 'USE_ITEM'
}

export type CreateTeamMemberInput = {
  pokemonId: Scalars['ID'];
  slot: Scalars['Int'];
};

export type Pokemon = {
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
  abilities: PokemonAbilityList;
  types: PokemonTypeList;
  moves: PokemonMoveList;
  eggGroups: EggGroupList;
  evolvesTo: PokemonEvolutionList;
  evolvesFrom: PokemonEvolutionList;
};

export type PokemonMoveList = {
  __typename?: 'PokemonMoveList';
  total: Scalars['Int'];
  pokemonMoves: Array<PokemonMove>;
};

export type TypeList = {
  __typename?: 'TypeList';
  total: Scalars['Int'];
  types: Array<Type>;
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

export enum TimeOfDay {
  Day = 'DAY',
  Night = 'NIGHT',
  Any = 'ANY'
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

export type PokemonType = {
  __typename?: 'PokemonType';
  type: Type;
  pokemon: Pokemon;
  slot: Scalars['Int'];
};

export type Ability = {
  __typename?: 'Ability';
  id: Scalars['ID'];
  slug: Scalars['String'];
  name: Scalars['String'];
  effect?: Maybe<Scalars['String']>;
  pokemon: PokemonAbilityList;
};

export type Type = {
  __typename?: 'Type';
  id: Scalars['ID'];
  slug: Scalars['String'];
  name: Scalars['String'];
  pokemon: PokemonTypeList;
  moves: MoveList;
  noDamageTo: TypeList;
  halfDamageTo: TypeList;
  doubleDamageTo: TypeList;
  noDamageFrom: TypeList;
  halfDamageFrom: TypeList;
  doubleDamageFrom: TypeList;
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

export type PokemonTypeList = {
  __typename?: 'PokemonTypeList';
  total: Scalars['Int'];
  pokemonTypes: Array<PokemonType>;
};

export type UpdateTeamMemberInput = {
  id?: Maybe<Scalars['ID']>;
  pokemonId?: Maybe<Scalars['ID']>;
  slot?: Maybe<Scalars['Int']>;
};

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

export type UpdateTeamInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  members?: Maybe<Array<UpdateTeamMemberInput>>;
};

export type PokemonEvolution = {
  __typename?: 'PokemonEvolution';
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

export type EggGroupList = {
  __typename?: 'EggGroupList';
  total: Scalars['Int'];
  eggGroups: Array<EggGroup>;
};

export type Move = {
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
  pokemon: PokemonMoveList;
};

export type PokemonEvolutionList = {
  __typename?: 'PokemonEvolutionList';
  total: Scalars['Int'];
  pokemonEvolutions: Array<PokemonEvolution>;
};

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

export type MoveFragmentFragment = (
  { __typename?: 'Move' }
  & Pick<Move, 'id' | 'slug' | 'name' | 'accuracy' | 'pp' | 'power' | 'damageClass' | 'effect' | 'effectChance' | 'target'>
  & { type: (
    { __typename?: 'Type' }
    & { noDamageTo: (
      { __typename?: 'TypeList' }
      & Pick<TypeList, 'total'>
      & { types: Array<(
        { __typename?: 'Type' }
        & TypeFragmentFragment
      )> }
    ), halfDamageTo: (
      { __typename?: 'TypeList' }
      & Pick<TypeList, 'total'>
      & { types: Array<(
        { __typename?: 'Type' }
        & TypeFragmentFragment
      )> }
    ), doubleDamageTo: (
      { __typename?: 'TypeList' }
      & Pick<TypeList, 'total'>
      & { types: Array<(
        { __typename?: 'Type' }
        & TypeFragmentFragment
      )> }
    ) }
    & TypeFragmentFragment
  ) }
);

export type PokemonFragmentFragment = (
  { __typename?: 'Pokemon' }
  & Pick<Pokemon, 'id' | 'name' | 'slug' | 'pokedexId' | 'sprite' | 'color' | 'shape' | 'habitat' | 'hp' | 'attack' | 'defense' | 'specialAttack' | 'specialDefense' | 'speed' | 'height' | 'weight' | 'isDefaultVariant' | 'isBaby' | 'isLegendary' | 'isMythical' | 'description'>
  & { abilities: (
    { __typename?: 'PokemonAbilityList' }
    & Pick<PokemonAbilityList, 'total'>
    & { pokemonAbilities: Array<(
      { __typename?: 'PokemonAbility' }
      & Pick<PokemonAbility, 'slot' | 'isHidden'>
      & { ability: (
        { __typename?: 'Ability' }
        & Pick<Ability, 'id' | 'slug' | 'name' | 'effect'>
      ) }
    )> }
  ), eggGroups: (
    { __typename?: 'EggGroupList' }
    & Pick<EggGroupList, 'total'>
    & { eggGroups: Array<(
      { __typename?: 'EggGroup' }
      & Pick<EggGroup, 'id' | 'name' | 'slug'>
    )> }
  ), evolvesTo: (
    { __typename?: 'PokemonEvolutionList' }
    & Pick<PokemonEvolutionList, 'total'>
    & { pokemonEvolutions: Array<(
      { __typename?: 'PokemonEvolution' }
      & Pick<PokemonEvolution, 'trigger' | 'gender' | 'minLevel' | 'minHappiness' | 'minBeauty' | 'minAffection' | 'needsOverworldRain' | 'relativePhysicalStats' | 'timeOfDay' | 'turnUpsideDown' | 'spin' | 'takeDamage' | 'criticalHits'>
      & { pokemon: (
        { __typename?: 'Pokemon' }
        & Pick<Pokemon, 'name'>
        & { evolvesTo: (
          { __typename?: 'PokemonEvolutionList' }
          & Pick<PokemonEvolutionList, 'total'>
          & { pokemonEvolutions: Array<(
            { __typename?: 'PokemonEvolution' }
            & { pokemon: (
              { __typename?: 'Pokemon' }
              & Pick<Pokemon, 'id' | 'name'>
            ) }
          )> }
        ) }
      ), item?: Maybe<(
        { __typename?: 'Item' }
        & Pick<Item, 'id' | 'slug' | 'name' | 'cost' | 'flingPower' | 'flingEffect' | 'effect' | 'sprite' | 'category' | 'attributes'>
      )>, heldItem?: Maybe<(
        { __typename?: 'Item' }
        & Pick<Item, 'id' | 'slug' | 'name' | 'cost' | 'flingPower' | 'flingEffect' | 'effect' | 'sprite' | 'category' | 'attributes'>
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
    )> }
  ), evolvesFrom: (
    { __typename?: 'PokemonEvolutionList' }
    & Pick<PokemonEvolutionList, 'total'>
    & { pokemonEvolutions: Array<(
      { __typename?: 'PokemonEvolution' }
      & Pick<PokemonEvolution, 'trigger' | 'gender' | 'minLevel' | 'minHappiness' | 'minBeauty' | 'minAffection' | 'needsOverworldRain' | 'relativePhysicalStats' | 'timeOfDay' | 'turnUpsideDown' | 'spin' | 'takeDamage' | 'criticalHits'>
      & { pokemon: (
        { __typename?: 'Pokemon' }
        & Pick<Pokemon, 'name'>
        & { evolvesFrom: (
          { __typename?: 'PokemonEvolutionList' }
          & Pick<PokemonEvolutionList, 'total'>
          & { pokemonEvolutions: Array<(
            { __typename?: 'PokemonEvolution' }
            & { pokemon: (
              { __typename?: 'Pokemon' }
              & Pick<Pokemon, 'id' | 'name'>
            ) }
          )> }
        ) }
      ), item?: Maybe<(
        { __typename?: 'Item' }
        & Pick<Item, 'id' | 'slug' | 'name' | 'cost' | 'flingPower' | 'flingEffect' | 'effect' | 'sprite' | 'category' | 'attributes'>
      )>, heldItem?: Maybe<(
        { __typename?: 'Item' }
        & Pick<Item, 'id' | 'slug' | 'name' | 'cost' | 'flingPower' | 'flingEffect' | 'effect' | 'sprite' | 'category' | 'attributes'>
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
    )> }
  ), types: (
    { __typename?: 'PokemonTypeList' }
    & Pick<PokemonTypeList, 'total'>
    & { pokemonTypes: Array<(
      { __typename?: 'PokemonType' }
      & Pick<PokemonType, 'slot'>
      & { type: (
        { __typename?: 'Type' }
        & { noDamageFrom: (
          { __typename?: 'TypeList' }
          & Pick<TypeList, 'total'>
          & { types: Array<(
            { __typename?: 'Type' }
            & TypeFragmentFragment
          )> }
        ), halfDamageFrom: (
          { __typename?: 'TypeList' }
          & Pick<TypeList, 'total'>
          & { types: Array<(
            { __typename?: 'Type' }
            & TypeFragmentFragment
          )> }
        ), doubleDamageFrom: (
          { __typename?: 'TypeList' }
          & Pick<TypeList, 'total'>
          & { types: Array<(
            { __typename?: 'Type' }
            & TypeFragmentFragment
          )> }
        ) }
        & TypeFragmentFragment
      ) }
    )> }
  ) }
);

export type PokemonMoveFragmentFragment = (
  { __typename?: 'PokemonMove' }
  & Pick<PokemonMove, 'learnMethod' | 'levelLearnedAt'>
  & { move: (
    { __typename?: 'Move' }
    & MoveFragmentFragment
  ) }
);

export type TeamFragmentFragment = (
  { __typename?: 'Team' }
  & Pick<Team, 'id' | 'name'>
  & { members: (
    { __typename?: 'TeamMemberList' }
    & Pick<TeamMemberList, 'total'>
    & { teamMembers: Array<(
      { __typename?: 'TeamMember' }
      & TeamMemberFragmentFragment
    )> }
  ) }
);

export type TeamMemberFragmentFragment = (
  { __typename?: 'TeamMember' }
  & Pick<TeamMember, 'id' | 'slot'>
  & { pokemon: (
    { __typename?: 'Pokemon' }
    & { moves: (
      { __typename?: 'PokemonMoveList' }
      & Pick<PokemonMoveList, 'total'>
      & { pokemonMoves: Array<(
        { __typename?: 'PokemonMove' }
        & PokemonMoveFragmentFragment
      )> }
    ) }
    & PokemonFragmentFragment
  ), moves: (
    { __typename?: 'TeamMemberMoveList' }
    & Pick<TeamMemberMoveList, 'total'>
    & { teamMemberMoves: Array<(
      { __typename?: 'TeamMemberMove' }
      & TeamMemberMoveFragmentFragment
    )> }
  ) }
);

export type TeamMemberMoveFragmentFragment = (
  { __typename?: 'TeamMemberMove' }
  & Pick<TeamMemberMove, 'id' | 'slot'>
  & { move: (
    { __typename?: 'PokemonMove' }
    & Pick<PokemonMove, 'learnMethod' | 'levelLearnedAt'>
    & { move: (
      { __typename?: 'Move' }
      & MoveFragmentFragment
    ) }
  ) }
);

export type TypeFragmentFragment = (
  { __typename?: 'Type' }
  & Pick<Type, 'id' | 'name' | 'slug'>
);

export type CreateTeamMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateTeamMutation = (
  { __typename?: 'Mutation' }
  & { createTeam: (
    { __typename?: 'Team' }
    & TeamFragmentFragment
  ) }
);

export type DeleteTeamMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteTeamMutation = (
  { __typename?: 'Mutation' }
  & { deleteTeam: (
    { __typename?: 'Team' }
    & TeamFragmentFragment
  ) }
);

export type DeleteTeamMembersMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteTeamMembersMutation = (
  { __typename?: 'Mutation' }
  & { removeTeamMember: (
    { __typename?: 'TeamMember' }
    & { team?: Maybe<(
      { __typename?: 'Team' }
      & TeamFragmentFragment
    )> }
    & TeamMemberFragmentFragment
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
    & TeamFragmentFragment
  ) }
);

export type AllTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTeamsQuery = (
  { __typename?: 'Query' }
  & { teams: (
    { __typename?: 'TeamList' }
    & Pick<TeamList, 'total'>
    & { teams: Array<(
      { __typename?: 'Team' }
      & Pick<Team, 'id' | 'name'>
      & { members: (
        { __typename?: 'TeamMemberList' }
        & Pick<TeamMemberList, 'total'>
        & { teamMembers: Array<(
          { __typename?: 'TeamMember' }
          & Pick<TeamMember, 'id' | 'slot'>
          & { pokemon: (
            { __typename?: 'Pokemon' }
            & PokemonFragmentFragment
          ) }
        )> }
      ) }
    )> }
  ) }
);

export type TeamByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TeamByIdQuery = (
  { __typename?: 'Query' }
  & { teamById?: Maybe<(
    { __typename?: 'Team' }
    & TeamFragmentFragment
  )> }
);

export const TypeFragmentFragmentDoc = gql`
    fragment TypeFragment on Type {
  id
  name
  slug
}
    `;
export const PokemonFragmentFragmentDoc = gql`
    fragment PokemonFragment on Pokemon {
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
    total
    pokemonAbilities {
      slot
      isHidden
      ability {
        id
        slug
        name
        effect
      }
    }
  }
  eggGroups {
    total
    eggGroups {
      id
      name
      slug
    }
  }
  evolvesTo {
    total
    pokemonEvolutions {
      pokemon {
        name
        evolvesTo {
          total
          pokemonEvolutions {
            pokemon {
              id
              name
            }
          }
        }
      }
      trigger
      item {
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
      gender
      heldItem {
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
  }
  evolvesFrom {
    total
    pokemonEvolutions {
      pokemon {
        name
        evolvesFrom {
          total
          pokemonEvolutions {
            pokemon {
              id
              name
            }
          }
        }
      }
      trigger
      item {
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
      gender
      heldItem {
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
  }
  types {
    total
    pokemonTypes {
      slot
      type {
        ...TypeFragment
        noDamageFrom {
          total
          types {
            ...TypeFragment
          }
        }
        halfDamageFrom {
          total
          types {
            ...TypeFragment
          }
        }
        doubleDamageFrom {
          total
          types {
            ...TypeFragment
          }
        }
      }
    }
  }
}
    ${TypeFragmentFragmentDoc}`;
export const MoveFragmentFragmentDoc = gql`
    fragment MoveFragment on Move {
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
    ...TypeFragment
    noDamageTo {
      total
      types {
        ...TypeFragment
      }
    }
    halfDamageTo {
      total
      types {
        ...TypeFragment
      }
    }
    doubleDamageTo {
      total
      types {
        ...TypeFragment
      }
    }
  }
}
    ${TypeFragmentFragmentDoc}`;
export const PokemonMoveFragmentFragmentDoc = gql`
    fragment PokemonMoveFragment on PokemonMove {
  learnMethod
  levelLearnedAt
  move {
    ...MoveFragment
  }
}
    ${MoveFragmentFragmentDoc}`;
export const TeamMemberMoveFragmentFragmentDoc = gql`
    fragment TeamMemberMoveFragment on TeamMemberMove {
  id
  slot
  move {
    learnMethod
    levelLearnedAt
    move {
      ...MoveFragment
    }
  }
}
    ${MoveFragmentFragmentDoc}`;
export const TeamMemberFragmentFragmentDoc = gql`
    fragment TeamMemberFragment on TeamMember {
  id
  slot
  pokemon {
    ...PokemonFragment
    moves {
      total
      pokemonMoves {
        ...PokemonMoveFragment
      }
    }
  }
  moves {
    total
    teamMemberMoves {
      ...TeamMemberMoveFragment
    }
  }
}
    ${PokemonFragmentFragmentDoc}
${PokemonMoveFragmentFragmentDoc}
${TeamMemberMoveFragmentFragmentDoc}`;
export const TeamFragmentFragmentDoc = gql`
    fragment TeamFragment on Team {
  id
  name
  members {
    total
    teamMembers {
      ...TeamMemberFragment
    }
  }
}
    ${TeamMemberFragmentFragmentDoc}`;
export const CreateTeamDocument = gql`
    mutation CreateTeam($name: String!) {
  createTeam(input: {name: $name}) {
    ...TeamFragment
  }
}
    ${TeamFragmentFragmentDoc}`;

export function useCreateTeamMutation() {
  return Urql.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument);
};
export const DeleteTeamDocument = gql`
    mutation DeleteTeam($id: ID!) {
  deleteTeam(id: $id) {
    ...TeamFragment
  }
}
    ${TeamFragmentFragmentDoc}`;

export function useDeleteTeamMutation() {
  return Urql.useMutation<DeleteTeamMutation, DeleteTeamMutationVariables>(DeleteTeamDocument);
};
export const DeleteTeamMembersDocument = gql`
    mutation DeleteTeamMembers($id: ID!) {
  removeTeamMember(id: $id) {
    ...TeamMemberFragment
    team {
      ...TeamFragment
    }
  }
}
    ${TeamMemberFragmentFragmentDoc}
${TeamFragmentFragmentDoc}`;

export function useDeleteTeamMembersMutation() {
  return Urql.useMutation<DeleteTeamMembersMutation, DeleteTeamMembersMutationVariables>(DeleteTeamMembersDocument);
};
export const UpdateTeamDocument = gql`
    mutation UpdateTeam($id: ID!, $name: String!, $members: [UpdateTeamMemberInput!]) {
  updateTeam(input: {id: $id, name: $name, members: $members}) {
    ...TeamFragment
  }
}
    ${TeamFragmentFragmentDoc}`;

export function useUpdateTeamMutation() {
  return Urql.useMutation<UpdateTeamMutation, UpdateTeamMutationVariables>(UpdateTeamDocument);
};
export const AllTeamsDocument = gql`
    query AllTeams {
  teams {
    total
    teams {
      id
      name
      members {
        total
        teamMembers {
          id
          slot
          pokemon {
            ...PokemonFragment
          }
        }
      }
    }
  }
}
    ${PokemonFragmentFragmentDoc}`;

export function useAllTeamsQuery(options: Omit<Urql.UseQueryArgs<AllTeamsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllTeamsQuery>({ query: AllTeamsDocument, ...options });
};
export const TeamByIdDocument = gql`
    query TeamById($id: ID!) {
  teamById(id: $id) {
    ...TeamFragment
  }
}
    ${TeamFragmentFragmentDoc}`;

export function useTeamByIdQuery(options: Omit<Urql.UseQueryArgs<TeamByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TeamByIdQuery>({ query: TeamByIdDocument, ...options });
};
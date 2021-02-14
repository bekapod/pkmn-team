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
  timestamptz: any;
  uuid: any;
};

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: Maybe<Scalars['Int']>;
  _gt?: Maybe<Scalars['Int']>;
  _gte?: Maybe<Scalars['Int']>;
  _in?: Maybe<Array<Scalars['Int']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Int']>;
  _lte?: Maybe<Scalars['Int']>;
  _neq?: Maybe<Scalars['Int']>;
  _nin?: Maybe<Array<Scalars['Int']>>;
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};

/** columns and relationships of "damage_class" */
export type Damage_Class = {
  __typename?: 'damage_class';
  value: Scalars['String'];
};

/** Boolean expression to filter rows from the table "damage_class". All fields are combined with a logical 'AND'. */
export type Damage_Class_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Damage_Class_Bool_Exp>>>;
  _not?: Maybe<Damage_Class_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Damage_Class_Bool_Exp>>>;
  value?: Maybe<String_Comparison_Exp>;
};

/** ordering options when selecting data from "damage_class" */
export type Damage_Class_Order_By = {
  value?: Maybe<Order_By>;
};

/** primary key columns input for table: "damage_class" */
export type Damage_Class_Pk_Columns_Input = {
  value: Scalars['String'];
};

/** select columns of table "damage_class" */
export enum Damage_Class_Select_Column {
  /** column name */
  Value = 'value'
}

/** columns and relationships of "moves" */
export type Moves = {
  __typename?: 'moves';
  accuracy?: Maybe<Scalars['Int']>;
  /** An object relationship */
  damage_class?: Maybe<Damage_Class>;
  effect?: Maybe<Scalars['String']>;
  effect_chance?: Maybe<Scalars['Int']>;
  id: Scalars['uuid'];
  name: Scalars['String'];
  power?: Maybe<Scalars['Int']>;
  pp?: Maybe<Scalars['Int']>;
  slug: Scalars['String'];
  target?: Maybe<Scalars['String']>;
  /** An object relationship */
  type: Types;
};

/** Boolean expression to filter rows from the table "moves". All fields are combined with a logical 'AND'. */
export type Moves_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Moves_Bool_Exp>>>;
  _not?: Maybe<Moves_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Moves_Bool_Exp>>>;
  accuracy?: Maybe<Int_Comparison_Exp>;
  damage_class?: Maybe<Damage_Class_Bool_Exp>;
  effect?: Maybe<String_Comparison_Exp>;
  effect_chance?: Maybe<Int_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  power?: Maybe<Int_Comparison_Exp>;
  pp?: Maybe<Int_Comparison_Exp>;
  slug?: Maybe<String_Comparison_Exp>;
  target?: Maybe<String_Comparison_Exp>;
  type?: Maybe<Types_Bool_Exp>;
};

/** ordering options when selecting data from "moves" */
export type Moves_Order_By = {
  accuracy?: Maybe<Order_By>;
  damage_class?: Maybe<Damage_Class_Order_By>;
  effect?: Maybe<Order_By>;
  effect_chance?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  power?: Maybe<Order_By>;
  pp?: Maybe<Order_By>;
  slug?: Maybe<Order_By>;
  target?: Maybe<Order_By>;
  type?: Maybe<Types_Order_By>;
};

/** primary key columns input for table: "moves" */
export type Moves_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "moves" */
export enum Moves_Select_Column {
  /** column name */
  Accuracy = 'accuracy',
  /** column name */
  Effect = 'effect',
  /** column name */
  EffectChance = 'effect_chance',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Power = 'power',
  /** column name */
  Pp = 'pp',
  /** column name */
  Slug = 'slug',
  /** column name */
  Target = 'target'
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** insert a single row into the table: "teams" */
  createTeam?: Maybe<Teams>;
  /** insert a single row into the table: "team_member" */
  createTeamMember?: Maybe<Team_Member>;
  /** insert a single row into the table: "team_member_move" */
  createTeamMemberMove?: Maybe<Team_Member_Move>;
  /** insert data into the table: "team_member_move" */
  createTeamMemberMoves?: Maybe<Team_Member_Move_Mutation_Response>;
  /** insert data into the table: "team_member" */
  createTeamMembers?: Maybe<Team_Member_Mutation_Response>;
  /** insert data into the table: "teams" */
  createTeams?: Maybe<Teams_Mutation_Response>;
  /** delete single row from the table: "teams" */
  deleteTeam?: Maybe<Teams>;
  /** delete single row from the table: "team_member" */
  deleteTeamMember?: Maybe<Team_Member>;
  /** delete single row from the table: "team_member_move" */
  deleteTeamMemberMove?: Maybe<Team_Member_Move>;
  /** delete data from the table: "team_member_move" */
  deleteTeamMemberMoves?: Maybe<Team_Member_Move_Mutation_Response>;
  /** delete data from the table: "team_member" */
  deleteTeamMembers?: Maybe<Team_Member_Mutation_Response>;
  /** delete data from the table: "teams" */
  deleteTeams?: Maybe<Teams_Mutation_Response>;
  /** update single row of the table: "teams" */
  updateTeam?: Maybe<Teams>;
  /** update single row of the table: "team_member" */
  updateTeamMember?: Maybe<Team_Member>;
  /** update single row of the table: "team_member_move" */
  updateTeamMemberMove?: Maybe<Team_Member_Move>;
  /** update data of the table: "team_member_move" */
  updateTeamMemberMoves?: Maybe<Team_Member_Move_Mutation_Response>;
  /** update data of the table: "team_member" */
  updateTeamMembers?: Maybe<Team_Member_Mutation_Response>;
  /** update data of the table: "teams" */
  updateTeams?: Maybe<Teams_Mutation_Response>;
};


/** mutation root */
export type Mutation_RootCreateTeamArgs = {
  object: Teams_Insert_Input;
  on_conflict?: Maybe<Teams_On_Conflict>;
};


/** mutation root */
export type Mutation_RootCreateTeamMemberArgs = {
  object: Team_Member_Insert_Input;
  on_conflict?: Maybe<Team_Member_On_Conflict>;
};


/** mutation root */
export type Mutation_RootCreateTeamMemberMoveArgs = {
  object: Team_Member_Move_Insert_Input;
  on_conflict?: Maybe<Team_Member_Move_On_Conflict>;
};


/** mutation root */
export type Mutation_RootCreateTeamMemberMovesArgs = {
  objects: Array<Team_Member_Move_Insert_Input>;
  on_conflict?: Maybe<Team_Member_Move_On_Conflict>;
};


/** mutation root */
export type Mutation_RootCreateTeamMembersArgs = {
  objects: Array<Team_Member_Insert_Input>;
  on_conflict?: Maybe<Team_Member_On_Conflict>;
};


/** mutation root */
export type Mutation_RootCreateTeamsArgs = {
  objects: Array<Teams_Insert_Input>;
  on_conflict?: Maybe<Teams_On_Conflict>;
};


/** mutation root */
export type Mutation_RootDeleteTeamArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteTeamMemberArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteTeamMemberMoveArgs = {
  move_id: Scalars['uuid'];
  team_member_id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteTeamMemberMovesArgs = {
  where: Team_Member_Move_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteTeamMembersArgs = {
  where: Team_Member_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDeleteTeamsArgs = {
  where: Teams_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateTeamArgs = {
  _set?: Maybe<Teams_Set_Input>;
  pk_columns: Teams_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateTeamMemberArgs = {
  _inc?: Maybe<Team_Member_Inc_Input>;
  _set?: Maybe<Team_Member_Set_Input>;
  pk_columns: Team_Member_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateTeamMemberMoveArgs = {
  _inc?: Maybe<Team_Member_Move_Inc_Input>;
  _set?: Maybe<Team_Member_Move_Set_Input>;
  pk_columns: Team_Member_Move_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdateTeamMemberMovesArgs = {
  _inc?: Maybe<Team_Member_Move_Inc_Input>;
  _set?: Maybe<Team_Member_Move_Set_Input>;
  where: Team_Member_Move_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateTeamMembersArgs = {
  _inc?: Maybe<Team_Member_Inc_Input>;
  _set?: Maybe<Team_Member_Set_Input>;
  where: Team_Member_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdateTeamsArgs = {
  _set?: Maybe<Teams_Set_Input>;
  where: Teams_Bool_Exp;
};

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "pokemon" */
export type Pokemon = {
  __typename?: 'pokemon';
  id: Scalars['uuid'];
  /** An array relationship */
  learnable_moves: Array<Pokemon_Move>;
  name: Scalars['String'];
  pokedex_id: Scalars['Int'];
  slug: Scalars['String'];
  sprite?: Maybe<Scalars['String']>;
  /** An array relationship */
  types: Array<Pokemon_Type>;
};


/** columns and relationships of "pokemon" */
export type PokemonLearnable_MovesArgs = {
  distinct_on?: Maybe<Array<Pokemon_Move_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Pokemon_Move_Order_By>>;
  where?: Maybe<Pokemon_Move_Bool_Exp>;
};


/** columns and relationships of "pokemon" */
export type PokemonTypesArgs = {
  distinct_on?: Maybe<Array<Pokemon_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Pokemon_Type_Order_By>>;
  where?: Maybe<Pokemon_Type_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "pokemon". All fields are combined with a logical 'AND'. */
export type Pokemon_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Pokemon_Bool_Exp>>>;
  _not?: Maybe<Pokemon_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Pokemon_Bool_Exp>>>;
  id?: Maybe<Uuid_Comparison_Exp>;
  learnable_moves?: Maybe<Pokemon_Move_Bool_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  pokedex_id?: Maybe<Int_Comparison_Exp>;
  slug?: Maybe<String_Comparison_Exp>;
  sprite?: Maybe<String_Comparison_Exp>;
  types?: Maybe<Pokemon_Type_Bool_Exp>;
};

/** columns and relationships of "pokemon_move" */
export type Pokemon_Move = {
  __typename?: 'pokemon_move';
  /** An object relationship */
  move: Moves;
  move_id: Scalars['uuid'];
};

/** Boolean expression to filter rows from the table "pokemon_move". All fields are combined with a logical 'AND'. */
export type Pokemon_Move_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Pokemon_Move_Bool_Exp>>>;
  _not?: Maybe<Pokemon_Move_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Pokemon_Move_Bool_Exp>>>;
  move?: Maybe<Moves_Bool_Exp>;
  move_id?: Maybe<Uuid_Comparison_Exp>;
};

/** ordering options when selecting data from "pokemon_move" */
export type Pokemon_Move_Order_By = {
  move?: Maybe<Moves_Order_By>;
  move_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "pokemon_move" */
export type Pokemon_Move_Pk_Columns_Input = {
  move_id: Scalars['uuid'];
  pokemon_id: Scalars['uuid'];
};

/** select columns of table "pokemon_move" */
export enum Pokemon_Move_Select_Column {
  /** column name */
  MoveId = 'move_id'
}

/** ordering options when selecting data from "pokemon" */
export type Pokemon_Order_By = {
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  pokedex_id?: Maybe<Order_By>;
  slug?: Maybe<Order_By>;
  sprite?: Maybe<Order_By>;
};

/** primary key columns input for table: "pokemon" */
export type Pokemon_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "pokemon" */
export enum Pokemon_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  PokedexId = 'pokedex_id',
  /** column name */
  Slug = 'slug',
  /** column name */
  Sprite = 'sprite'
}

/** columns and relationships of "pokemon_type" */
export type Pokemon_Type = {
  __typename?: 'pokemon_type';
  /** An object relationship */
  type: Types;
  type_id: Scalars['uuid'];
};

/** Boolean expression to filter rows from the table "pokemon_type". All fields are combined with a logical 'AND'. */
export type Pokemon_Type_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Pokemon_Type_Bool_Exp>>>;
  _not?: Maybe<Pokemon_Type_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Pokemon_Type_Bool_Exp>>>;
  type?: Maybe<Types_Bool_Exp>;
  type_id?: Maybe<Uuid_Comparison_Exp>;
};

/** ordering options when selecting data from "pokemon_type" */
export type Pokemon_Type_Order_By = {
  type?: Maybe<Types_Order_By>;
  type_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "pokemon_type" */
export type Pokemon_Type_Pk_Columns_Input = {
  pokemon_id: Scalars['uuid'];
  type_id: Scalars['uuid'];
};

/** select columns of table "pokemon_type" */
export enum Pokemon_Type_Select_Column {
  /** column name */
  TypeId = 'type_id'
}

/** query root */
export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "damage_class" using primary key columns */
  damageClassById?: Maybe<Damage_Class>;
  /** fetch data from the table: "damage_class" */
  damageClasses: Array<Damage_Class>;
  /** fetch data from the table: "moves" using primary key columns */
  moveById?: Maybe<Moves>;
  /** fetch data from the table: "moves" */
  moves: Array<Moves>;
  /** fetch data from the table: "pokemon" */
  pokemon: Array<Pokemon>;
  /** fetch data from the table: "pokemon" using primary key columns */
  pokemonById?: Maybe<Pokemon>;
  /** fetch data from the table: "pokemon_move" using primary key columns */
  pokemonMoveById?: Maybe<Pokemon_Move>;
  /** fetch data from the table: "pokemon_move" */
  pokemonMoves: Array<Pokemon_Move>;
  /** fetch data from the table: "pokemon_type" using primary key columns */
  pokemonTypeById?: Maybe<Pokemon_Type>;
  /** fetch data from the table: "pokemon_type" */
  pokemonTypes: Array<Pokemon_Type>;
  /** fetch data from the table: "teams" using primary key columns */
  teamById?: Maybe<Teams>;
  /** fetch data from the table: "team_member" using primary key columns */
  teamMemberById?: Maybe<Team_Member>;
  /** fetch data from the table: "team_member_move" using primary key columns */
  teamMemberMoveById?: Maybe<Team_Member_Move>;
  /** fetch data from the table: "team_member_move" */
  teamMemberMoves: Array<Team_Member_Move>;
  /** fetch data from the table: "team_member" */
  teamMembers: Array<Team_Member>;
  /** fetch data from the table: "teams" */
  teams: Array<Teams>;
  /** fetch data from the table: "types" using primary key columns */
  typeById?: Maybe<Types>;
  /** fetch data from the table: "types" */
  types: Array<Types>;
};


/** query root */
export type Query_RootDamageClassByIdArgs = {
  value: Scalars['String'];
};


/** query root */
export type Query_RootDamageClassesArgs = {
  distinct_on?: Maybe<Array<Damage_Class_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Damage_Class_Order_By>>;
  where?: Maybe<Damage_Class_Bool_Exp>;
};


/** query root */
export type Query_RootMoveByIdArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootMovesArgs = {
  distinct_on?: Maybe<Array<Moves_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Moves_Order_By>>;
  where?: Maybe<Moves_Bool_Exp>;
};


/** query root */
export type Query_RootPokemonArgs = {
  distinct_on?: Maybe<Array<Pokemon_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Pokemon_Order_By>>;
  where?: Maybe<Pokemon_Bool_Exp>;
};


/** query root */
export type Query_RootPokemonByIdArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootPokemonMoveByIdArgs = {
  move_id: Scalars['uuid'];
  pokemon_id: Scalars['uuid'];
};


/** query root */
export type Query_RootPokemonMovesArgs = {
  distinct_on?: Maybe<Array<Pokemon_Move_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Pokemon_Move_Order_By>>;
  where?: Maybe<Pokemon_Move_Bool_Exp>;
};


/** query root */
export type Query_RootPokemonTypeByIdArgs = {
  pokemon_id: Scalars['uuid'];
  type_id: Scalars['uuid'];
};


/** query root */
export type Query_RootPokemonTypesArgs = {
  distinct_on?: Maybe<Array<Pokemon_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Pokemon_Type_Order_By>>;
  where?: Maybe<Pokemon_Type_Bool_Exp>;
};


/** query root */
export type Query_RootTeamByIdArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootTeamMemberByIdArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootTeamMemberMoveByIdArgs = {
  move_id: Scalars['uuid'];
  team_member_id: Scalars['uuid'];
};


/** query root */
export type Query_RootTeamMemberMovesArgs = {
  distinct_on?: Maybe<Array<Team_Member_Move_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Team_Member_Move_Order_By>>;
  where?: Maybe<Team_Member_Move_Bool_Exp>;
};


/** query root */
export type Query_RootTeamMembersArgs = {
  distinct_on?: Maybe<Array<Team_Member_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Team_Member_Order_By>>;
  where?: Maybe<Team_Member_Bool_Exp>;
};


/** query root */
export type Query_RootTeamsArgs = {
  distinct_on?: Maybe<Array<Teams_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Teams_Order_By>>;
  where?: Maybe<Teams_Bool_Exp>;
};


/** query root */
export type Query_RootTypeByIdArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootTypesArgs = {
  distinct_on?: Maybe<Array<Types_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Types_Order_By>>;
  where?: Maybe<Types_Bool_Exp>;
};

/** subscription root */
export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "damage_class" using primary key columns */
  damageClassById?: Maybe<Damage_Class>;
  /** fetch data from the table: "damage_class" */
  damageClasses: Array<Damage_Class>;
  /** fetch data from the table: "moves" using primary key columns */
  moveById?: Maybe<Moves>;
  /** fetch data from the table: "moves" */
  moves: Array<Moves>;
  /** fetch data from the table: "pokemon" */
  pokemon: Array<Pokemon>;
  /** fetch data from the table: "pokemon" using primary key columns */
  pokemonById?: Maybe<Pokemon>;
  /** fetch data from the table: "pokemon_move" using primary key columns */
  pokemonMoveById?: Maybe<Pokemon_Move>;
  /** fetch data from the table: "pokemon_move" */
  pokemonMoves: Array<Pokemon_Move>;
  /** fetch data from the table: "pokemon_type" using primary key columns */
  pokemonTypeById?: Maybe<Pokemon_Type>;
  /** fetch data from the table: "pokemon_type" */
  pokemonTypes: Array<Pokemon_Type>;
  /** fetch data from the table: "teams" using primary key columns */
  teamById?: Maybe<Teams>;
  /** fetch data from the table: "team_member" using primary key columns */
  teamMemberById?: Maybe<Team_Member>;
  /** fetch data from the table: "team_member_move" using primary key columns */
  teamMemberMoveById?: Maybe<Team_Member_Move>;
  /** fetch data from the table: "team_member_move" */
  teamMemberMoves: Array<Team_Member_Move>;
  /** fetch data from the table: "team_member" */
  teamMembers: Array<Team_Member>;
  /** fetch data from the table: "teams" */
  teams: Array<Teams>;
  /** fetch data from the table: "types" using primary key columns */
  typeById?: Maybe<Types>;
  /** fetch data from the table: "types" */
  types: Array<Types>;
};


/** subscription root */
export type Subscription_RootDamageClassByIdArgs = {
  value: Scalars['String'];
};


/** subscription root */
export type Subscription_RootDamageClassesArgs = {
  distinct_on?: Maybe<Array<Damage_Class_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Damage_Class_Order_By>>;
  where?: Maybe<Damage_Class_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootMoveByIdArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootMovesArgs = {
  distinct_on?: Maybe<Array<Moves_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Moves_Order_By>>;
  where?: Maybe<Moves_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPokemonArgs = {
  distinct_on?: Maybe<Array<Pokemon_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Pokemon_Order_By>>;
  where?: Maybe<Pokemon_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPokemonByIdArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootPokemonMoveByIdArgs = {
  move_id: Scalars['uuid'];
  pokemon_id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootPokemonMovesArgs = {
  distinct_on?: Maybe<Array<Pokemon_Move_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Pokemon_Move_Order_By>>;
  where?: Maybe<Pokemon_Move_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPokemonTypeByIdArgs = {
  pokemon_id: Scalars['uuid'];
  type_id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootPokemonTypesArgs = {
  distinct_on?: Maybe<Array<Pokemon_Type_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Pokemon_Type_Order_By>>;
  where?: Maybe<Pokemon_Type_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTeamByIdArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootTeamMemberByIdArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootTeamMemberMoveByIdArgs = {
  move_id: Scalars['uuid'];
  team_member_id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootTeamMemberMovesArgs = {
  distinct_on?: Maybe<Array<Team_Member_Move_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Team_Member_Move_Order_By>>;
  where?: Maybe<Team_Member_Move_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTeamMembersArgs = {
  distinct_on?: Maybe<Array<Team_Member_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Team_Member_Order_By>>;
  where?: Maybe<Team_Member_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTeamsArgs = {
  distinct_on?: Maybe<Array<Teams_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Teams_Order_By>>;
  where?: Maybe<Teams_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTypeByIdArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootTypesArgs = {
  distinct_on?: Maybe<Array<Types_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Types_Order_By>>;
  where?: Maybe<Types_Bool_Exp>;
};

/** columns and relationships of "team_member" */
export type Team_Member = {
  __typename?: 'team_member';
  id: Scalars['uuid'];
  /** An array relationship */
  learned_moves: Array<Team_Member_Move>;
  order: Scalars['Int'];
  /** An object relationship */
  pokemon: Pokemon;
};


/** columns and relationships of "team_member" */
export type Team_MemberLearned_MovesArgs = {
  distinct_on?: Maybe<Array<Team_Member_Move_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Team_Member_Move_Order_By>>;
  where?: Maybe<Team_Member_Move_Bool_Exp>;
};

/** input type for inserting array relation for remote table "team_member" */
export type Team_Member_Arr_Rel_Insert_Input = {
  data: Array<Team_Member_Insert_Input>;
  on_conflict?: Maybe<Team_Member_On_Conflict>;
};

/** Boolean expression to filter rows from the table "team_member". All fields are combined with a logical 'AND'. */
export type Team_Member_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Team_Member_Bool_Exp>>>;
  _not?: Maybe<Team_Member_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Team_Member_Bool_Exp>>>;
  id?: Maybe<Uuid_Comparison_Exp>;
  learned_moves?: Maybe<Team_Member_Move_Bool_Exp>;
  order?: Maybe<Int_Comparison_Exp>;
  pokemon?: Maybe<Pokemon_Bool_Exp>;
};

/** unique or primary key constraints on table "team_member" */
export enum Team_Member_Constraint {
  /** unique or primary key constraint */
  TeamMemberPkey = 'team_member_pkey'
}

/** input type for incrementing integer column in table "team_member" */
export type Team_Member_Inc_Input = {
  order?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "team_member" */
export type Team_Member_Insert_Input = {
  id?: Maybe<Scalars['uuid']>;
  learned_moves?: Maybe<Team_Member_Move_Arr_Rel_Insert_Input>;
  order?: Maybe<Scalars['Int']>;
  pokemon_id?: Maybe<Scalars['uuid']>;
  team_id?: Maybe<Scalars['uuid']>;
};

/** columns and relationships of "team_member_move" */
export type Team_Member_Move = {
  __typename?: 'team_member_move';
  /** An object relationship */
  move: Moves;
  order: Scalars['Int'];
};

/** input type for inserting array relation for remote table "team_member_move" */
export type Team_Member_Move_Arr_Rel_Insert_Input = {
  data: Array<Team_Member_Move_Insert_Input>;
  on_conflict?: Maybe<Team_Member_Move_On_Conflict>;
};

/** Boolean expression to filter rows from the table "team_member_move". All fields are combined with a logical 'AND'. */
export type Team_Member_Move_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Team_Member_Move_Bool_Exp>>>;
  _not?: Maybe<Team_Member_Move_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Team_Member_Move_Bool_Exp>>>;
  move?: Maybe<Moves_Bool_Exp>;
  order?: Maybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "team_member_move" */
export enum Team_Member_Move_Constraint {
  /** unique or primary key constraint */
  TeamMemberMoveTeamMemberIdMoveIdKey = 'team_member_move_team_member_id_move_id_key',
  /** unique or primary key constraint */
  TeamMemberPokemonMovePkey = 'team_member_pokemon_move_pkey'
}

/** input type for incrementing integer column in table "team_member_move" */
export type Team_Member_Move_Inc_Input = {
  order?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "team_member_move" */
export type Team_Member_Move_Insert_Input = {
  order?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "team_member_move" */
export type Team_Member_Move_Mutation_Response = {
  __typename?: 'team_member_move_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Team_Member_Move>;
};

/** input type for inserting object relation for remote table "team_member_move" */
export type Team_Member_Move_Obj_Rel_Insert_Input = {
  data: Team_Member_Move_Insert_Input;
  on_conflict?: Maybe<Team_Member_Move_On_Conflict>;
};

/** on conflict condition type for table "team_member_move" */
export type Team_Member_Move_On_Conflict = {
  constraint: Team_Member_Move_Constraint;
  update_columns: Array<Team_Member_Move_Update_Column>;
  where?: Maybe<Team_Member_Move_Bool_Exp>;
};

/** ordering options when selecting data from "team_member_move" */
export type Team_Member_Move_Order_By = {
  move?: Maybe<Moves_Order_By>;
  order?: Maybe<Order_By>;
};

/** primary key columns input for table: "team_member_move" */
export type Team_Member_Move_Pk_Columns_Input = {
  move_id: Scalars['uuid'];
  team_member_id: Scalars['uuid'];
};

/** select columns of table "team_member_move" */
export enum Team_Member_Move_Select_Column {
  /** column name */
  Order = 'order'
}

/** input type for updating data in table "team_member_move" */
export type Team_Member_Move_Set_Input = {
  order?: Maybe<Scalars['Int']>;
};

/** update columns of table "team_member_move" */
export enum Team_Member_Move_Update_Column {
  /** column name */
  Order = 'order'
}

/** response of any mutation on the table "team_member" */
export type Team_Member_Mutation_Response = {
  __typename?: 'team_member_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Team_Member>;
};

/** input type for inserting object relation for remote table "team_member" */
export type Team_Member_Obj_Rel_Insert_Input = {
  data: Team_Member_Insert_Input;
  on_conflict?: Maybe<Team_Member_On_Conflict>;
};

/** on conflict condition type for table "team_member" */
export type Team_Member_On_Conflict = {
  constraint: Team_Member_Constraint;
  update_columns: Array<Team_Member_Update_Column>;
  where?: Maybe<Team_Member_Bool_Exp>;
};

/** ordering options when selecting data from "team_member" */
export type Team_Member_Order_By = {
  id?: Maybe<Order_By>;
  order?: Maybe<Order_By>;
  pokemon?: Maybe<Pokemon_Order_By>;
};

/** primary key columns input for table: "team_member" */
export type Team_Member_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "team_member" */
export enum Team_Member_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Order = 'order'
}

/** input type for updating data in table "team_member" */
export type Team_Member_Set_Input = {
  order?: Maybe<Scalars['Int']>;
};

/** update columns of table "team_member" */
export enum Team_Member_Update_Column {
  /** column name */
  Order = 'order'
}

/** columns and relationships of "teams" */
export type Teams = {
  __typename?: 'teams';
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  /** An array relationship */
  team_members: Array<Team_Member>;
};


/** columns and relationships of "teams" */
export type TeamsTeam_MembersArgs = {
  distinct_on?: Maybe<Array<Team_Member_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Team_Member_Order_By>>;
  where?: Maybe<Team_Member_Bool_Exp>;
};

/** input type for inserting array relation for remote table "teams" */
export type Teams_Arr_Rel_Insert_Input = {
  data: Array<Teams_Insert_Input>;
  on_conflict?: Maybe<Teams_On_Conflict>;
};

/** Boolean expression to filter rows from the table "teams". All fields are combined with a logical 'AND'. */
export type Teams_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Teams_Bool_Exp>>>;
  _not?: Maybe<Teams_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Teams_Bool_Exp>>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  team_members?: Maybe<Team_Member_Bool_Exp>;
};

/** unique or primary key constraints on table "teams" */
export enum Teams_Constraint {
  /** unique or primary key constraint */
  TeamPkey = 'team_pkey'
}

/** input type for inserting data into table "teams" */
export type Teams_Insert_Input = {
  name?: Maybe<Scalars['String']>;
  team_members?: Maybe<Team_Member_Arr_Rel_Insert_Input>;
};

/** response of any mutation on the table "teams" */
export type Teams_Mutation_Response = {
  __typename?: 'teams_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Teams>;
};

/** input type for inserting object relation for remote table "teams" */
export type Teams_Obj_Rel_Insert_Input = {
  data: Teams_Insert_Input;
  on_conflict?: Maybe<Teams_On_Conflict>;
};

/** on conflict condition type for table "teams" */
export type Teams_On_Conflict = {
  constraint: Teams_Constraint;
  update_columns: Array<Teams_Update_Column>;
  where?: Maybe<Teams_Bool_Exp>;
};

/** ordering options when selecting data from "teams" */
export type Teams_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** primary key columns input for table: "teams" */
export type Teams_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "teams" */
export enum Teams_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "teams" */
export type Teams_Set_Input = {
  name?: Maybe<Scalars['String']>;
};

/** update columns of table "teams" */
export enum Teams_Update_Column {
  /** column name */
  Name = 'name'
}


/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "types" */
export type Types = {
  __typename?: 'types';
  id: Scalars['uuid'];
  name: Scalars['String'];
  slug: Scalars['String'];
};

/** Boolean expression to filter rows from the table "types". All fields are combined with a logical 'AND'. */
export type Types_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Types_Bool_Exp>>>;
  _not?: Maybe<Types_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Types_Bool_Exp>>>;
  id?: Maybe<Uuid_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  slug?: Maybe<String_Comparison_Exp>;
};

/** ordering options when selecting data from "types" */
export type Types_Order_By = {
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  slug?: Maybe<Order_By>;
};

/** primary key columns input for table: "types" */
export type Types_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "types" */
export enum Types_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Slug = 'slug'
}


/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: Maybe<Scalars['uuid']>;
  _gt?: Maybe<Scalars['uuid']>;
  _gte?: Maybe<Scalars['uuid']>;
  _in?: Maybe<Array<Scalars['uuid']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['uuid']>;
  _lte?: Maybe<Scalars['uuid']>;
  _neq?: Maybe<Scalars['uuid']>;
  _nin?: Maybe<Array<Scalars['uuid']>>;
};

export type MoveFragmentFragment = (
  { __typename?: 'moves' }
  & Pick<Moves, 'id' | 'slug' | 'name' | 'accuracy' | 'power' | 'pp' | 'effect'>
  & { damage_class?: Maybe<(
    { __typename?: 'damage_class' }
    & Pick<Damage_Class, 'value'>
  )>, type: (
    { __typename?: 'types' }
    & TypeFragmentFragment
  ) }
);

export type PokemonFragmentFragment = (
  { __typename?: 'pokemon' }
  & Pick<Pokemon, 'id' | 'pokedex_id' | 'name' | 'slug' | 'sprite'>
  & { types: Array<(
    { __typename?: 'pokemon_type' }
    & Pick<Pokemon_Type, 'type_id'>
    & { type: (
      { __typename?: 'types' }
      & TypeFragmentFragment
    ) }
  )> }
);

export type TeamFragmentFragment = (
  { __typename?: 'teams' }
  & Pick<Teams, 'id' | 'name' | 'created_at'>
  & { team_members: Array<(
    { __typename?: 'team_member' }
    & TeamMemberFragmentFragment
  )> }
);

export type TeamMemberFragmentFragment = (
  { __typename?: 'team_member' }
  & Pick<Team_Member, 'id' | 'order'>
  & { pokemon: (
    { __typename?: 'pokemon' }
    & { learnable_moves: Array<(
      { __typename?: 'pokemon_move' }
      & Pick<Pokemon_Move, 'move_id'>
      & { move: (
        { __typename?: 'moves' }
        & MoveFragmentFragment
      ) }
    )> }
    & PokemonFragmentFragment
  ), learned_moves: Array<(
    { __typename?: 'team_member_move' }
    & Pick<Team_Member_Move, 'order'>
    & { move: (
      { __typename?: 'moves' }
      & MoveFragmentFragment
    ) }
  )> }
);

export type TypeFragmentFragment = (
  { __typename?: 'types' }
  & Pick<Types, 'id' | 'name' | 'slug'>
);

export type CreateTeamMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateTeamMutation = (
  { __typename?: 'mutation_root' }
  & { createTeam?: Maybe<(
    { __typename?: 'teams' }
    & TeamFragmentFragment
  )> }
);

export type CreateTeamMembersMutationVariables = Exact<{
  members: Array<Team_Member_Insert_Input> | Team_Member_Insert_Input;
}>;


export type CreateTeamMembersMutation = (
  { __typename?: 'mutation_root' }
  & { createTeamMembers?: Maybe<(
    { __typename?: 'team_member_mutation_response' }
    & { returning: Array<(
      { __typename?: 'team_member' }
      & TeamMemberFragmentFragment
    )> }
  )> }
);

export type DeleteTeamMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type DeleteTeamMutation = (
  { __typename?: 'mutation_root' }
  & { deleteTeam?: Maybe<(
    { __typename?: 'teams' }
    & TeamFragmentFragment
  )> }
);

export type DeleteTeamMembersMutationVariables = Exact<{
  members?: Maybe<Array<Scalars['uuid']> | Scalars['uuid']>;
}>;


export type DeleteTeamMembersMutation = (
  { __typename?: 'mutation_root' }
  & { deleteTeamMembers?: Maybe<(
    { __typename?: 'team_member_mutation_response' }
    & { returning: Array<(
      { __typename?: 'team_member' }
      & TeamMemberFragmentFragment
    )> }
  )> }
);

export type UpdateTeamMutationVariables = Exact<{
  id: Scalars['uuid'];
  name: Scalars['String'];
}>;


export type UpdateTeamMutation = (
  { __typename?: 'mutation_root' }
  & { updateTeam?: Maybe<(
    { __typename?: 'teams' }
    & TeamFragmentFragment
  )> }
);

export type AllPokemonQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPokemonQuery = (
  { __typename?: 'query_root' }
  & { pokemon: Array<(
    { __typename?: 'pokemon' }
    & { learnable_moves: Array<(
      { __typename?: 'pokemon_move' }
      & Pick<Pokemon_Move, 'move_id'>
      & { move: (
        { __typename?: 'moves' }
        & MoveFragmentFragment
      ) }
    )> }
    & PokemonFragmentFragment
  )> }
);

export type AllTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTeamsQuery = (
  { __typename?: 'query_root' }
  & { teams: Array<(
    { __typename?: 'teams' }
    & Pick<Teams, 'id' | 'name' | 'created_at'>
    & { team_members: Array<(
      { __typename?: 'team_member' }
      & Pick<Team_Member, 'id' | 'order'>
      & { pokemon: (
        { __typename?: 'pokemon' }
        & PokemonFragmentFragment
      ) }
    )> }
  )> }
);

export type TeamByIdQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type TeamByIdQuery = (
  { __typename?: 'query_root' }
  & { teamById?: Maybe<(
    { __typename?: 'teams' }
    & TeamFragmentFragment
  )> }
);

export const TypeFragmentFragmentDoc = gql`
    fragment TypeFragment on types {
  id
  name
  slug
}
    `;
export const PokemonFragmentFragmentDoc = gql`
    fragment PokemonFragment on pokemon {
  id
  pokedex_id
  name
  slug
  sprite
  types {
    type_id
    type {
      ...TypeFragment
    }
  }
}
    ${TypeFragmentFragmentDoc}`;
export const MoveFragmentFragmentDoc = gql`
    fragment MoveFragment on moves {
  id
  slug
  name
  accuracy
  power
  pp
  effect
  damage_class {
    value
  }
  type {
    ...TypeFragment
  }
}
    ${TypeFragmentFragmentDoc}`;
export const TeamMemberFragmentFragmentDoc = gql`
    fragment TeamMemberFragment on team_member {
  id
  order
  pokemon {
    ...PokemonFragment
    learnable_moves {
      move_id
      move {
        ...MoveFragment
      }
    }
  }
  learned_moves {
    order
    move {
      ...MoveFragment
    }
  }
}
    ${PokemonFragmentFragmentDoc}
${MoveFragmentFragmentDoc}`;
export const TeamFragmentFragmentDoc = gql`
    fragment TeamFragment on teams {
  id
  name
  created_at
  team_members {
    ...TeamMemberFragment
  }
}
    ${TeamMemberFragmentFragmentDoc}`;
export const CreateTeamDocument = gql`
    mutation CreateTeam($name: String!) {
  createTeam(object: {name: $name}) {
    ...TeamFragment
  }
}
    ${TeamFragmentFragmentDoc}`;

export function useCreateTeamMutation() {
  return Urql.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument);
};
export const CreateTeamMembersDocument = gql`
    mutation CreateTeamMembers($members: [team_member_insert_input!]!) {
  createTeamMembers(
    objects: $members
    on_conflict: {constraint: team_member_pkey, update_columns: [order]}
  ) {
    returning {
      ...TeamMemberFragment
    }
  }
}
    ${TeamMemberFragmentFragmentDoc}`;

export function useCreateTeamMembersMutation() {
  return Urql.useMutation<CreateTeamMembersMutation, CreateTeamMembersMutationVariables>(CreateTeamMembersDocument);
};
export const DeleteTeamDocument = gql`
    mutation DeleteTeam($id: uuid!) {
  deleteTeam(id: $id) {
    ...TeamFragment
  }
}
    ${TeamFragmentFragmentDoc}`;

export function useDeleteTeamMutation() {
  return Urql.useMutation<DeleteTeamMutation, DeleteTeamMutationVariables>(DeleteTeamDocument);
};
export const DeleteTeamMembersDocument = gql`
    mutation DeleteTeamMembers($members: [uuid!]) {
  deleteTeamMembers(where: {id: {_in: $members}}) {
    returning {
      ...TeamMemberFragment
    }
  }
}
    ${TeamMemberFragmentFragmentDoc}`;

export function useDeleteTeamMembersMutation() {
  return Urql.useMutation<DeleteTeamMembersMutation, DeleteTeamMembersMutationVariables>(DeleteTeamMembersDocument);
};
export const UpdateTeamDocument = gql`
    mutation UpdateTeam($id: uuid!, $name: String!) {
  updateTeam(pk_columns: {id: $id}, _set: {name: $name}) {
    ...TeamFragment
  }
}
    ${TeamFragmentFragmentDoc}`;

export function useUpdateTeamMutation() {
  return Urql.useMutation<UpdateTeamMutation, UpdateTeamMutationVariables>(UpdateTeamDocument);
};
export const AllPokemonDocument = gql`
    query AllPokemon {
  pokemon(order_by: {pokedex_id: asc_nulls_last}) {
    ...PokemonFragment
    learnable_moves {
      move_id
      move {
        ...MoveFragment
      }
    }
  }
}
    ${PokemonFragmentFragmentDoc}
${MoveFragmentFragmentDoc}`;

export function useAllPokemonQuery(options: Omit<Urql.UseQueryArgs<AllPokemonQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllPokemonQuery>({ query: AllPokemonDocument, ...options });
};
export const AllTeamsDocument = gql`
    query AllTeams {
  teams(order_by: {created_at: desc_nulls_last}) {
    id
    name
    created_at
    team_members {
      id
      order
      pokemon {
        ...PokemonFragment
      }
    }
  }
}
    ${PokemonFragmentFragmentDoc}`;

export function useAllTeamsQuery(options: Omit<Urql.UseQueryArgs<AllTeamsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllTeamsQuery>({ query: AllTeamsDocument, ...options });
};
export const TeamByIdDocument = gql`
    query TeamById($id: uuid!) {
  teamById(id: $id) {
    ...TeamFragment
  }
}
    ${TeamFragmentFragmentDoc}`;

export function useTeamByIdQuery(options: Omit<Urql.UseQueryArgs<TeamByIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TeamByIdQuery>({ query: TeamByIdDocument, ...options });
};
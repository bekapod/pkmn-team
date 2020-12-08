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
  Date: any;
  Time: any;
  /** The `Long` scalar type represents non-fractional signed whole numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: any;
};


/** 'Move' input values */
export type MoveInput = {
  slug: Scalars['String'];
  name: Scalars['String'];
  accuracy?: Maybe<Scalars['Int']>;
  pp?: Maybe<Scalars['Int']>;
  power?: Maybe<Scalars['Int']>;
  damageClass: Scalars['String'];
  effect?: Maybe<Scalars['String']>;
  effectChance?: Maybe<Scalars['Int']>;
  generation: Scalars['String'];
  target?: Maybe<Scalars['String']>;
  type?: Maybe<MoveTypeRelation>;
};

/** Allow manipulating the relationship between the types 'Move' and 'Type' using the field 'Move.type'. */
export type MoveTypeRelation = {
  /** Create a document of type 'Type' and associate it with the current document. */
  create?: Maybe<TypeInput>;
  /** Connect a document of type 'Type' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>;
  /** If true, disconnects this document from 'Type' */
  disconnect?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Delete an existing document in the collection of 'Type' */
  deleteType?: Maybe<Type>;
  /** Create a new document in the collection of 'Move' */
  createMove: Move;
  /** Create a new document in the collection of 'Type' */
  createType: Type;
  /** Update an existing document in the collection of 'Move' */
  updateMove?: Maybe<Move>;
  /** Delete an existing document in the collection of 'Pokemon' */
  deletePokemon?: Maybe<Pokemon>;
  /** Create a new document in the collection of 'Team' */
  createTeam: Team;
  /** Update an existing document in the collection of 'Type' */
  updateType?: Maybe<Type>;
  /** Create a new document in the collection of 'Pokemon' */
  createPokemon: Pokemon;
  /** Update an existing document in the collection of 'Team' */
  updateTeam?: Maybe<Team>;
  /** Update an existing document in the collection of 'Pokemon' */
  updatePokemon?: Maybe<Pokemon>;
  /** Delete an existing document in the collection of 'Move' */
  deleteMove?: Maybe<Move>;
  /** Delete an existing document in the collection of 'Team' */
  deleteTeam?: Maybe<Team>;
};


export type MutationDeleteTypeArgs = {
  id: Scalars['ID'];
};


export type MutationCreateMoveArgs = {
  data: MoveInput;
};


export type MutationCreateTypeArgs = {
  data: TypeInput;
};


export type MutationUpdateMoveArgs = {
  id: Scalars['ID'];
  data: MoveInput;
};


export type MutationDeletePokemonArgs = {
  id: Scalars['ID'];
};


export type MutationCreateTeamArgs = {
  data: TeamInput;
};


export type MutationUpdateTypeArgs = {
  id: Scalars['ID'];
  data: TypeInput;
};


export type MutationCreatePokemonArgs = {
  data: PokemonInput;
};


export type MutationUpdateTeamArgs = {
  id: Scalars['ID'];
  data: TeamInput;
};


export type MutationUpdatePokemonArgs = {
  id: Scalars['ID'];
  data: PokemonInput;
};


export type MutationDeleteMoveArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteTeamArgs = {
  id: Scalars['ID'];
};

/** 'Pokemon' input values */
export type PokemonInput = {
  pokedexId: Scalars['Int'];
  slug: Scalars['String'];
  name: Scalars['String'];
  sprite?: Maybe<Scalars['String']>;
  types: Array<Scalars['ID']>;
  learnableMoves: Array<PokemonMoveInput>;
};

/** 'PokemonMove' input values */
export type PokemonMoveInput = {
  key: Scalars['String'];
  levelLearnedAt: Scalars['Int'];
  version: Scalars['String'];
  learnMethod: Scalars['String'];
  move: Scalars['ID'];
};

/** Allow manipulating the relationship between the types 'PokemonMove' and 'Move' using the field 'PokemonMove.move'. */
export type PokemonMoveMoveRelation = {
  /** Create a document of type 'Move' and associate it with the current document. */
  create?: Maybe<MoveInput>;
  /** Connect a document of type 'Move' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>;
};

/** 'Team' input values */
export type TeamInput = {
  name: Scalars['String'];
  members: Array<TeamMemberInput>;
};

/** 'TeamMember' input values */
export type TeamMemberInput = {
  id: Scalars['String'];
  order: Scalars['Int'];
  pokemon: Scalars['ID'];
  learnedMoves: Array<TeamMemberMoveInput>;
};

/** 'TeamMemberMove' input values */
export type TeamMemberMoveInput = {
  order: Scalars['Int'];
  move: Scalars['ID'];
};

/** Allow manipulating the relationship between the types 'TeamMemberMove' and 'Move' using the field 'TeamMemberMove.move'. */
export type TeamMemberMoveMoveRelation = {
  /** Create a document of type 'Move' and associate it with the current document. */
  create?: Maybe<MoveInput>;
  /** Connect a document of type 'Move' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>;
};

/** Allow manipulating the relationship between the types 'TeamMember' and 'Pokemon' using the field 'TeamMember.pokemon'. */
export type TeamMemberPokemonRelation = {
  /** Create a document of type 'Pokemon' and associate it with the current document. */
  create?: Maybe<PokemonInput>;
  /** Connect a document of type 'Pokemon' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>;
};


/** 'Type' input values */
export type TypeInput = {
  slug: Scalars['String'];
  name: Scalars['String'];
  pokemon: Array<Scalars['ID']>;
  moves: Array<Scalars['ID']>;
};

export type Move = {
  __typename?: 'Move';
  name: Scalars['String'];
  generation: Scalars['String'];
  /** The document's ID. */
  _id: Scalars['ID'];
  effect?: Maybe<Scalars['String']>;
  accuracy?: Maybe<Scalars['Int']>;
  damageClass: Scalars['String'];
  slug: Scalars['String'];
  target?: Maybe<Scalars['String']>;
  pp?: Maybe<Scalars['Int']>;
  effectChance?: Maybe<Scalars['Int']>;
  power?: Maybe<Scalars['Int']>;
  type?: Maybe<Type>;
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};

/** The pagination object for elements of type 'Move'. */
export type MovePage = {
  __typename?: 'MovePage';
  /** The elements of type 'Move' in this page. */
  data: Array<Maybe<Move>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

export type Pokemon = {
  __typename?: 'Pokemon';
  pokedexId: Scalars['Int'];
  name: Scalars['String'];
  /** The document's ID. */
  _id: Scalars['ID'];
  slug: Scalars['String'];
  sprite?: Maybe<Scalars['String']>;
  learnableMoves: Array<PokemonMove>;
  types: Array<Type>;
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};

export type PokemonMove = {
  __typename?: 'PokemonMove';
  move: Move;
  key: Scalars['String'];
  version: Scalars['String'];
  learnMethod: Scalars['String'];
  levelLearnedAt: Scalars['Int'];
};

/** The pagination object for elements of type 'Pokemon'. */
export type PokemonPage = {
  __typename?: 'PokemonPage';
  /** The elements of type 'Pokemon' in this page. */
  data: Array<Maybe<Pokemon>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  allMoves: MovePage;
  /** Find a document from the collection of 'Pokemon' by its id. */
  findPokemonByID?: Maybe<Pokemon>;
  /** Find a document from the collection of 'Type' by its id. */
  findTypeByID?: Maybe<Type>;
  /** Find a document from the collection of 'Move' by its id. */
  findMoveByID?: Maybe<Move>;
  /** Find a document from the collection of 'Team' by its id. */
  findTeamByID?: Maybe<Team>;
  allPokemonOrderedByPokedexId: QueryAllPokemonOrderedByPokedexIdPage;
  allTeams: TeamPage;
  allTypes: TypePage;
  allPokemon: PokemonPage;
};


export type QueryAllMovesArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};


export type QueryFindPokemonByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindTypeByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindMoveByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindTeamByIdArgs = {
  id: Scalars['ID'];
};


export type QueryAllPokemonOrderedByPokedexIdArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};


export type QueryAllTeamsArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};


export type QueryAllTypesArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};


export type QueryAllPokemonArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};

/** The pagination object for elements of type 'Pokemon'. */
export type QueryAllPokemonOrderedByPokedexIdPage = {
  __typename?: 'QueryAllPokemonOrderedByPokedexIdPage';
  /** The elements of type 'Pokemon' in this page. */
  data: Array<Maybe<Pokemon>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

export type Team = {
  __typename?: 'Team';
  /** The document's ID. */
  _id: Scalars['ID'];
  /** The document's timestamp. */
  _ts: Scalars['Long'];
  name: Scalars['String'];
  members: Array<TeamMember>;
};

export type TeamMember = {
  __typename?: 'TeamMember';
  id: Scalars['String'];
  order: Scalars['Int'];
  pokemon: Pokemon;
  learnedMoves: Array<TeamMemberMove>;
};

export type TeamMemberMove = {
  __typename?: 'TeamMemberMove';
  order: Scalars['Int'];
  move: Move;
};

/** The pagination object for elements of type 'Team'. */
export type TeamPage = {
  __typename?: 'TeamPage';
  /** The elements of type 'Team' in this page. */
  data: Array<Maybe<Team>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

export type Type = {
  __typename?: 'Type';
  name: Scalars['String'];
  /** The document's ID. */
  _id: Scalars['ID'];
  moves: Array<Move>;
  slug: Scalars['String'];
  pokemon: Array<Pokemon>;
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};

/** The pagination object for elements of type 'Type'. */
export type TypePage = {
  __typename?: 'TypePage';
  /** The elements of type 'Type' in this page. */
  data: Array<Maybe<Type>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};


export type AllPokemonQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPokemonQuery = (
  { __typename?: 'Query' }
  & { allPokemonOrderedByPokedexId: (
    { __typename?: 'QueryAllPokemonOrderedByPokedexIdPage' }
    & Pick<QueryAllPokemonOrderedByPokedexIdPage, 'before' | 'after'>
    & { data: Array<Maybe<(
      { __typename?: 'Pokemon' }
      & Pick<Pokemon, 'name' | 'slug' | 'pokedexId' | 'sprite'>
      & { types: Array<(
        { __typename?: 'Type' }
        & Pick<Type, 'name' | 'slug'>
      )>, learnableMoves: Array<(
        { __typename?: 'PokemonMove' }
        & Pick<PokemonMove, 'version' | 'learnMethod' | 'levelLearnedAt'>
        & { move: (
          { __typename?: 'Move' }
          & Pick<Move, 'name' | 'slug'>
          & { type?: Maybe<(
            { __typename?: 'Type' }
            & Pick<Type, 'name' | 'slug'>
          )> }
        ) }
      )> }
    )>> }
  ) }
);


export const AllPokemonDocument = gql`
    query AllPokemon {
  allPokemonOrderedByPokedexId {
    before
    after
    data {
      name
      slug
      pokedexId
      sprite
      types {
        name
        slug
      }
      learnableMoves {
        version
        learnMethod
        levelLearnedAt
        move {
          name
          slug
          type {
            name
            slug
          }
        }
      }
    }
  }
}
    `;

export function useAllPokemonQuery(options: Omit<Urql.UseQueryArgs<AllPokemonQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AllPokemonQuery>({ query: AllPokemonDocument, ...options });
};
import gql from "graphql-tag";
import { Moves } from "./moves";

export const PokemonDetailsWithoutMoves = gql`
  fragment PokemonDetailsWithoutMoves on Pokemon {
    id
    pokedexId
    name
    __typename
    types {
      name
      slug
      __typename
    }
    sprite
  }
`;

export const PokemonDetails = gql`
  fragment PokemonDetails on Pokemon {
    ...PokemonDetailsWithoutMoves

    moves {
      ...Moves
    }
  }
  ${PokemonDetailsWithoutMoves}
  ${Moves}
`;

export const getPokemon = gql`
  query {
    pokemon {
      ...PokemonDetailsWithoutMoves
    }
  }
  ${PokemonDetailsWithoutMoves}
`;

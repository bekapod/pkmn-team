import gql from "graphql-tag";
import { Moves } from "./moves";

export const PokemonDetailsWithoutMoves = gql`
  fragment PokemonDetailsWithoutMoves on Pokemon {
    id
    pokedexId
    name
    types {
      name
      slug
    }
    sprite
  }
`;

export const PokemonDetails = gql`
  fragment PokemonDetails on Pokemon {
    ...PokemonDetailsWithoutMoves

    moves(version: "yellow") {
      ...Moves
    }
  }
  ${PokemonDetailsWithoutMoves}
  ${Moves}
`;

export const getPokemon = gql`
  query {
    pokemon {
      ...PokemonDetails
    }
  }
  ${PokemonDetails}
`;

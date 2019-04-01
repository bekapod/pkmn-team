import gql from "graphql-tag";
import { PokemonDetailsWithoutMoves } from "./pokemon";

export const getCurrentSearchPokemon = gql`
  query {
    currentSearchPokemon @client {
      ...PokemonDetailsWithoutMoves
    }
  }
  ${PokemonDetailsWithoutMoves}
`;

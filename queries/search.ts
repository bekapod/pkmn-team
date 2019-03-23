import gql from "graphql-tag";
import { PokemonDetails } from "./pokemon";

export const getCurrentSearchPokemon = gql`
  query {
    currentSearchPokemon @client {
      ...PokemonDetails
    }
  }
  ${PokemonDetails}
`;

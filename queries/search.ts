import gql from "graphql-tag";

export const getCurrentSearchPokemon = gql`
  query {
    currentSearchPokemon @client {
      id
      pokedexId
      name
      types
      sprite
    }
  }
`;

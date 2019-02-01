import gql from "graphql-tag";

export const getAllPokemon = gql`
  query {
    allPokemon {
      id
      pokedexId
      name
      types
      sprite
    }
  }
`;

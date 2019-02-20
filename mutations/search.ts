import gql from "graphql-tag";

export const setCurrentSearchPokemon = gql`
  mutation($pokemon: Pokemon!) {
    setCurrentSearchPokemon(pokemon: $pokemon) @client
  }
`;

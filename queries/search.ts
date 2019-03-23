import gql from "graphql-tag";

export const getCurrentSearchPokemon = gql`
  query {
    currentSearchPokemon @client {
      id
      pokedexId
      name
      types {
        name
      }
      sprite
      moves(version: "yellow") {
        levelLearnedAt
        learnMethod
        version
        move {
          name
          types {
            name
          }
        }
      }
    }
  }
`;

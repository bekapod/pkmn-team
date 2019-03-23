import gql from "graphql-tag";

export const getPokemon = gql`
  query {
    pokemon {
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

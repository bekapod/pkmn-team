import gql from "graphql-tag";

export const Moves = gql`
  fragment Moves on PokemonMove {
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
`;

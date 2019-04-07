import gql from "graphql-tag";

export const Moves = gql`
  fragment Moves on PokemonMove {
    levelLearnedAt
    learnMethod
    version
    __typename
    move {
      name
      power
      accuracy
      pp
      damageClass
      __typename
      type {
        name
        slug
      }
    }
  }
`;

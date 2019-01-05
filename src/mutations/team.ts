import gql from "graphql-tag";

export const createTeam = gql`
  mutation($name: String!, $pokedexIds: [Int!]!) {
    createTeam(name: $name, pokedexIds: $pokedexIds) {
      id
    }
  }
`;

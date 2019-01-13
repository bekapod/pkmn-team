import gql from "graphql-tag";

export const createTeam = gql`
  mutation($name: String!, $pokedexIds: [Int!]!) {
    createTeam(name: $name, pokedexIds: $pokedexIds) {
      id
    }
  }
`;

export const updateTeam = gql`
  mutation($id: ID!, $name: String!, $pokedexIds: [Int!]!) {
    updateTeam(id: $id, name: $name, pokedexIds: $pokedexIds) {
      id
    }
  }
`;

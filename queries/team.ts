import gql from "graphql-tag";

export const getAllTeams = gql`
  query {
    allTeams {
      id
      name
      createdAt
      members(orderBy: order_ASC) {
        id
        order
        pokemon {
          pokedexId
          name
          types
          sprite
        }
      }
    }
  }
`;

export const getTeamById = gql`
  query($id: ID!) {
    teamById(id: $id) {
      id
      name
      createdAt
      members(orderBy: order_ASC) {
        id
        order
        pokemon {
          pokedexId
          name
          types
          sprite
        }
      }
    }
  }
`;

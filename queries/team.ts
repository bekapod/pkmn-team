import gql from "graphql-tag";

export const getAllTeams = gql`
  query {
    teams {
      id
      name
      insertedAt
      members {
        id
        order
        pokemon {
          pokedexId
          name
          types {
            name
          }
          sprite
        }
      }
    }
  }
`;

export const getTeamById = gql`
  query($id: ID!) {
    teams(id: $id) {
      id
      name
      insertedAt
      members {
        id
        order
        pokemon {
          pokedexId
          name
          types {
            name
          }
          sprite
        }
      }
    }
  }
`;

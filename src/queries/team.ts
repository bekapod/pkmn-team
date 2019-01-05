import gql from "graphql-tag";

export const getAllTeams = gql`
  query {
    allTeams {
      id
      name
      createdAt
      members {
        id
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

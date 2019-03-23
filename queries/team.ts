import gql from "graphql-tag";
import { PokemonDetails, PokemonDetailsWithoutMoves } from "./pokemon";

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
          ...PokemonDetailsWithoutMoves
        }
      }
    }
  }
  ${PokemonDetailsWithoutMoves}
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
          ...PokemonDetails
        }
      }
    }
  }
  ${PokemonDetails}
`;

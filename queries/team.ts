import gql from "graphql-tag";
import { PokemonDetails, PokemonDetailsWithoutMoves } from "./pokemon";

export const TeamDetails = gql`
  fragment TeamDetails on Team {
    id
    name
    createdAt
    __typename
    members {
      id
      order
      __typename
      pokemon {
        ...PokemonDetails
      }
    }
  }
  ${PokemonDetails}
`;

export const getAllTeams = gql`
  query {
    teams {
      id
      name
      createdAt
      __typename
      members {
        id
        order
        __typename
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
    team(id: $id) {
      ...TeamDetails
    }
  }
  ${TeamDetails}
`;

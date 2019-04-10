import gql from "graphql-tag";
import { PokemonDetails } from "../queries/pokemon";
import { Error } from "../queries/error";

export const createTeam = gql`
  mutation($team: CreateTeamInput!) {
    createTeam(data: $team) {
      id
      error {
        ...Error
      }
    }
  }
  ${Error}
`;

export const updateTeam = gql`
  mutation($team: UpdateTeamInput!) {
    updateTeam(data: $team) {
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
      error {
        ...Error
      }
    }
  }
  ${PokemonDetails}
  ${Error}
`;

export const deleteTeam = gql`
  mutation($team: DeleteTeamInput!) {
    deleteTeam(data: $team) {
      id
      error {
        ...Error
      }
    }
  }
  ${Error}
`;

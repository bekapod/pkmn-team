import gql from "graphql-tag";
import { TeamDetails } from "../queries/team";
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
      ...TeamDetails
      error {
        ...Error
      }
    }
  }
  ${TeamDetails}
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

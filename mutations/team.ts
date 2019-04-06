import gql from "graphql-tag";
import { TeamDetails } from "../queries/team";

export const createTeam = gql`
  mutation($team: CreateTeamInput!) {
    createTeam(data: $team) {
      id
    }
  }
`;

export const updateTeam = gql`
  mutation($team: UpdateTeamInput!) {
    updateTeam(data: $team) {
      ...TeamDetails
    }
  }
  ${TeamDetails}
`;

export const deleteTeam = gql`
  mutation($team: DeleteTeamInput!) {
    deleteTeam(data: $team) {
      id
    }
  }
`;

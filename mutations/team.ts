import gql from "graphql-tag";

export const createTeam = gql`
  mutation($team: CreateTeamInput!) {
    createTeam(input: $team) {
      team {
        id
      }
    }
  }
`;

export const updateTeam = gql`
  mutation($team: UpdateTeamInput!) {
    updateTeam(input: $team) {
      team {
        id
      }
    }
  }
`;

export const deleteTeam = gql`
  mutation($team: DeleteTeamInput!) {
    deleteTeam(input: $team) {
      team {
        id
      }
    }
  }
`;

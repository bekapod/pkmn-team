import gql from "graphql-tag";

export const createTeam = gql`
  mutation($team: CreateTeamInput!) {
    createTeam(input: $team) {
      id
    }
  }
`;

export const updateTeam = gql`
  mutation($team: UpdateTeamInput!) {
    updateTeam(input: $team) {
      id
    }
  }
`;

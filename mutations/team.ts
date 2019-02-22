import gql from "graphql-tag";

export const createTeam = gql`
  mutation($name: String!, $members: [AddTeamMember!]!) {
    createTeam(name: $name, members: $members) {
      id
    }
  }
`;

export const updateTeam = gql`
  mutation($id: ID!, $name: String!, $members: [AddTeamMember!]!) {
    updateTeam(id: $id, name: $name, members: $members) {
      id
    }
  }
`;

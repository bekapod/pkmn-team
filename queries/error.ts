import gql from "graphql-tag";

export const Error = gql`
  fragment Error on MutationValidationError {
    message
    details {
      field
      errors
    }
  }
`;

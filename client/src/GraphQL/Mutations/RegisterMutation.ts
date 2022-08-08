import { gql } from '@apollo/client';

export const REGISTER_MUTATION = gql`
  mutation AddUser(
    $password: String!
    $username: String!
    $firstname: String!
    $lastname: String!
  ) {
    AddUser(
      password: $password
      username: $username
      firstName: $firstname
      lastName: $lastname
    ) {
      user {
        firstName
        id
        username
        lastName
      }
      errors {
        field
        message
      }
    }
  }
`;

import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation login($password: String!, $username: String!) {
    login(password: $password, username: $username) {
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

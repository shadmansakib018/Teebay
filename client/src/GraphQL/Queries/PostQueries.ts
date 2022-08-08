import { gql } from '@apollo/client';

export const POST_QUERY = gql`
  query PostOfOneUser($username: String!) {
    PostOfOneUser(username: $username) {
      postsWritten {
        title
        description
        id
        createdAt
        price 
        rentPrice
        rentType
        category
        
      }
    }
  }
`;

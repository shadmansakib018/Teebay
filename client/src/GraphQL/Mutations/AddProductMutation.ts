import { gql } from '@apollo/client';

export const ADDPRODUCT_MUTATION = gql`
  mutation addpost(
    $username: String!
    $rentType: String!
    $rentPrice: Float!
    $price: Float!
    $description: String!
    $category: String!
    $title: String!
  ) {
    AddPost(
      username: $username
      rentType: $rentType
      rentPrice: $rentPrice
      price: $price
      description: $description
      category: $category
      title: $title
    ) {
      id
      title
      description
      rentPrice
      rentType
      price
    }
  }
`;

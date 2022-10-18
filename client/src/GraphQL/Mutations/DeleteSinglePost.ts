import { gql } from '@apollo/client';

export const DELETE_SINGLE_POST = gql`
mutation deletesinglepost($deleteSinglePostId: Float!) {
    deleteSinglePost(id: $deleteSinglePostId)
  }
`
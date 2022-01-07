import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      firstname
      lastname
      username
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singlUser($userId: ID!) {
    user(userId: $userId) {
      _id
      firstname
      lastname
      username
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
    }
  }
`;

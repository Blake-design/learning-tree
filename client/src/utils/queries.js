import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      firstName
      lastName
      userName
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query user($userName: String!) {
    user(userName: $userName) {
      _id
      firstName
      lastName
      userName
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      userName
    }
  }
`;
export const QUERY_USER_SPARKS = gql`
  query userSparks($userName: String!) {
    sparks(userName: $userName) {
      _id
      title
      description
    }
  }
`;
export const QUERY_USER_FOCUS = gql`
  query userfocus($userName: String!) {
    focus(userName: $userName) {
      _id
      title
      description
    }
  }
`;

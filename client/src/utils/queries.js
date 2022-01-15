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
      focuses {
        _id
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      userName
      focuses {
        _id
      }
    }
  }
`;

export const QUERY_FOCUS = gql`
  query focus($userName: String!) {
    focus(userName: $userName) {
      _id
    }
  }
`;
export const QUERY_SPARKS = gql`
  query sparks($userName: String!) {
    sparks(userName: $userName) {
      _id
    }
  }
`;

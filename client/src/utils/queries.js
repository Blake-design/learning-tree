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
      jsonString
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      jsonString
    }
  }
`;

export const QUERY_SPARKS = gql`
  query sparks($_id: ID) {
    sparks(_id: $_id) {
      _id
      title
      description
    }
  }
`;
export const QUERY_FRIEND = gql`
  query friend($_id: ID!) {
    friend(_id: $_id) {
      userName
      firstName
      lastName
    }
  }
`;

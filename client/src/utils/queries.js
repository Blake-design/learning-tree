import { gql } from "@apollo/client";
import { SPARK_FIELDS, SPARK_RECURSIVE } from "./fragments";

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

      userName
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

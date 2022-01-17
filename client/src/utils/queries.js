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
      sparks {
        _id
        title
        description
        sparks
      }
      friends {
        _id
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      firstName
      lastName
      userName
      sparks {
        _id
        title
        description
      }

      friends {
        _id
      }
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

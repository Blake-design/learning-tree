import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $userName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      userName: $userName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        firstName
        lastName
        userName
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        userName
      }
    }
  }
`;

export const REMOVE_USER = gql`
  mutation removeUser($user: String!) {
    removeUser(user: $user) {
      _id
      userName
    }
  }
`;

export const ADD_SPARK = gql`
  mutation addSpark($title: String!, $description: String!) {
    addSpark(title: $title, description: $description) {
      sparks {
        _id
        title
      }
    }
  }
`;
export const ADD_SPARK_2_SPARK = gql`
  mutation addSpark2Spark(
    $parentTitle: String!
    $title: String!
    $description: String!
  ) {
    addSpark2Spark(
      parentTitle: $parentTitle
      title: $title
      description: $description
    ) {
      sparks {
        _id
      }
    }
  }
`;
export const REMOVE_SPARK = gql`
  mutation removeSpark($sparkId: String!) {
    removeSpark(sparkId: $sparkId) {
      sparks {
        _id
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($userName: String!) {
    addFriend(userName: $userName) {
      friends {
        _id
      }
    }
  }
`;
export const REMOVE_FRIEND = gql`
  mutation removeFriend($userName: String!) {
    removeFriend(userName: $userName) {
      friends {
        _id
      }
    }
  }
`;

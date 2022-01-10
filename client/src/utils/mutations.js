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
export const ADD_FRIEND = gql`
  mutation addFriend(
    $firstName: String!
    $lastName: String!
    $userName: String!
    $email: String!
  ) {
    addFriend(
      firstName: $firstName
      lastName: $lastName
      userName: $userName
      email: $email
    ) {
      token
      friend {
        _id
        firstName
        lastName
        userName
      }
    }
  }
`;
export const ADD_SPARK = gql`
  mutation addSpark($title: String!, $description: String!) {
    addSpark(title: $title, description: $description) {
      token
      spark {
        _id
        title
        description
      }
    }
  }
`;
export const REMOVE_SPARK = gql`
  mutation removeSpark($sparkId: String!) {
    removeSpark(title: $title, description: $description) {
      token
      spark {
        _id
        title
        description
      }
    }
  }
`;
export const ADD_FOCUS = gql`
  mutation addFocus($title: String!, $description: String!) {
    addFocus(title: $title, description: $description) {
      token
      focus {
        _id
        title
        description
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
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

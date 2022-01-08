import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser(
    $firstname: String!
    $lastname: String!
    $Username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstname: $firstname
      lastname: $lastname
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        firstname
        lastname
        username
      }
    }
  }
`;
export const ADD_FRIEND = gql`
  mutation addFriend(
    $firstname: String!
    $lastname: String!
    $Username: String!
    $email: String!
  ) {
    addFriend(
      firstname: $firstname
      lastname: $lastname
      username: $username
      email: $email
    ) {
      token
      friend {
        _id
        firstname
        lastname
        username
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
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const REMOVE_USER = gql`
  mutation removeUser($user: String!) {
    removeUser(user: $user) {
      _id
      username
    }
  }
`;

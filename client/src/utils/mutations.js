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

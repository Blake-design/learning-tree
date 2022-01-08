const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstname: String!
    lastname: String!
    username: String!
    email: String!
    focuses: [Focus]
    sparks: [Spark]
    friends: [User]
  }
  type Auth {
    token: ID!
    user: User!
  }
  type Focus {
    _id: ID
    title: String!
    description: String
    sparks: [Spark]
  }
  type Spark {
    _id: ID
    title: String!
    description: String!
    sparks: [Spark]
  }
  type Query {
    users: [User]!
    user(userID: ID!): User
    me: User
  }
  type Mutation {
    addUser(
      firstname: String!
      lastname: String!
      email: String!
      password: String!
    ): Auth

    addFocus(_id: ID, title: String!, description: String!): Auth

    addSpark(_id: ID, title: String!, description: String!): Auth

    addFriend(
      _id: ID
      firstname: String!
      lastname: String!
      username: String!
      email: String!
    ): Auth
    login(email: String!, password: String!): Auth
    removeUser: User
  }
`;
module.exports = typeDefs;

const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String!
    lastName: String!
    userName: String!
    email: String!
    sparks: [Spark]
    friends: [User]
  }

  type Spark {
    _id: ID
    title: String!
    description: String!
    sparks: [Spark]
  }

  type Auth {
    token: ID!
    user: User!
  }

  type Query {
    users: [User]!
    user(userName: String!): User
    me: User
    sparks: [Spark]
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      userName: String!
      email: String!
      password: String!
    ): Auth

    addSpark(title: String!, description: String!): User

    addSpark2Spark(
      parentTitle: String!
      title: String!
      description: String!
    ): User
    addFriend(userName: String!): User

    login(email: String!, password: String!): Auth

    removeUser: User

    removeSpark(title: String!): User

    removeFriend(userName: String!): User
  }
`;
module.exports = typeDefs;

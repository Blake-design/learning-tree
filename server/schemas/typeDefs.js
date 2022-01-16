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
    spark: Spark!
  }

  type Query {
    users: [User]!
    user(userName: String!): User
    me: User
    sparks(userName: String!): [Spark]
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      userName: String!
      email: String!
      password: String!
    ): Auth

    addSpark(_id: ID, title: String!, description: String!): Auth

    addSpark2Spark(
      _id: ID
      parentTitle: String!
      title: String!
      description: String!
    ): Auth

    addFriend(
      _id: ID
      firstName: String!
      lastName: String!
      userName: String!
      email: String!
    ): Auth
    login(email: String!, password: String!): Auth

    removeUser: User

    removeSpark(title: String!): Spark

    removeFriend(userName: String!): User
  }
`;
module.exports = typeDefs;

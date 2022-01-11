const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String!
    lastName: String!
    userName: String!
    email: String!
    focuses: [Focus]
    sparks: [Spark]
    friends: [User]
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
    # sparks: [Spark]
  }

  type Auth {
    token: ID!
    user: User!
  }

  type Query {
    users: [User]!
    user(userID: ID!): User
    me: User
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      userName: String!
      email: String!
      password: String!
    ): Auth

    addFocus(_id: ID, title: String!, description: String!): Auth

    addSpark(_id: ID, title: String!, description: String!): Auth

    addFriend(
      _id: ID
      firstName: String!
      lastName: String!
      userName: String!
      email: String!
    ): Auth
    login(email: String!, password: String!): Auth

    removeUser: User

    removeSpark(spark: String!): User

    removeFocus(focus: String!): User
  }
`;
module.exports = typeDefs;

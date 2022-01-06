const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstname: String!
    lastname: String!
    username: String!
    email: String!
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
      firstname: String!
      lastname: String!
      email: String!
      password: String!
    ): Auth
    login(email: String!, password: String!): Auth
    removeUser: User
  }
`;
module.exports = typeDefs;

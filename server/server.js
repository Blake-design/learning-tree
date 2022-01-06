//// first we import express.js this app is a framework for Node.js
const express = require("express");

/// next we import Apollo Server this allows us to serve up information to Grapph QL
const { ApolloServer } = require("apollo-server-express");

//// path is a module of node for working with file and directory paths
const path = require("path");

/// TypeDefs and Resolvers are schemas for how db requests are handled by GraphQL
const { typeDefs, resolvers } = require("./schemas");

//// authMiddleware  attaches to the ApolloServer allowing us to use authentication
const { authMiddleware } = require("./utils/auth");

/// db constant holds the database configuration
const db = require("./config/connection");

/// http is part of new update to Apollo server and recommended for use with express
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const http = require("http");

/// PORT constant holds the "location of the server"
const PORT = process.env.PORT || 3001;

/// this will start creating the server
async function startApolloServer() {
  /// APP constant will call express function
  const app = express();

  /// this is a new function to montor server shutdowns
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs, //// typeDefs define the graphQl queries
    resolvers, //// resolvers define the methods called upon the server
    context: authMiddleware, ////// add context to the server so authMiddleware can pass data to resolvers
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })], /// makes sure server shuts down when not active
  });

  /// once built then start the server
  await server.start();

  //// now apply middleware to express app
  server.applyMiddleware({ app });

  ///
  app.use(express.urlencoded({ extened: true }));
  app.use(express.json());

  ///// if in production send files to client build
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
  }

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });

  ///
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port :${PORT}!`);
      console.log(
        `Use GraphQl at https://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
}
startApolloServer();

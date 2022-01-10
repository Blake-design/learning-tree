/// import in add-ons

import Tree from "react-d3-tree";
import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

///Import components
import Header from "./components/Header";
import Footer from "./components/Footer";

///Import pages
import Home from "./pages/Home";
import User from "./pages/User";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

//// set graphlQl link
const httpLink = createHttpLink({
  uri: "/graphql",
});

/// set up context authentication
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const orgChart = {
  name: "CEO",
  children: [
    {
      name: "Manager",
      attributes: {
        department: "Production",
      },
      children: [
        {
          name: "Foreman",
          attributes: {
            department: "Fabrication",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
        {
          name: "Foreman",
          attributes: {
            department: "Assembly",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
      ],
    },
  ],
};
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <div
              id="treeWrapper"
              style={{ width: "50em", height: "20em" }}
            ></div>
            <Tree data={orgChart} />
            <div
              id="treeWrapper"
              style={{ width: "50em", height: "20em" }}
            ></div>
            <Routes>
              <Route exact path="/" element={<Home />} />

              <Route exact path="/login" element={<Login />} />

              <Route exact path="/signup" element={<Signup />} />

              <Route exact path="/me" element={<User />} />

              <Route exact path=":userId" element={<User />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

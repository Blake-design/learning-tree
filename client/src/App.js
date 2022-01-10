/// import in add-ons
import BarChart from "./components/Diagram";
import Tree from "./components/Tree";
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

const data = [
  { year: 1980, efficiency: 24.3, sales: 8949000 },
  { year: 1985, efficiency: 27.6, sales: 10979000 },
  { year: 1990, efficiency: 28, sales: 9303000 },
  { year: 1991, efficiency: 28.4, sales: 8185000 },
  { year: 1992, efficiency: 27.9, sales: 8213000 },
  { year: 1993, efficiency: 28.4, sales: 8518000 },
  { year: 1994, efficiency: 28.3, sales: 8991000 },
  { year: 1995, efficiency: 28.6, sales: 8620000 },
  { year: 1996, efficiency: 28.5, sales: 8479000 },
  { year: 1997, efficiency: 28.7, sales: 8217000 },
  { year: 1998, efficiency: 28.8, sales: 8085000 },
  { year: 1999, efficiency: 28.3, sales: 8638000 },
  { year: 2000, efficiency: 28.5, sales: 8778000 },
  { year: 2001, efficiency: 28.8, sales: 8352000 },
  { year: 2002, efficiency: 29, sales: 8042000 },
  { year: 2003, efficiency: 29.5, sales: 7556000 },
  { year: 2004, efficiency: 29.5, sales: 7483000 },
  { year: 2005, efficiency: 30.3, sales: 7660000 },
  { year: 2006, efficiency: 30.1, sales: 7762000 },
  { year: 2007, efficiency: 31.2, sales: 7562000 },
  { year: 2008, efficiency: 31.5, sales: 6769000 },
  { year: 2009, efficiency: 32.9, sales: 5402000 },
  { year: 2010, efficiency: 33.9, sales: 5636000 },
  { year: 2011, efficiency: 33.1, sales: 6093000 },
  { year: 2012, efficiency: 35.3, sales: 7245000 },
  { year: 2013, efficiency: 36.4, sales: 7586000 },
  { year: 2014, efficiency: 36.5, sales: 7708000 },
  { year: 2015, efficiency: 37.2, sales: 7517000 },
  { year: 2016, efficiency: 37.7, sales: 6873000 },
  { year: 2017, efficiency: 39.4, sales: 6081000 },
];
const data2 = [
  {
    name: "CEO",
    children: [
      {
        name: "boss1",
        children: [
          {
            name: "mister_a",
            colname: "level3",
          },
          {
            name: "mister_b",
            colname: "level3",
          },
          {
            name: "mister_c",
            colname: "level3",
          },
          {
            name: "mister_d",
            colname: "level3",
          },
        ],
        colname: "level2",
      },
      {
        name: "boss2",
        children: [
          {
            name: "mister_e",
            colname: "level3",
          },
          {
            name: "mister_f",
            colname: "level3",
          },
          {
            name: "mister_g",
            colname: "level3",
          },
          {
            name: "mister_h",
            colname: "level3",
          },
        ],
        colname: "level2",
      },
    ],
  },
];

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <BarChart data={data} />
            <Tree data={data2} />
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

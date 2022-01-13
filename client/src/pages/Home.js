import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import "../App.css";

import FriendsList from "../components/FriendsList";
import Header from "../components/Header";

import { QUERY_USERS } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_USERS);
  const users = data?.users || [];
  
  const navigate = useNavigate();

  return (
    <div id="splash">
      <h1>Synapse</h1>
      {/* <h3>Pathways to Learning</h3> */}
      <p>Every step begins with a spark.</p>
          <button onClick={() => navigate("/login")}>LOG IN</button>
          <button onClick={() => navigate("/signup")}>SIGN UP</button>
    </div>
  );
};

export default Home;

import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";

import "../App.css";
import Particles from "react-tsparticles";
import particlesConfig from "../config/configParticles.js";
import synapseLogo from "../assets/synapselogo-01.png";

import FriendsList from "../components/FriendsList";
import Header from "../components/Header";

import { QUERY_USERS } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_USERS);
  const users = data?.users || [];

  const navigate = useNavigate();

  const particlesInit = (main) => {
    console.log(main);
  };
  const particlesLoaded = (container) => {
    console.log(container);
  };

  return (
    // <div className="particles-container vert-center" style={{ position: 'relative', overflow: "hidden" }}>
    <div className="particles-container vert-center">
      <div className="tsparticles" style={{ position: "absolute" }}>
        <Particles
          height="100vh"
          width="100vw"
          init={particlesInit}
          loaded={particlesLoaded}
          options={particlesConfig}
        />
      </div>
      <div id="splash">
        <div id="splashlogo">
          <img src={synapseLogo} alt="Synapse logo" />
          <h1>Synapse</h1>
        </div>
        <hr />
        {/* <h3>Pathways to Learning</h3> */}
        <p>Every step begins with a spark.</p>
        <div>
          <button onClick={() => navigate("/login")}>LOG IN</button>
          <button onClick={() => navigate("/signup")}>SIGN UP</button>
        </div>
      </div>
    </div>
  );
};

export default Home;

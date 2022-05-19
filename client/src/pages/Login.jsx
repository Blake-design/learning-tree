import React, { useState } from "react";

// Import our action

import { useUser } from "../utils/UserContext";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import "../App.css";
import Particles from "react-tsparticles";
import particlesConfig from "../config/configParticles.js";

const Login = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const particlesInit = (main) => {};
  const particlesLoaded = (container) => {};

  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const userManager = useUser();

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await userManager.handleSignIn(formState);

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <div className="form-container">
      <div className="tsparticles" style={{ position: "absolute" }}>
        <Particles
          height="100vh"
          width="100vw"
          init={particlesInit}
          loaded={particlesLoaded}
          options={particlesConfig}
        />
      </div>
      <div className="form-card">
        <h4>Log In</h4>
        {Object.keys(userManager.user).length ? (
          <p>
            Welcome {userManager.user.user.userName}! You may now head{" "}
            <Navigate to="/me">to your dashboard.</Navigate>
          </p>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <input
              className="form-input"
              placeholder="EMAIL"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
            />
            <input
              className="form-input"
              placeholder="PASSWORD"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
            />
            <button style={{ cursor: "pointer" }} type="submit">
              SUBMIT
            </button>
            {location.pathname !== "/" && (
              <button className="form-back-btn" onClick={() => navigate(-1)}>
                &larr; BACK
              </button>
            )}
          </form>
        )}

        {error && (
          <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
        )}
      </div>
    </div>
  );
};

export default Login;

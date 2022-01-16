import React, { useState } from "react";

// Import our action

import { useUser } from "../utils/UserContext";
import { Navigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import "../App.css"

import Auth from "../utils/auth";

const Login = (props) => {
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
    await userManager.handleSigin(formState);

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };
  console.log("this is the user state ", userManager.user.user);
  return (
    <main>
      <div className="form-container">
        <div className="form-card">
          <h4>Login</h4>
          <div>
            {Object.keys(userManager.user).length ? (
              <p>
                Welcome {userManager.user.user.userName}! You may now head{" "}
                <Navigate to="/me">to your dashboard.</Navigate>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  // className="btn btn-block btn-info"
                  style={{ cursor: "pointer" }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;

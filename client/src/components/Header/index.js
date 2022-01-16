import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";
import Auth from "../../utils/auth";
// import "./header.css";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const navigate = useNavigate();

  return (
    <header>
      <div className="container flex-column justify-space-between-lg justify-center align-center text-center">
        <Link className="text-dark" to="/">
          <h3 className="m-0">Synapse</h3>
        </Link>
        {/* <p>
          Pathways to learning
        </p> */}
      </div>
      <div>
        {Auth.loggedIn() ? (
          <>
            {/* <Link className="header-btn" to="/create">Create</Link> */}
            <button className="header-btn" onClick={() => navigate("/create")}>
              Create
            </button>
            <button className="header-btn" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="header-btn" onClick={() => navigate("/login")}>
              Log In
            </button>
            <button className="header-btn" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

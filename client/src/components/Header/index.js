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
    // <header>
    //   <div className="container flex-column justify-space-between-lg justify-center align-center text-center">
    //     <Link className="text-dark" to="/">
    //       <h3 className="m-0">Synapse</h3>
    //     </Link>
    //     {/* <p>
    //       Pathways to learning
    //     </p> */}
    //   </div>
    //   <div>
    //     {Auth.loggedIn() ? (
    //       <>
    //         {/* <Link className="header-btn" to="/create">Create</Link> */}
    //         <button className="header-btn" onClick={() => navigate("/create")}>
    //           Create
    //         </button>
    //         <button className="header-btn" onClick={logout}>
    //           Logout
    //         </button>
    //       </>
    //     ) : (
    //       <>
    //         <button className="header-btn" onClick={() => navigate("/login")}>
    //           Log In
    //         </button>
    //         <button className="header-btn" onClick={() => navigate("/signup")}>
    //           Sign Up
    //         </button>
    //       </>
    //     )}
    //   </div>
    // </header>

    <nav className="navbar" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <a className="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
    </a>

    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" className="navbar-menu">
    <div className="navbar-start">
      <a className="navbar-item">
        Home
      </a>

      <a className="navbar-item">
        Documentation
      </a>

      <div className="navbar-item has-dropdown is-hoverable">
        <a className="navbar-link">
          More
        </a>

        <div className="navbar-dropdown">
          <a className="navbar-item">
            About
          </a>
          <a className="navbar-item">
            Jobs
          </a>
          <a className="navbar-item">
            Contact
          </a>
          <hr className="navbar-divider"/>
          <a className="navbar-item">
            Report an issue
          </a>
        </div>
      </div>
    </div>

    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          <a className="button is-primary">
            Create
          </a>
          <a className="button is-light" onClick={logout}>
            Log Out
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>
  );
};

export default Header;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Auth from "../../utils/auth";

import synapseLogo from "../../assets/synapselogo-01.png";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const navigate = useNavigate();

  const [isActive, setisActive] = useState(false);

  document.addEventListener("DOMContentLoaded", () => {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll(".navbar-burger"),
      0
    );

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
      // Add a click event on each of them
      $navbarBurgers.forEach((el) => {
        el.addEventListener("click", () => {
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);

          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle("is-active");
          $target.classList.toggle("is-active");
        });
      });
    }
  });

  return (
    <header>
      <nav
        className="navbar is-expanded"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <button className="header-btn" onClick={() => navigate("/me")}>
            <img src={synapseLogo} width="20" height="20" />
            <h1>Synapse</h1>
          </button>
          <button
            onClick={() => {
              setisActive(!isActive);
            }}
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>

        <div
          className={`navbar-menu ${isActive ? "is-active" : ""}`}
          id="navbarBasicExample"
        >
          <div className="navbar-end">
            <div className="navbar-item">
              <button
                className="header-btn"
                onClick={() => navigate("/profile")}
              >
                Profile
              </button>

              <button
                className="header-btn"
                onClick={() => navigate("/create")}
              >
                Create
              </button>
              <button className="header-btn" onClick={logout}>
                Log Out
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../App.css";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer>
      {/* <div className="container text-center mb-5"> */}
        {location.pathname !== "/" && (
          <button
            className="btn btn-dark mb-3"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        <p>&copy; {new Date().getFullYear()} SYNAPSE</p>
        <p>BROUGHT TO YOU FROM SAN ANTONIO, TX</p>
    </footer>
  );
};

export default Footer;

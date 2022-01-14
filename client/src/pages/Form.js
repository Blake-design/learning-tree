import React from "react";

import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import FocusForm from "../components/FocusForm";
import SparkForm from "../components/SparkForm";

import { QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const Form = () => {
  // const { userId } = useParams();
  const { userId } = useParams();
  // If there is no `userId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(QUERY_ME);

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_USER` query
  const user = data?.me || data?.user || {};

  // Use React Router's `<Navigate />` component to Navigate to personal user page if username is yours
  //   if (Auth.loggedIn() && Auth.getUser().data._id === userId) {
  //     return <Navigate to="/sparks" />;
  //   }

  if (loading) {
    return <div>Loading...</div>;
  }

  //   if (!user?.name) {
  //     return <h4>You need to be logged in to add sparks!</h4>;
  //   }

  //  ******  this code below will be used to pick which form renders   **********

  //   { user.focus === []?(    <h2 className="card-header">
  //         Welcome {user.userName} to begin you your map you need to pick a Focus
  //         of study.
  //       </h2>

  //       <div className="my-4 p-4" style={{ border: "1px dotted #1a1a1a" }}>
  //         <FocusForm userId={user._id} />
  //       </div>  ):
  //    (<h2 className="card-header">
  //         It's time to start adding sparks!
  //       </h2>

  //       <div className="my-4 p-4" style={{ border: "1px dotted #1a1a1a" }}>
  //         <SparkForm userId={user._id} />
  //       </div> )}

  return (
    <div>
      <h2 className="card-header">
        Welcome {user.userName} to begin you your map you need to pick a Focus
        of study.
      </h2>

      <div className="my-4 p-4" style={{ border: "1px dotted #1a1a1a" }}>
        <SparkForm userId={user._id} />
      </div>
    </div>
  );
};

export default Form;

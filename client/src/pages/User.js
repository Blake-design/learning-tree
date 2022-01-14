import React from "react";

import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// import SparkList from "../components/SparkList";
// import FocusForm from "../components/FocusForm";
import OrgChartTree from "../components/Tree";
import Header from "../components/Header";

import { QUERY_SINGLE_USER, QUERY_ME } from "../utils/queries";
import { useUser } from "../utils/UserContext";
import Auth from "../utils/auth";

const User = () => {
  // const { userId } = useParams();
  const { userId } = useParams();
  // If there is no `userId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(QUERY_ME);
  const userManager = useUser();
  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_USER` query
  const user = data?.me || data?.user || {};

  console.log(data);

  // Use React Router's `<Navigate />` component to Navigate to personal user page if username is yours
  // if (Auth.loggedIn() && Auth.getUser().data._id === userId) {
  //   return <Navigate to="/me" />;
  // }

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (!user?.name) {
  //   return (
  //     <h4>
  //       You need to be logged in to see your profile page. Use the navigation
  //       links above to sign up or log in!
  //     </h4>
  //   );
  // }

  return (
    <div>
      <Header />
      <OrgChartTree />

      <h1>{userManager.user.username}</h1>
      {/* <h2 className="card-header">
        {userId ? `${user.name}'s` : "Your"} friends have endorsed these
        sparks...
      </h2>

      {user.sparks?.length > 0 && (
        <SparkList sparks={user.sparks} isLoggedInUser={!userId && true} />
      )}

      <div className="my-4 p-4" style={{ border: "1px dotted #1a1a1a" }}>
        <FocusForm userId={user._id} />
      </div> */}
    </div>
  );
};

export default User;

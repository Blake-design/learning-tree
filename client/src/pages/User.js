import React from "react";

import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

// import SparkList from "../components/SparkList";
// import FocusForm from "../components/FocusForm";
import OrgChartTree from "../components/Tree";
import Header from "../components/Header";
import InfoModel from "../components/InfoModel";

import { QUERY_SINGLE_USER, QUERY_ME } from "../utils/queries";
import { useUser } from "../utils/UserContext";
import Auth from "../utils/auth";

const User = () => {
  const { userName: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_SINGLE_USER : QUERY_ME, {
    variables: { userName: userParam },
  });
  const userManager = useUser();
  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_USER` query
  const user = data?.me || data?.user || {};

  // Use React Router's `<Navigate />` component to Navigate to personal user page if username is yours
  if (Auth.loggedIn() && Auth.getUser().data.userName === userParam) {
    return <Navigate to="/me" />;
  }

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
      <h1>{data.me.userName}'s Tree</h1>
      <OrgChartTree />
      {/* <h2 className="card-header">
        {userId ? `${user.name}'s` : "Your"} friends have endorsed these
        sparks...
      </h2>

      {user.sparks?.length > 0 && (
        <SparkList sparks={user.sparks} isLoggedInUser={!userId && true} />
      )}

      <h1>welcome to page of {user.userName}</h1>
      <InfoModel user={user} />
    </div>
  );
};

export default User;

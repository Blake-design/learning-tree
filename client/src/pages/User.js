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
  console.log(data);
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
      <div id="user-tree">
        <h1>{user.userName}'s Tree</h1>
        {/* <OrgChartTree /> */}
        <InfoModel user={user} />
      </div>
    </div>
  );
};

export default User;

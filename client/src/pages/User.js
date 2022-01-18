import Reac, { useState, useEffect } from "react";

import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import FriendsList from "../components/FriendsList";
import OrgChartTree from "../components/Tree";
import Header from "../components/Header";

import { QUERY_SINGLE_USER, QUERY_ME } from "../utils/queries";
import { useUser } from "../utils/UserContext";
import Auth from "../utils/auth";

const User = () => {
  const { userName: userParam } = useParams();

  const { loading, error, data } = useQuery(
    userParam ? QUERY_SINGLE_USER : QUERY_ME,
    {
      variables: { userName: userParam },
    }
  );
  const userManager = useUser();

  let user;

  console.log(userManager.user);
  // console.log(user);
  if (data) {
    user = JSON.parse(data.me.jsonString);
  }
  // Use React Router's `<Navigate />` component to Navigate to personal user page if username is yours
  if (Auth.loggedIn() && Auth.getUser().data.userName === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div> AHHHHHHHHHHHHHH.......</div>;
  }

  return (
    <div>
      <Header />
      {userParam ? <h1>{user.userName}'s Tree</h1> : <h1>My Tree</h1>}
      {user != undefined ? (
        <div id="user-tree">
          <OrgChartTree user={user} />

          <FriendsList user={user} />
        </div>
      ) : (
        <div>building graph...</div>
      )}
    </div>
  );
};

export default User;

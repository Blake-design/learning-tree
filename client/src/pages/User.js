import React from "react";

import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import FriendsList from "../components/FriendsList";
import OrgChartTree from "../components/Tree";
import Header from "../components/Header";

import { QUERY_SINGLE_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const User = () => {
  const { userName: userParam } = useParams();

  const { loading, error, data } = useQuery(
    userParam ? QUERY_SINGLE_USER : QUERY_ME,
    {
      variables: { userName: userParam },
    }
  );

  let user;
  console.log("this is the data returned by query " + data);

  // console.log(user);
  if (data) {
    if (data.me) {
      user = JSON.parse(data.me.jsonString);
    } else user = JSON.parse(data.user.jsonString);
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
      {userParam ? <h1 id="tree-header">{user.userName}'s Tree</h1> : <h1 id="tree-header">My Tree</h1>}
      {user !== undefined ? (
        <div id="user-tree">
          <OrgChartTree user={user} />

          {/* <FriendsList user={user} /> */}
        </div>
      ) : (
        <div>Building your tree...</div>
      )}
    </div>
  );
};

export default User;

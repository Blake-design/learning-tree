import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import FriendsList from "../components/FriendsList";
import Header from "../components/Header";

import { QUERY_USERS } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_USERS);
  const users = data?.users || [];

  return (
    <main>
      <h1>Synapse</h1>
      <p>Pathways to Learning</p>
      <div className="flex-row justify-center">
        {/* <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <FriendsList
              users={users}
              title="Here's the current roster of friends..."
            />
          )}
        </div> */}
        <Link className="btn btn-lg btn-primary m-2" to="/login">
          Login
        </Link>
        <Link className="btn btn-lg btn-light m-2" to="/signup">
          Signup
        </Link>
      </div>
    </main>
  );
};

export default Home;

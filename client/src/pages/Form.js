import React from "react";

import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import FocusForm from "../components/FocusForm";
import SparkForm from "../components/SparkForm";
import Spark2Spark from "../components/Spark2Spark";

import InfoModel from "../components/InfoModel";
import { QUERY_ME } from "../utils/queries";
import { useUser } from "../utils/UserContext";
import Auth from "../utils/auth";

const Form = () => {
  // If there is no `userId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(QUERY_ME);
  const userManager = useUser();
  console.log(data);
  const user = data?.me || {};
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="my-4 p-4" style={{ border: "1px dotted #1a1a1a" }}>
        <FocusForm />
      </div>

      <div className="my-4 p-4" style={{ border: "1px dotted #1a1a1a" }}>
        <SparkForm />
      </div>
      <div className="my-4 p-4" style={{ border: "1px dotted #1a1a1a" }}>
        <Spark2Spark />
      </div>
      <InfoModel user={user} />
    </div>
  );
};

export default Form;

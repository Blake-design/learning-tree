import React from "react";

import { useQuery } from "@apollo/client";

import Header from "../components/Header";
import SparkForm from "../components/SparkForm";
import Spark2Spark from "../components/Spark2Spark";

import InfoModel from "../components/InfoModel";
import { QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const Form = () => {
  const { loading, data } = useQuery(QUERY_ME);

  let user;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (data) {
    user = JSON.parse(data.me.jsonString);
  }

  return (
    <div>
      <Header />
      <div className="form-container">
        <div>
          <SparkForm user={user} />
        </div>
        <div>
          <Spark2Spark user={user} />
        </div>
      </div>
    </div>
  );
};

export default Form;

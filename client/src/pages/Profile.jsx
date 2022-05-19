import React from "react";
import Header from "../components/Header/Header";
import { useQuery } from "@apollo/client";
import { QUERY_FRIEND, QUERY_ME } from "../utils/queries";

const Profile = () => {
  const { loading, error, data } = useQuery(QUERY_ME);
  const { loading1, error1, data1 } = useQuery(QUERY_FRIEND, {
    variables: { _id: "6262883ce2ab46d6c3f681bb" },
  });

  let user;

  if (data?.me) {
    user = JSON.parse(data.me.jsonString);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div> {error.message} </div>;
  }

  let count = 0;
  function findSparks(spark) {
    count++;
    if (spark.sparks) {
      spark.sparks.forEach((s) => findSparks(s));
    } else {
      return;
    }
    return count;
  }
  console.log(user);
  console.log(data1);
  return (
    <div>
      <Header />
      <h1> {user.userName} Profile</h1>
      <hr />
      <div className="avatar">
        {/* <img src="" alt="placeholder">
          placeholder
        </img> */}
      </div>
      <section>
        <h2>{`Name: ${user.firstName} ${user.lastName}`}</h2>
        <p>
          {`Interests: ${user.sparks.map((spark) => {
            return spark.title;
          })}`}
        </p>
        <p>{`Sparks: ${findSparks(user)} `}</p>
        <p>Friends:{user.friends.length}</p>
      </section>
    </div>
  );
};

export default Profile;

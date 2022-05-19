import react from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_USER, QUERY_ME, QUERY_SPARKS } from "../../utils/queries";
import Auth from "../../utils/auth";
import { Navigate, useParams } from "react-router-dom";

const InfoModel = ({ user }) => {
  const { loading, data } = useQuery(QUERY_SPARKS, {
    variables: { userName: user.userName },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user?.sparks.map((s) => {
        return (
          <li key={s._id}>
            {s.title}
            <ol>
              {user.sparks.map((spark) => {
                return <li key={spark._id}>{spark.title}</li>;
              })}
            </ol>
          </li>
        );
      })}
    </div>
  );
};
export default InfoModel;

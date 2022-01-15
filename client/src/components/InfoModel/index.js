import react from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  QUERY_SINGLE_USER,
  QUERY_ME,
  QUERY_FOCUS,
  QUERY_SPARKS,
} from "../../utils/queries";
import Auth from "../../utils/auth";
import { Navigate, useParams } from "react-router-dom";

const InfoModel = ({ user }) => {
  const Query = () => {
    const res1 = useQuery(QUERY_FOCUS, {
      variables: { userName: user.userName },
    });
    const res2 = useQuery(QUERY_SPARKS, {
      variables: { userName: user.userName },
    });

    return [res1, res2];
  };

  const [
    { loading: loading1, data: data },
    { loading: loading2, data: data2 },
  ] = Query();

  if (loading1) {
    return <div>Loading...</div>;
  }
  if (loading2) {
    return <div>Loading...</div>;
  }

  console.log(data);
  console.log(data2);
  if (!data.focus) {
    return <h3>this user currently has no focus</h3>;
  }
  console.log();
  return (
    <div>
      {data?.focus.map((focal) => {
        return (
          <li key={focal._id}>
            {focal.title}
            <ol>
              {data2?.sparks.map((spark) => {
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

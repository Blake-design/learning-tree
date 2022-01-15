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
    { loading: loading2, data: sparks },
  ] = Query();

  if (loading1) {
    return <div>Loading...</div>;
  }

  console.log(user.userName);
  console.log(sparks);
  if (!data.focus) {
    return <h3>this user currently has no focus</h3>;
  }
  console.log();
  return (
    <div>
      <p>This is {user.userName}'s tree data</p>
      <p>this user has {data.focus.length} Focus</p>
      {data.focus.map((focal) => {
        return <p key="title">The titles are {focal.title}</p>;
      })}
    </div>
  );
};
export default InfoModel;

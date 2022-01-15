import react from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_USER, QUERY_ME, QUERY_FOCUS } from "../../utils/queries";
import Auth from "../../utils/auth";
import { Navigate, useParams } from "react-router-dom";

const InfoModel = ({ user }) => {
  const { data, focus } = useQuery(QUERY_FOCUS, {
    variables: { userName: user.userName },
  });

  console.log(user);
  console.log(data);
  if (!data.focus) {
    return <h3>this user currently has no focus</h3>;
  }
  console.log(
    data.focus.map((focal) => {
      return "this is the title " + focal.title;
    })
  );
  return (
    <div>
      <h1>This is {user.userName}'s tree structure</h1>
      <h2>this user has {data.focus.length} Focus</h2>
      {data.focus.map((focal) => {
        return <h3 key="title">The titles are {focal.title}</h3>;
      })}
    </div>
  );
};
export default InfoModel;

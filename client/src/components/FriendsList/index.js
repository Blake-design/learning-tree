import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_FRIEND } from "../../utils/mutations";

const FriendsList = ({ user }) => {
  const [formState, setFormState] = useState({
    userName: "",
  });

  const [addFriend, { error, data }] = useMutation(ADD_FRIEND);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };
  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log({ ...formState });
    try {
      const { data } = await addFriend({
        variables: { ...formState },
      });

      // Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
    setFormState({
      userName: "",
    });
  };

  // if (!user.friends.length) {
  //   return <h3>No Friends Yet</h3>;
  // }
  return (
    <div>
      <h3>Friends List</h3>
      <form onSubmit={handleFormSubmit}>
        <input
          className="form-input"
          placeholder="Please enter a username"
          name="userName"
          type="text"
          value={formState.userName}
          onChange={handleChange}
        />
        <button
          className="btn btn-block btn-info"
          style={{ cursor: "pointer" }}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FriendsList;

import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_FOCUS } from "../../utils/mutations";
import { useUser } from "../../utils/UserContext";
const FocusForm = () => {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
  });
  const userManager = useUser();
  const [addFocus, { error, data }] = useMutation(ADD_FOCUS);

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

    try {
      const { data } = await addFocus({
        variables: { ...formState },
      });

      // Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h2 className="card-header">
        Welcome {userManager.user.userName} to begin you your map you need to
        pick a Focus of study.
      </h2>
      <form onSubmit={handleFormSubmit}>
        <input
          className="form-input"
          placeholder="Please enter a title"
          name="title"
          type="text"
          value={formState.title}
          onChange={handleChange}
        />

        <input
          className="form-input"
          placeholder="Please enter a brief description"
          name="description"
          type="text"
          value={formState.description}
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

export default FocusForm;

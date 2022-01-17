import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_SPARK } from "../../utils/mutations";
import { useUser } from "../../utils/UserContext";
import "../../App.css"

const SparkForm = ({ userId }) => {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
  });
  const userManager = useUser();
  const [addSpark, { error1, data1 }] = useMutation(ADD_SPARK);

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
      const { data1 } = await addSpark({
        variables: { ...formState },
      });

      // Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
    setFormState({
      title: "",
      description: "",
    });
  };

  return (
    <div className="form-card">
      <h2 className="card-header">
        Great job {userManager.user.userName}! please enter sparks here.
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
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default SparkForm;

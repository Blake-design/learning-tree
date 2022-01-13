import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_SPARK } from "../../utils/mutations";

const SparkForm = ({ userId }) => {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
  });

  const [addSpark, { error, data }] = useMutation(ADD_SPARK);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };
  console.log(data);
  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await addSpark({
        variables: { ...formState },
      });
      console.log(data);
      // Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
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

export default SparkForm;
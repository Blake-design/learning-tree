import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_SPARK_2_SPARK } from "../../utils/mutations";
import { useUser } from "../../utils/UserContext";

const Spark2Spark = ({ userId }) => {
  const [formState, setFormState] = useState({
    parentTitle: "",
    title: "",
    description: "",
  });
  const userManager = useUser();

  const [addSpark2Spark, { error, data }] = useMutation(ADD_SPARK_2_SPARK);

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

    // const spark = { ...formState };
    // user.sparks.push(spark);
    // console.log("Check to see if data changed " + user);

    // JSON.stringify(user);

    try {
      const { data } = await addSpark2Spark({
        variables: { ...formState },
      });

      // Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
      console.log({ ...formState });
    }
    setFormState({
      parentTitle: "",
      title: "",
      description: "",
    });
  };

  return (
    <div className="form-card">
      <h4 className="create-header">
        {/* Great job {userManager.user.userName}! please enter sparks here. */}
        Add on to your sparks.
      </h4>
      <form onSubmit={handleFormSubmit}>
        <input
          className="form-input"
          placeholder="Please enter parent"
          name="parentTitle"
          type="text"
          value={formState.parentTitle}
          onChange={handleChange}
        />
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

export default Spark2Spark;

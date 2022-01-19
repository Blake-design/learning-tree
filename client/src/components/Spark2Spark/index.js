import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_SPARK_2_SPARK } from "../../utils/mutations";
import { useUser } from "../../utils/UserContext";

const Spark2Spark = ({ user }) => {
  const [formState, setFormState] = useState({
    parentTitle: "",
    title: "",
    description: "",
  });
  const userManager = useUser();

  const [addSpark2Spark, { error, res }] = useMutation(ADD_SPARK_2_SPARK);

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

    const parentTitle = formState.parentTitle;

    function findParent(spark) {
      if (spark.sparks || spark.title === parentTitle) {
        console.log("you entered foster care ");

        if (spark.sparks && spark.title === parentTitle) {
          console.log("you found a home with kids");
          spark.sparks.push({
            title: formState.title,
            description: formState.description,
          });
          console.log("we added your data");
          return (data = user);
        } else if (spark.title === parentTitle) {
          console.log("you found a home with out kids ");
          spark.sparks = [
            { title: formState.title, description: formState.description },
          ];
          console.log("we added a array with your data");
          return (data = user);
        } else if (spark.sparks) {
          console.log("next search hit");
          spark.sparks.map((spark) => {
            findParent(spark);
          });
        }

        return;
      }
    }
    let data;
    try {
      await console.log("start search");
      user.sparks.map((spark) => {
        console.log("hit first map");
        findParent(spark);
      });
    } catch (error) {
      console.error(error.message);
    }

    try {
      console.log("this is data sent back to the server " + data);
      await addSpark2Spark({
        variables: data,
      });
    } catch (e) {
      console.error(e);
    }

    setFormState({
      parentTitle: "",
      title: "",
      description: "",
    });
  };

  return (
    <div className="form-card">
      <h4 className="create-header">Add on to your sparks.</h4>
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

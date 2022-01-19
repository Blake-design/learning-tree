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

  const [addSpark2Spark, { error, data }] = useMutation(ADD_SPARK_2_SPARK);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };
  console.log(user);
  const parentTitle = "Autoplay";
  const childSpark = {
    title: "this operation was a success",
    description: "yayyyyy",
  };

  function findParent(spark) {
    if (spark.title === parentTitle) {
      console.log("you found the parent ");
      if (spark.sparks) {
        spark.sparks.push(childSpark);
      } else {
        debugger;
        spark.sparks = [...childSpark];
      }
      console.log(
        "------------------------------------------------------------------------- "
      );
    } else {
      console.log(+1);
      spark.sparks.map((spark) => {
        findParent(spark);
      });
    }
  }

  try {
    user.sparks.map((spark) => {
      findParent(spark);
    });
  } catch (error) {
    console.error(error.message);
  }
  console.log(user);
  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const spark = { ...formState };
    user.sparks.push(spark);

    JSON.stringify(user);

    // try {
    //   user.sparks.map((spark) => {
    //     findParent(spark);
    //   });
    // } catch (error) {
    //   console.error("could not find parent");
    // }

    // try {
    //   const { data } = await addSpark2Spark({
    //     variables: { ...formState },
    //   });

    // } catch (e) {
    //   console.error(e);
    //   console.log({ ...formState });
    // }
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

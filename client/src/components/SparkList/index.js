import React from "react";
import { useMutation } from "@apollo/client";

import { REMOVE_SPARK } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";

const SparkList = ({ sparks, isLoggedInUser = false }) => {
  const [removeSpark, { error }] = useMutation(REMOVE_SPARK, {
    update(cache, { data: { removeSpark } }) {
      try {
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: removeSpark },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleRemoveSpark = async (spark) => {
    try {
      const { data } = await removeSpark({
        variables: { spark },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!sparks.length) {
    return <h3>No Sparks Yet</h3>;
  }

  return (
    <div>
      <div className="flex-row justify-space-between my-4">
        {sparks &&
          sparks.map((spark) => (
            <div key={spark} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0 display-flex align-center">
                  <span>{spark}</span>
                  {isLoggedInUser && (
                    <button
                      className="btn btn-sm btn-danger ml-auto"
                      onClick={() => handleRemoveSpark(spark)}
                    >
                      X
                    </button>
                  )}
                </h4>
              </div>
            </div>
          ))}
      </div>
      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </div>
  );
};

export default SparkList;

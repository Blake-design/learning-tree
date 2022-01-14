import React from "react";
import { useMutation } from "@apollo/client";

import { REMOVE_SPARK } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";

const SparkList = () => {
  // const [removeSpark, { error }] = useMutation(REMOVE_SPARK, {
  //   update(cache, { data: { removeSpark } }) {
  //     try {
  //       cache.writeQuery({
  //         query: QUERY_ME,
  //         data: { me: removeSpark },
  //       });
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   },
  // });

  // const handleRemoveSpark = async (spark) => {
  //   try {
  //     const { data } = await removeSpark({
  //       variables: { spark },
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // if (!sparks.length) {
  //   return <h3>No Sparks Yet</h3>;
  // }

  return (
    <div>
      <h4>this is the component that will display user data</h4>
    </div>
  );
};

export default SparkList;

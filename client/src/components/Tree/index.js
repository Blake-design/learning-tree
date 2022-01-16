import React from "react";
import Tree from "react-d3-tree";

import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_SPARKS, QUERY_SINGLE_USER } from "../../utils/queries";

// This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.
// const orgChart = {
//   name: "userName",
//   children: [
//     {
//       name: "focus",
//       attributes: {
//         title: "focus title",
//       },
//       children: [
//         {
//           name: "spark",
//           attributes: {
//             title: "",
//           },
//           children: [
//             {
//               name: "Worker",
//             },
//           ],
//         },
//         {
//           name: "Foreman",
//           attributes: {
//             department: "Assembly",
//           },
//           children: [
//             {
//               name: "Worker",
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };

const OrgChartTree = ({ user }) => {
  const { loading, data } = useQuery(QUERY_ME);

  // const { loading, data } = useQuery(QUERY_SINGLE_USER, {
  //   variables: { userName: user.userName }
  // });

  // const { userName: userParam } = useParams();

  // const { loading, data } = useQuery(QUERY_SPARKS);

  console.log(data);

  // if (loading1) {
  //   return <div>Loading...</div>
  // };

  // const { data2 } = useQuery(QUERY_SPARKS);

  // console.log(data2);

  if (loading) {
    return <div>Loading...</div>
  };

  const convertedD3Obj = {
    name: data.me.sparks[0].title,
    children: data.me.sparks.map((s) => createNode(s))
  };

  function createNode(spark) {
    const newNode = {
      name: spark.title,
      attributes: { description: spark.description}
    };
    if (spark.sparks) {
      newNode.children = spark.sparks.map((s) => createNode(s))
    };

    return newNode;
  }

  console.log(convertedD3Obj);

  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <div id="treeWrapper" style={{ width: "50em", height: "20em" }}>
      <Tree data={convertedD3Obj} />
    </div>
  );
};

export default OrgChartTree;

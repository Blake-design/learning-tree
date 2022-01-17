import React from "react";
import Tree from "react-d3-tree";

import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_SPARKS, QUERY_SINGLE_USER } from "../../utils/queries";

// This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.
const orgChart = {
  name: "userName",
  children: [
    {
      name: "focus",
      attributes: {
        title: "focus title",
      },
      children: [
        {
          name: "spark",
          attributes: {
            title: "",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
        {
          name: "Foreman",
          attributes: {
            department: "Assembly",
          },
          children: [
            {
              name: "Worker",
            },
          ],
        },
      ],
    },
  ],
};

const OrgChartTree = ({ user }) => {
  const convertedD3Obj = {
    name: user.sparks.title,
    children: user.sparks.map((s) => createNode(s)),
  };

  function createNode(spark) {
    const newNode = {
      name: spark.title,
      attributes: { Description: spark.description },
    };
    if (spark.sparks) {
      newNode.children = spark.sparks.map((s) => createNode(s));
    }
    return newNode;
  }
  // console.log(convertedD3Obj);
  return (
    <div id="treeWrapper" style={{ width: "50em", height: "20em" }}>
      {user.sparks.length ? (
        <Tree data={convertedD3Obj} />
      ) : (
        <div> you currently have no data</div>
      )}
    </div>
  );
};

export default OrgChartTree;

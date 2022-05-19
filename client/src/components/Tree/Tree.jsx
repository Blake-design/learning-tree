import React from "react";
import Tree from "react-d3-tree";
import "../../App.css";

const OrgChartTree = ({ user }) => {
  const convertedD3Obj = {
    name: user.sparks.title,
    children: user.sparks.map((s) => createNode(s)),
  };

  function createNode(spark) {
    const newNode = {
      name: spark.title,
      attributes: { description: spark.description },
    };
    if (spark.sparks) {
      newNode.children = spark.sparks.map((s) => createNode(s));
    }
    return newNode;
  }
  const nodeSize = { x: 600, y: 300 };

  return (
    <div id="treeWrapper">
      {user.sparks.length ? (
        <Tree
          data={convertedD3Obj}
          rootNodeClassName="node__root"
          branchNodeClassName="node__branch"
          leafNodeClassName="node__leaf"
          nodeSize={nodeSize}
          separation={{ siblings: 1 }}
          pathClassFunc={() => "custom-link"}
        />
      ) : (
        <h4 id="nodata">You currently have no data.</h4>
      )}
    </div>
  );
};

export default OrgChartTree;

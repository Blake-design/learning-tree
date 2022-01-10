import { useD3 } from "../../hooks/useD3";
import React from "react";
import * as d3 from "d3";

function Tree({ data2 }) {
  const ref = useD3((svg) => {
    const height = 500;
    const width = 500;

    var treeStructure = d3.tree(data2).size([400, 400]);
    console.log(treeStructure);
  }, [data2].length);

  return (
    <svg
      ref={ref}
      style={{
        height: 500,
        width: "100%",
        marginRight: "0px",
        marginLeft: "0px",
      }}
    ></svg>
  );
}

export default Tree;

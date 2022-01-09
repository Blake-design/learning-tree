import React from "react";
import * as d3 from "d3";

export const useD3 = (renderChartFn, dependencies) => {
  // it holds a ref of a mutable object
  const ref = React.useRef();

  /// renderCartFn contains the chart logic , dependencies tell when to render (this is found inside the component)
  React.useEffect(() => {
    renderChartFn(d3.select(ref.current));
    return () => {};
  }, dependencies);
  /// if it has not returned a new chart return the ref chart
  return ref;
};

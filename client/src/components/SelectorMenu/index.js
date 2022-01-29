// import react, { useState } from "react";

// export default function SelectorMenu({ user }) {
//   const [optionValue, setOptionValue] = useState("");

//   handleSelect = (e) => {
//     setOptionValue(e.target.value);
//   };

//   var titles = [];
//   function findTitles(spark) {
//     if (spark.sparks) {
//       spark.sparks.map((s) => {
//         titles.push(s.title);
//         findTitles(s);
//       });
//     }
//   }

//   user.sparks.map((spark) => {
//     titles.push(spark.title);
//     findTitles(spark);
//   });
//   console.log(titles);
//   return (
//     <form>
//       <label htmlFor="Parent">Parent Node: </label>
//       <select name="title" onChange={handleSelect}>
//         {titles.map((title) => {
//           {
//             return <option value={title}>{title}</option>;
//           }
//         })}
//       </select>
//     </form>
//   );
// }

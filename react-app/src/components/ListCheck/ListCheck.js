import * as React from "react";
import { useState } from "react";

const ListCheck = ({ watchlist, sendWatchlistId }) => {
  const [checked, setChecked] = useState();

  // const handleChange = (e) => {
  //   const target = e.target.value;
  //   console.log(target);
  //   // setChecked(e.target.value);
  //   sendWatchlistId(target);
  // };

  const handleChange = (e) => {
    setChecked(e.target.value);
    console.log(e.target.value);
  };

  return (
    <li>
      {/* <label>{watchlist.title}</label>
      <input
        type="radio"
        id={watchlist.id}
        name={watchlist.name}
        value={watchlist.id}
        onChange={handleChange} */}
      <input type="radio" value="1" onChange={handleChange} />
    </li>
  );
};

export default ListCheck;

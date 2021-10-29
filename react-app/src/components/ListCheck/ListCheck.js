import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getWatchlists } from "../../store/watchlist";

const ListCheck = ({ watchlist, sendWatchlistId }) => {
  //   const dispatch = useDispatch();

  //   const watchlists = useSelector((state) => state.watchlist[0]);

  const [checked, setChecked] = useState();

  const handleChange = (e) => {
    const target = e.target.value;
    if (target.checked) {
      setChecked(e);
    }
    // console.log(target.value);
    sendWatchlistId(target);
  };

  //   useEffect(() => {
  //     dispatch(getWatchlists());
  //   }, []);

  return (
    <div>
      <div key={watchlist.id}>
        <div>{watchlist.title}</div>
        <input
          type="radio"
          value={watchlist.id}
          checked={checked}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ListCheck;

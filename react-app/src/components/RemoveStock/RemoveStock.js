import React from "react";
import { useDispatch } from "react-redux";
import { removeStock } from "../../store/watchlist_stock";

const RemoveStock = (s) => {
  const dispatch = useDispatch();
  const watchlist_stock_id = s.id;

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(removeStock(watchlist_stock_id)).then(window.location.reload());

  };

  return (
    <div>
      <span onClick={handleDelete}>Remove</span>
    </div>
  );
};

export default RemoveStock;

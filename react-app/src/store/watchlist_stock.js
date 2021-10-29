// --------------------------- Defined Action Types as Constants ---------------------
const ADDSTOCK_WATCHLIST = "watchlists/ADDSTOCK_WATCHLIST";
const GETSTOCK_WATCHLIST = "watchlists/GETSTOCK_WATCHLIST";

// --------------------------- Defined Action Creator(s) --------------------------
const addstocktoWatchlist = (watchlist) => ({
  type: ADDSTOCK_WATCHLIST,
  watchlist,
});

const getStockToWatchlist = (watchlist) => ({
  type: GETSTOCK_WATCHLIST,
  watchlist,
});

// ---------------------------  Defined Thunk(s) --------------------------------

// Get all watchlist stocks
export const getWatchlistStocks = () => async (dispatch) => {
  const response = await fetch(`/api/watchlist_stock/`, {
    method: "GET",
  });

  if (response.ok) {
    const data = await response.json();

    dispatch(getStockToWatchlist(data.watchlist_stocks));
    return response;
  }
};
// Add stock to watchlist
export const addToWatchlist = (form) => async (dispatch) => {
  const { watchlist_id, stock_ticker } = form;

  const formData = new FormData();
  formData.append("watchlist_id", watchlist_id);
  formData.append("stock_ticker", stock_ticker);

  const response = await fetch(`/api/watchlist_stock/${watchlist_id}/add`, {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addstocktoWatchlist(data));
  }
};

// ---------------------------  State & Reducer --------------------------------
const initialState = [];

const watchlist_stockReducer = (state = initialState, action) => {
  let newState = [...state];
  switch (action.type) {
    case GETSTOCK_WATCHLIST:
      return [action.watchlist];
    case ADDSTOCK_WATCHLIST:
      return [...newState, action.watchlist];
    default:
      return state;
  }
};

export default watchlist_stockReducer;

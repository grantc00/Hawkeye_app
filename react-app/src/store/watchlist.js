// --------------------------- Defined Action Types as Constants ---------------------
const GET_WATCHLISTS = "watchlists/GET_WATCHLISTS";
const CREATE_WATCHLIST = "watchlists/CREATE_WATCHLIST";
const EDIT_WATCHLIST = "watchlists/EDIT_WATCHLIST";
const DELETE_WATCHLIST = "watchlists/DELETE_WATCHLIST";
const ADDSTOCK_WATCHLIST = "watchlists/ADDSTOCK_WATCHLIST";

// --------------------------- Defined Action Creator(s) --------------------------
const getWatchlist = (watchlists) => ({ type: GET_WATCHLISTS, watchlists });
const editWatchlist = (watchlist) => ({ type: EDIT_WATCHLIST, watchlist });
const createWatchlist = (watchlist) => ({ type: CREATE_WATCHLIST, watchlist });
const deleteWatchlist = (watchlist) => ({ type: DELETE_WATCHLIST, watchlist });
const addstocktoWatchlist = (watchlist) => ({
  type: ADDSTOCK_WATCHLIST,
  watchlist,
});

// ---------------------------  Defined Thunk(s) --------------------------------
// Get all watchlist
export const getWatchlists = () => async (dispatch) => {
  const response = await fetch(`/api/watchlists`, {
    method: "GET",
  });

  if (response.ok) {
    const data = await response.json();

    dispatch(getWatchlist(data.watchlists));
    return response;
  }
};

// Create a watchlist
export const postWatchlist = (form) => async (dispatch) => {
  const { userId, emoji, title } = form;

  const formData = new FormData();
  formData.append("userId", userId);
  formData.append("emoji", emoji);
  formData.append("title", title);

  const response = await fetch(`/api/watchlists/new-watchlist`, {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(createWatchlist(data));
  }
};

// Edit a watchilst
export const patchWatchlist = (form) => async (dispatch) => {
  const { title, emoji, watchlist_id } = form;

  const formData = new FormData();
  formData.append("title", title);
  formData.append("emoji", emoji);

  const response = await fetch(`/api/watchlists/${watchlist_id}/edit`, {
    method: "PATCH",
    body: formData,
  });

  if (response.ok) {
    const data = await response.json();
    // const watchlist = data.watchlist;
    dispatch(editWatchlist(data));
  }
};

// Delete a watchilst
export const removeWatchlist = (watchlist_id) => async (dispatch) => {
  const response = await fetch(`/api/watchlists/${watchlist_id}/delete`, {
    method: "DELETE",
  });

  if (response.ok) {
    const watchlist = await response.json();
    dispatch(deleteWatchlist(watchlist));
  }
};

// Add stock to watchlist
export const addToWatchlist = (form) => async (dispatch) => {
  const { watchlist_id } = form;

  const formData = new FormData();
  formData.append("watchlist_id", watchlist_id);
  // formData.append("stock_ticker", stock_ticker);

  const response = await fetch(`/api/watchlists/${watchlist_id}/add`, {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addstocktoWatchlist(data));
  }
};

// export const removeWatchlist = (watchlist_id) => async(dispatch) => {
//   await fetch(`/api/watchlists/${watchlist_id}/delete`, {
//     method:'DELETE'
//   });
//   dispatch(deleteWatchlist(watchlist_id))
// }

// ---------------------------  State & Reducer --------------------------------
const initialState = [];

const watchlistReducer = (state = initialState, action) => {
  let newState = [...state];
  switch (action.type) {
    case GET_WATCHLISTS:
      return [action.watchlists];
    case CREATE_WATCHLIST:
      return [...newState, action.watchlist];
    case EDIT_WATCHLIST:
      return newState;
    case DELETE_WATCHLIST:
      return newState.filter((e) => action.watchlist.id !== e.id);
    case ADDSTOCK_WATCHLIST:
      return [...newState, action.watchlist];
    default:
      return state;
  }
};

export default watchlistReducer;

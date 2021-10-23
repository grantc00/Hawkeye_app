// --------------------------- Defined Action Types as Constants ---------------------
const GET_WATCHLISTS = "watchlists/GET_WATCHLISTS";
const CREATE_WATCHLIST = "watchlists/CREATE_WATCHLIST";
const EDIT_WATCHLIST = "watchlists/EDIT_WATCHLIST";
const DELETE_WATCHLIST = "watchlists/DELETE_WATCHLIST";

// --------------------------- Defined Action Creator(s) --------------------------
const getWatchlist = (watchlists) => ({ type: GET_WATCHLISTS, watchlists });
const createWatchlist = (watchlist) => ({ type: CREATE_WATCHLIST, watchlist });
const editWatchlist = (watchlist) => ({ type: EDIT_WATCHLIST, watchlist });
const deleteWatchlist = (watchlist) => ({type:DELETE_WATCHLIST, watchlist})

// ---------------------------  Defined Thunk(s) --------------------------------
// Get all watchlist
export const getWatchlists = () => async (dispatch) => {
  const response = await fetch(`/api/watchlists`, {
    method: "GET",
  });

  if (response.ok) {
    const data = await response.json();

    dispatch(getWatchlist(data));
    return response;
  }
};

// Create a watchlist
export const postWatchlist = (watchlist) => async (dispatch) => {
  const response = await fetch(`/api/watchlists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      watchlist,
    }),
  });
  if (response.ok) {
    const newWatchlist = await response.json();
    dispatch(createWatchlist(newWatchlist));
    return newWatchlist;
  }
};


// Edit a watchilst
export const patchWatchlist = (editedWatchlist) => async(dispatch) => {
    const {watchlist_id, title, emoji } = editedWatchlist;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('emoji', emoji);

    const response = await fetch(`/api/watchlists/${watchlist_id}`, {
        method: 'PATCH',
        body: formData
    });

    if(response.ok) {
        const data = await response.json();

        const watchlist = data.watchlist
        dispatch(editWatchlist(watchlist));
        return response
    }
}

// Delete a watchilst
export const removeWatchlist = (watchlist_id) => async(dispatch) => {
    const response = await fetch(`/api/watchlists/${watchlist_id}`, {
        method: 'DELETE'
    })

    if(response.ok) {
        const watchlist = await response.json();
        dispatch(deleteWatchlist(watchlist))
    }
}


// ---------------------------  State & Reducer --------------------------------
const initialState = [];

const watchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WATCHLISTS:
      return [action.watchlists];
    case CREATE_WATCHLIST:
      return [action.watchlist];
    case DELETE_WATCHLIST:
        return [action.watchlist];
    default:
      return state;
  }
};

export default watchlistReducer;

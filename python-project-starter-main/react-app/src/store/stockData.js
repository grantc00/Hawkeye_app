// --------------------------- Defined Action Types as Constants ---------------------

const GET_SEARCH = "search/getSearch";

// --------------------------- Defined Action Creator(s) --------------------------

const getSearch = (results) => ({ type: GET_SEARCH, payload: results });

// ---------------------------  Defined Thunk(s) --------------------------------

// fetch stock data base on user's search input
export const searchStockData = (token, searchInput) => async (dispatch) => {
  const response = await fetch(
    `https://cloud.iexapis.com/stable/stock/${searchInput}/intraday-prices?token=${token}`
  );
  const data = await response.json();
  dispatch(getSearch(data));
};

// ---------------------------  State & Reducer --------------------------------
const initialState = { results: null };

const searchReducer = (state = initialState, action) => {
  // let newState = [];
  switch (action.type) {
    case GET_SEARCH:
      return { results: action.payload };
    // return { user: action.payload }
    // case GET_SEARCH: {
    //   const newState = [];
    //   newState.push(action.search);
    //   return newState;
    // }
    default:
      return state;
  }
};

export default searchReducer;

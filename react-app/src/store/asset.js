// --------------------------- Defined Action Types as Constants ---------------------
const GET_ASSETS = "assets/GET_ASSETS";
const ADD_ASSET = "assets/POST_ASSETS";
const EDIT_ASSET = "assets/EDIT_ASSETS";
const DELETE_ASSET = "assets/DELETE_ASSETS";

// --------------------------- Defined Action Creator(s) --------------------------
const getAssets = (assets) => {
  return {
    type: GET_ASSETS,
    assets,
  };
};

const addAssets = (assets) => {
  return {
    type: ADD_ASSET,
    assets,
  };
};

const editAssets = (assets) => {
  return {
    type: EDIT_ASSET,
    assets,
  };
};

const sellAssets = (assets) => {
  return {
    type: DELETE_ASSET,
    assets,
  };
};

// ---------------------------  Defined Thunk(s) --------------------------------

//  Get All Assest
export const getAllAssets = () => async (dispatch) => {
  const response = await fetch(`/api/assets/`, {
    method: "GET",
  });

  if (response.ok) {
    const data = await response.json();

    dispatch(getAssets(data.assets));
    return response;
  }
};

//  Add Assest
export const addAsset = (form) => async (dispatch) => {
  const { userId, ticker, shares, cost } = form;

  const formData = new FormData();
  formData.append("userId", userId);
  formData.append("ticker", ticker);
  formData.append("shares", shares);
  formData.append("cost", cost);

  const response = await fetch(`/api/assets/new-asset`, {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addAssets(data));
  }
};

//  Edit Assest
export const updateAsset = (form, assetId) => async (dispatch) => {
  const { userId, ticker, shares, cost } = form;

  const formData = new FormData();
  formData.append("userId", userId);
  formData.append("ticker", ticker);
  formData.append("shares", shares);
  formData.append("cost", cost);

  const response = await fetch(`/api/assets/${assetId}`, {
    method: "PATCH",
    body: formData,
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(editAssets(data));
  }
};

//  Delete Assest
export const sellAsset = (assetId) => async (dispatch) => {
  const response = await fetch(`/api/assets/${assetId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(sellAssets(data));
  }
};

// ---------------------------  State & Reducer --------------------------------
const initialState = [];

const assetReducer = (state = initialState, action) => {
  let newState = [...state];
  switch (action.type) {
    case GET_ASSETS:
      return [action.assets];
    case ADD_ASSET:
      return [...newState, action.asset];
    case EDIT_ASSET:
      return newState;
    case DELETE_ASSET:
      return newState.filter((el) => action.assets.id !== el.id);
    default:
      return state;
  }
};

export default assetReducer;

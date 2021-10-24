// --------------------------- Defined Action Types as Constants ---------------------
const GET_ASSET = "assets/GET_ASSET";
const GET_ASSETS = "assets/GET_ASSETS";
const ADD_ASSET = "assets/POST_ASSETS";
const EDIT_ASSET = "assets/EDIT_ASSET";
const DELETE_ASSET = "assets/DELETE_ASSET";

// --------------------------- Defined Action Creator(s) --------------------------
const getAsset = (asset) => ({ type: GET_ASSET, asset });
const getAssets = (assets) => ({ type: GET_ASSETS, assets });
const addAssets = (assets) => ({ type: ADD_ASSET, assets });
const editAssets = (asset) => ({ type: EDIT_ASSET, asset });
const deleteAssets = (asset) => ({ type: DELETE_ASSET, asset });

// ---------------------------  Defined Thunk(s) --------------------------------

// Get one asset
export const getOneAsset = (assetId) => async (dispatch) => {
  const response = await fetch(`/api/assets/${assetId}`, {
    method: "GET",
  });

  if (response.ok) {
    const data = await response.json();

    dispatch(getAsset(data));
    return response;
  }
};

// Get all asset
export const getAllAssets = () => async (dispatch) => {
  const response = await fetch(`api/assets`, {
    method: "GET",
  });

  if (response.ok) {
    const data = await response.json();

    dispatch(getAssets(data.assets));
    return response;
  }
};

// Add asset
export const addAsset = (form) => async (dispatch) => {
  const { userId, ticker, shares, cost } = form;

  const formData = new FormData();
  formData.append("userId", userId);
  formData.append("ticker", ticker);
  formData.append("shares", shares);
  formData.append("cost", cost);
  // if (userId) formData.append('userId', userId)

  const response = await fetch(`/api/assets/new-asset`, {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addAssets(data));
  }
};

// Edit asset
export const editAsset = (assetId) => async (dispatch) => {
  const response = await fetch(`/api/assets/${assetId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(assetId),
  });
  const asset = await response.json();
  dispatch(editAssets(asset));
  return response;
};

// Delete asset
export const deleteAsset = (assetId) => async (dispatch) => {
  const response = await fetch(`/api/assets/${assetId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const asset = await response.json();
    dispatch(deleteAssets(asset));
  }
};

// ---------------------------  State & Reducer --------------------------------
const initialState = [];

const assetReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ASSET:
      return [action.asset];
    case GET_ASSETS:
      return [...action.assets];
    case ADD_ASSET:
      return [action.asset];
    case EDIT_ASSET:
      return [action.asset];
    case DELETE_ASSET:
      return [action.asset];
    default:
      return state;
  }
};

export default assetReducer;

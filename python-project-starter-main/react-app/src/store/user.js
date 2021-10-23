// --------------------------- Defined Action Types as Constants ---------------------

const GET_USER = 'users/GET_USER';
const GET_USERS = 'users/GET_USERS'

// --------------------------- Defined Action Creator(s) --------------------------
const getUser = (user) => ({ type: GET_USER, user});
const getUsers = (users) => ({ type: GET_USERS, users});


// ---------------------------  Defined Thunk(s) --------------------------------

//Get one user
export const getOneUser = (userId) => async(dispatch) => {
    const response = await fetch(`/api/users/${userId}`, {
        method: 'GET'
    })

    if (response.ok) {
        const data = await response.json();

        dispatch(getUser(data));
        return response;
    }
}

//Get all users
export const getAllUsers = () => async(dispatch) => {
    const response = await fetch(`api/users`, {
        method: 'GET'
    });

    if(response.ok) {
        const data = await response.json()

        dispatch(getUsers(data.users));
        return response;
    }
}


// ---------------------------  State & Reducer --------------------------------
const initialState = [];

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USER:
            return [action.user]
        case GET_USERS:
            return [...action.users]
        default:
            return state;
    }
}

export default userReducer;

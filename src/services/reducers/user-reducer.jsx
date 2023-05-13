import {
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILED,
} from "../actions/user-actions";

const initialState = {
  email: null,
  password: null,
  name: null,
};

export const setUserReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
      };
    case USER_DETAILS_SUCCESS:
      return {
        email: action.user.email,
        password: action.user.password,
        name: action.user.name,
      };
    case USER_DETAILS_FAILED:
      return {
        initialState,
      };
    default:
      return state;
  }
};

import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED
} from '../actions/register-actions'

const initialState = {
  email: null,
  password: null,
  name: null,
};


export const registerUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        ...state,
      };
    case REGISTER_USER_SUCCESS:
      return {
        email: action.user.email,
        password: action.user.password,
        name: action.user.name,
      };
    case REGISTER_USER_FAILED:
      return {
        initialState,
      };
    default:
      return state;
  }
};
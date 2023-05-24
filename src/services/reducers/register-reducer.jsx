import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED
} from '../actions/register-actions'

const initialState = {
  name: null,
  email: null,
  password: null,
  isAuthenticated: false
};

export const registerUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        ...state,
      };
    case REGISTER_USER_SUCCESS:
      if (action.payload && action.payload.name && action.payload.email) {
        return {
          name: action.payload.name,
          email: action.payload.email,
          password: action.payload.password,
          isAuthenticated: true
        };
      } else {
        return state;
      }
    case REGISTER_USER_FAILED:
      return {
        name: null,
        email: null,
        password: null,
        isAuthenticated: false
      };
    default:
      return state;
  }
};
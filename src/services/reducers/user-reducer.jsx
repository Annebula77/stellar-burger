import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILED,
  ISAUTH_CHECKED,
  ISAUTH_CHECKED_FAILD
} from "../actions/user-actions";


const initialState = {
  email: null,
  password: null,
  name: null,
  isAuthChecked: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
    case UPDATE_USER_REQUEST:
    case REFRESH_TOKEN_REQUEST:
      return {
        ...state,
      };
    case GET_USER_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        name: action.payload.name,
      };
    case GET_USER_FAILED:
    case UPDATE_USER_FAILED:
      return {
        ...state,
        email: null,
        password: null,
        name: null,
      };
    case REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
      };
    case REFRESH_TOKEN_FAILED:
      return {
        ...state,
        email: null,
        password: null,
        name: null,
      };
    case ISAUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: true,
      };
    case ISAUTH_CHECKED_FAILD:
      return {
        ...state,
        isAuthChecked: false,
      };
    default:
      return state;
  }
};

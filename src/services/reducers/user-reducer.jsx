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
  ISAUTH_CHECKED_FAILD,
  LOGOUT_SUCCESS,
  START_LOADING,
  END_LOADING,
} from '../actions/user-actions';

const initialState = {
  success: false,
  user: null,
  isAuthChecked: false,
  accessToken: '',
  refreshToken: '',
  isLoading: false,
  authError: null, // New field for authentication error
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
        success: true,
        user: action.payload,
        authError: null, // Reset authError on success
      };
    case GET_USER_FAILED:
    case UPDATE_USER_FAILED:
      return {
        ...state,
        success: false,
        user: null,
        authError: action.payload, // Update authError on failure
      };
    case REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        authError: null, // Reset authError on success
      };
    case REFRESH_TOKEN_FAILED:
      return {
        ...state,
        user: null,
        accessToken: '',
        refreshToken: '',
        isAuthChecked: false,
        authError: action.payload, // Update authError on failure
      };
    case ISAUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload,
        authError: null, // Reset authError when auth is checked
      };
    case ISAUTH_CHECKED_FAILD:
      return {
        ...state,
        isAuthChecked: false,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthChecked: false,
        user: null,
        accessToken: '',
        refreshToken: '',
        authError: null,
      };
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case END_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
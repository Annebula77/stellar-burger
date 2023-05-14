import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED
} from '../actions/login-actions';


const initialState = {
  status: false,
  accessToken: null,
  refreshToken: null,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        status: true,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        status: false,
        accessToken: null,
        refreshToken: null,
      };
    default:
      return state;
  }
};


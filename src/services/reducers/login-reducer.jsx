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
  console.log(action)
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
      };
    case LOGIN_SUCCESS:
      console.log('====>>  User logged in');
      return {
        ...state,
        status: true,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
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


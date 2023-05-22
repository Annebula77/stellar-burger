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
} from "../actions/user-actions";



const initialState = {
  success: false,
  user: null,
  isAuthChecked: false,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
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
        user: action.payload.user,

      };
    case GET_USER_FAILED:
    case UPDATE_USER_FAILED:
      if (action.payload && action.payload.message) {
        console.log("Payload:", action.payload.message);
        return {
          ...state,
          success: false,
          name: '',
          email: '',
        };
      } else {
        console.log("Payload:", action.payload);
        return {
          ...state,
          success: false,
          user: null,
        };
      }
    case REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
      };
    case REFRESH_TOKEN_FAILED:
      return {
        ...state,
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthChecked: false,
      };
    case ISAUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload,
      };
    case ISAUTH_CHECKED_FAILD:
      return {
        ...state,
        isAuthChecked: false,
      };
    case LOGOUT_SUCCESS:
      console.log(' ====> User logged out');
      console.log(userReducer.action)
      return {
        ...state,
        isAuthChecked: false,
        user: null,
        accessToken: null,
        refreshToken: null,
      };
    case START_LOADING:
      return {
        ...state,
        isLoading: true, // начать загрузку
      };
    case END_LOADING:
      return {
        ...state,
        isLoading: false, // завершить загрузку
      };
    default:
      return state;
  }
};

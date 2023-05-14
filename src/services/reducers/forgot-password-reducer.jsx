import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
} from "../actions/forgot-password-actions";

const initialState = {

  status: false,
};

export const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        status: true,
      };
    case FORGOT_PASSWORD_FAILED:
      return {
        ...state,
        status: false,
      };
    default:
      return state;
  }
};

import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
} from "../actions/reset-password-actions";

const initialState = {
  status: false,
};

export const resetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        status: 'success',
      };
    case RESET_PASSWORD_FAILED:
      return {
        ...state,
        status: null,
      };
    default:
      return state;
  }
};

import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED
} from '../actions/logout-actions';

const initialState = {
  status: false,
};

export const logoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT_REQUEST:
      return {
        ...state,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        status: true,
      };
    case LOGOUT_FAILED:
      return {
        ...state,
        status: false,
      };
    default:
      return state;
  }
}


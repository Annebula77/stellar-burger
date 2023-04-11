import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
} from '../actions/order-actions';

const initialState = {
  loadingOrder: false,
  errorOrder: null,
  data: null,
};


export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_ORDER_REQUEST:
      return {
        ...state,
        loadingOrder: true,
        errorOrder: false

      };
    case POST_ORDER_SUCCESS:
      return {
        ...state,
        loadingOrder: false,
        errorOrder: false,
        data: action.payload
      };
    case POST_ORDER_FAILED:
      return {
        ...state,
        loadingOrder: false,
        errorOrder: action.payload,
      };
    default:
      return state;
  }
};
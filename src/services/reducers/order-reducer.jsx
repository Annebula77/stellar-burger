import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  postOrderRequest,
  postOrderSuccess,
  postOrderFailed
} from '../actions/order-actions';
import { postData } from '../../utils/api';

const initialState = {
  loadingOrder: false,
  errorOrder: false
};

export const postOrder = (data) => {
  return async (dispatch) => {
    dispatch(postOrderRequest());

    try {
      await postData(data);
      dispatch(postOrderSuccess());
    } catch (error) {
      dispatch(postOrderFailed());
    }
  };
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_ORDER_REQUEST:
      return {
        ...state,
        loadingOrder: true,
        errorOrder: false,
      };
    case POST_ORDER_SUCCESS:
      return {
        ...state,
        loadingOrder: false,
        errorOrder: false,
      };
    case POST_ORDER_FAILED:
      return {
        ...state,
        loadingOrder: false,
        errorOrder: true,
      };
    default:
      return state;
  }
};
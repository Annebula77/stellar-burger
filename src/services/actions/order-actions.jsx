export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';

export const postOrderRequest = () => ({
  type: POST_ORDER_REQUEST,
});

export const postOrderSuccess = () => ({
  type: POST_ORDER_SUCCESS,
});

export const postOrderFailed = () => ({
  type: POST_ORDER_FAILED,
});
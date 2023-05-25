import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_GET_DATA,
  WS_CONNECTION_CLOSED,
} from '../actions/webSocket-actions'

const initialState = {
  connected: false,
  data: null,
};

export function wsReducer(state = initialState, action) {
  switch (action.type) {
    case WS_CONNECTION_START:
      return {
        ...state,
        connected: false,
      };
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        connected: true,
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        connected: false,
      };
    case WS_GET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        connected: false,
      };
    default:
      return state;
  }
}
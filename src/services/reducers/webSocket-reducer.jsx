import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_GET_DATA,
  WS_CONNECTION_CLOSED,
  CLEAR_WS_DATA
} from '../actions/webSocket-actions'
const initialWsState = {
  connected: false,
  data: null,
  error: null,
};

export const wsReducer = (state = initialWsState, action) => {
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
        error: action.payload,
      };
    case WS_GET_DATA:
      if (action.serverType === 'orders') {
        return {
          ...state,
          data: action.payload,
          error: null,
        };
      } else {
        return state;
      }
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        connected: false,
      };
    case CLEAR_WS_DATA:
      return {
        ...state,
        data: null,
      };
    default:
      return state;
  }
};

const initialWsUserState = {
  connected: false,
  data: null,
  error: null,
};

export const wsUserReducer = (state = initialWsUserState, action) => {
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
        error: action.payload,
      };
    case WS_GET_DATA:
      if (action.serverType === 'user') {
        return {
          ...state,
          data: action.payload,
          error: null,
        };
      } else {
        return state;
      }
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        connected: false,
      };
    case CLEAR_WS_DATA:
      return {
        ...state,
        data: null,
      };
    default:
      return state;
  }
};
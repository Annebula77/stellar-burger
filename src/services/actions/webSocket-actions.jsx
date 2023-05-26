export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_GET_DATA = 'WS_GET_DATA';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_SEND_DATA = 'WS_SEND_DATA';

export const startWsConnection = (accessToken) => ({
  type: WS_CONNECTION_START,
  payload: accessToken,
});

export const wsConnectionSuccess = (event) => ({
  type: WS_CONNECTION_SUCCESS,
  payload: event,
});

export const wsConnectionError = (event) => ({
  type: WS_CONNECTION_ERROR,
  payload: event,
});

export const wsGetData = (data) => ({
  type: WS_GET_DATA,
  payload: data,
});

export const wsConnectionClosed = (event) => ({
  type: WS_CONNECTION_CLOSED,
  payload: event,
});

export const wsSendData = (data) => ({
  type: WS_SEND_DATA,
  payload: data,
});
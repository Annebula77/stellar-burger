import {
  WS_CONNECTION_START,
  WS_SEND_DATA,
} from '../actions/webSocket-actions';

export const socketMiddleware = (wsUrl, wsUserUrl) => {
  let socketAllOrders = null;
  let socketUserOrders = null;

  return store => {
    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === WS_CONNECTION_START) {
        const { accessToken, serverType } = payload;
        const url = serverType === 'user' ? `${wsUserUrl}?token=${accessToken}` : wsUrl;

        if (serverType === 'user') {
          socketUserOrders = new WebSocket(url);
        } else {
          socketAllOrders = new WebSocket(url);
        }
      }

      // обработка событий для all orders socket
      if (socketAllOrders) {
        socketAllOrders.onopen = event => {
          dispatch(wsConnectionSuccess(event));
        };

        socketAllOrders.onerror = event => {
          dispatch(wsConnectionError(event));
        };

        socketAllOrders.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(wsGetData(parsedData.orders));
        };

        socketAllOrders.onclose = event => {
          dispatch(wsConnectionClosed(event));
        };
      }

      // обработка событий для user orders socket
      if (socketUserOrders) {
        socketUserOrders.onopen = event => {
          dispatch(wsConnectionSuccess(event));
        };

        socketUserOrders.onerror = event => {
          dispatch(wsConnectionError(event));
        };

        socketUserOrders.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(wsGetData(parsedData.orders));
        };

        socketUserOrders.onclose = event => {
          dispatch(wsConnectionClosed(event));
        };
      }

      if (type === WS_SEND_DATA) {
        const data = JSON.stringify(payload);
        // отправляем данные только через сокет socketUserOrders
        if (socketUserOrders) {
          socketUserOrders.send(data);
        } else {
          console.error("Не удалось отправить данные, т.к. соединение socketUserOrders не открыто");
        }
      }

      next(action);
    };
  };
};
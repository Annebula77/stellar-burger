import {
  WS_CONNECTION_START,
  WS_SEND_DATA,
  wsConnectionSuccess,
  wsConnectionError,
  wsGetData,
  wsConnectionClosed,
  clearWsData
} from '../services/actions/webSocket-actions';

let socketUserOrders = null;

export const socketMiddleware = (wsUrl, wsUserUrl) => {
  let socketAllOrders = null;

  return store => {
    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === WS_CONNECTION_START) {
        const { serverType, accessToken, callback } = payload;

        const cleanAccessToken = accessToken ? accessToken.replace('Bearer ', '') : '';
        let url = wsUrl;

        if (serverType === 'user' && cleanAccessToken) {
          url = `${wsUserUrl}?token=${cleanAccessToken}`;
        }

        if (serverType === 'user') {
          if (!socketUserOrders) {
            socketUserOrders = new WebSocket(url);
            socketUserOrders.onopen = event => {
              dispatch(wsConnectionSuccess(event));
              if (typeof callback === 'function') callback();
            };
          }
        } else {
          socketAllOrders = new WebSocket(url);
          socketAllOrders.onopen = event => {
            dispatch(wsConnectionSuccess(event));
          };

          socketAllOrders.onerror = event => {
            dispatch(wsConnectionError(event));
          };

          socketAllOrders.onmessage = event => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            dispatch(wsGetData(parsedData));
          };

          socketAllOrders.onclose = event => {
            dispatch(wsConnectionClosed(event));
            dispatch(clearWsData());
          };
        }
      }

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
          console.log(parsedData);
          dispatch(wsGetData(parsedData));
        };

        socketUserOrders.onclose = event => {
          dispatch(wsConnectionClosed(event));
        };
      }

      if (type === WS_SEND_DATA) {
        const data = JSON.stringify(payload);
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
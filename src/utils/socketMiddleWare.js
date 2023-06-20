import { refreshTokenApi } from "../services/thunks/user-thunks";
let socket = null;
let userSocket = null;
export const socketMiddleware = (wsUrl, wsUserUrl, wsSliceActions, wsUserSliceActions) => store => next => action => {
 

  const { dispatch } = store;

  const wsActions = {
    ...wsSliceActions,
    wsInit: 'ws/startConnection'
  };

  const wsUserActions = {
    ...wsUserSliceActions,
    wsUserInit: 'wsUser/startUserConnection'
  };

  const { wsInit, wsConnectionSuccess, wsConnectionError, wsGetData, wsConnectionClosed } = wsActions;
  const { wsUserInit, wsUserConnectionSuccess, wsUserConnectionError, wsUserData, wsUserConnectionClosed } = wsUserActions;

  if (action.type === wsInit) {
    socket = new WebSocket(wsUrl);
  } else if (action.type === wsUserInit) {
    const cleanAccessToken = action.payload ? action.payload.replace('Bearer ', '') : '';
    userSocket = new WebSocket(`${wsUserUrl}?token=${cleanAccessToken}`);
  }

  if (socket) {
    socket.onopen = () => {
      dispatch(wsConnectionSuccess());
    };

    socket.onerror = event => {
      dispatch(wsConnectionError(event));
    };

    socket.onmessage = event => {
      const { data } = event;
      const parsedData = JSON.parse(data);
      dispatch(wsGetData(parsedData));
    };

    socket.onclose = () => {
      dispatch(wsConnectionClosed());
    };
  }

  if (userSocket) {
    userSocket.onopen = () => {
      dispatch(wsUserConnectionSuccess());
    };

    userSocket.onerror = event => {
      dispatch(wsUserConnectionError(event));
    };

    userSocket.onmessage = async event => {
      const { data } = event;
      const parsedData = JSON.parse(data);
    
      if (parsedData.message === 'Invalid token') {
        try {
          // Вызовите функцию refreshTokenApi и ждите её выполнения
          const newTokenData = await dispatch(refreshTokenApi());
          userSocket.close();
          // Создайте новый WebSocket с обновленным токеном
          userSocket = new WebSocket(`${wsUserUrl}?token=${newTokenData.accessToken}`);
          // Подключите обработчики событий к новому WebSocket
          userSocket.onopen = event => dispatch(wsUserConnectionSuccess(event));
          userSocket.onmessage = event => dispatch(wsUserData(JSON.parse(event.data)));
          userSocket.onerror = event => dispatch(wsUserConnectionError(event));
          userSocket.onclose = () => dispatch(wsUserConnectionClosed());
        } catch (err) {
          console.error('Failed to refresh token:', err);
        }
      } else {
        dispatch(wsUserData(parsedData));
      }
    };

    userSocket.onclose = () => {
      dispatch(wsUserConnectionClosed());
    };
  }

  next(action);
};
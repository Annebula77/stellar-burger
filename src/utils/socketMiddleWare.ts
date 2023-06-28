import { Middleware } from "redux";
import { refreshTokenApi } from "../services/thunks/user-thunks";
import { TokenType, WSActions, WSUserActions } from "./essentials";
import { unwrapResult } from "@reduxjs/toolkit";
import { AppDispatch } from '../services/store';

let socket: WebSocket | null = null;
let userSocket: WebSocket | null = null;

export const socketMiddleware = (wsUrl: string, wsUserUrl: string, wsSliceActions: WSActions, wsUserSliceActions: WSUserActions): Middleware => store => next => action => {
  const dispatch: AppDispatch = store.dispatch;


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

    socket.onerror = (event) => {
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

      if (parsedData.message === 'jwt expired') {
        try {
          const newTokenDataAction = await dispatch(refreshTokenApi());
          const newTokenData: TokenType = unwrapResult(newTokenDataAction);

          if (newTokenData) {
            userSocket = new WebSocket(`${wsUserUrl}?token=${newTokenData.accessToken}`);
            userSocket.onopen = () => dispatch(wsUserConnectionSuccess());
            userSocket.onmessage = (event) => dispatch(wsUserData(JSON.parse(event.data)));
            userSocket.onerror = (event) => dispatch(wsUserConnectionError(event));
            userSocket.onclose = () => dispatch(wsUserConnectionClosed());
          } else {
            console.error('Failed to refresh token: No payload received');
          }
        } catch (error) {
          console.error('Failed to refresh token: ', error);
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
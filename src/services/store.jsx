import { applyMiddleware } from 'redux';
import { legacy_createStore as createStore } from 'redux'
import { rootReducer } from './reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { socketMiddleware } from '../utils/socketMiddleWare';

const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
const wsUserUrl = 'wss://norma.nomoreparties.space/orders';

export const WS_ACTIONS = {
  WS_CONNECTION_START: 'WS_CONNECTION_START',
  WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS',
  WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR',
  WS_GET_DATA: 'WS_GET_DATA',
  WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED',
  WS_SEND_DATA: 'WS_SEND_DATA',
  CLEAR_WS_DATA: 'CLEAR_WS_DATA',
};



export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, socketMiddleware(wsUrl, wsUserUrl, WS_ACTIONS))));
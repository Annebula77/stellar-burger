import { applyMiddleware } from 'redux';
import { legacy_createStore as createStore } from 'redux'
import { rootReducer } from './reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { socketMiddleware } from '../utils/socketMiddleWare';
const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
const wsUserUrl = 'wss://norma.nomoreparties.space/orders';



export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, socketMiddleware(wsUrl, wsUserUrl))));
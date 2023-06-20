import { configureStore } from '@reduxjs/toolkit';
import { socketMiddleware } from '../utils/socketMiddleWare';
import modalSlice from './slices/modal-slice';
import { ingredientsReducer } from './slices/ingredients-slice';
import userReducer from './slices/user-slice';
import burgerConstructorSlice from './slices/burger-constructor-slice';
import registerUserSlice from './slices/register-slice'
import orderSlice from './slices/order-slice';
import loginSlice from './slices/login-slice';
import forgotPasswordSlice from './slices/forgot-password-slice';
import resetPasswordSlice from './slices/reset-password-slice';
import {
  ws,
  wsUser,
  wsConnectionSuccess,
  wsConnectionError,
  wsGetData,
  wsConnectionClosed,
  clearWsData,
  startConnection,
  wsUserConnectionSuccess,
  wsUserConnectionError,
  wsUserData,
  wsUserConnectionClosed,
  clearWsUserData,
  startUserConnection,
} from './slices/webSocket-slice';



const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
const wsUserUrl = 'wss://norma.nomoreparties.space/orders';
const wsSliceActions = {
  wsConnectionSuccess,
  wsConnectionError,
  wsGetData,
  wsConnectionClosed,
  clearWsData,
  startConnection,
}



const wsUserSliceActions = {
  wsUserConnectionSuccess,
  wsUserConnectionError,
  wsUserData,
  wsUserConnectionClosed,
  clearWsUserData,
  startUserConnection,
};


export const store = configureStore({
  reducer: {
    modal: modalSlice,
    ingredients: ingredientsReducer,
    user: userReducer,
    burgerOrderList: burgerConstructorSlice,
    order: orderSlice,
    login: loginSlice,
    registerUser: registerUserSlice,
    forgotPassword: forgotPasswordSlice,
    resetPassword: resetPasswordSlice,
    ws: ws,
    wsUser: wsUser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(wsUrl, wsUserUrl, wsSliceActions, wsUserSliceActions)
    )
});
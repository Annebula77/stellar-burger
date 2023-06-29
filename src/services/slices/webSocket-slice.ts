import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WsDataPayload, WsState } from '../../utils/essentials';



const initialState: WsState = {
  wsConnected: false,
  orders: null,
  total: 0,
  totalToday: 0,
  error: null,
}

export const wsSlice = createSlice({
  name: 'ws',
  initialState,
  reducers: {
    wsConnectionSuccess: (state) => {
      state.wsConnected = true;
      state.error = null;
    },
    wsConnectionError: (state, action: PayloadAction<Event>) => {
      state.wsConnected = false;
      state.error = action.payload;
    },
    wsGetData: (state, action: PayloadAction<WsDataPayload>) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    wsConnectionClosed: (state) => {
      state.wsConnected = false;
    },
    clearWsData: (state) => {
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
      state.error = null;
    },
    startConnection: (state, action: PayloadAction<string | undefined>) => {
      // Это действие не изменяет состояние, но передает токен в action.payload
    },
  },
});


export const wsUserSlice = createSlice({
  name: 'wsUser',
  initialState,
  reducers: {
    wsUserConnectionSuccess: (state) => {
      state.wsConnected = true;
      state.error = null;
    },
    wsUserConnectionError: (state, action: PayloadAction<Event>) => {
      state.wsConnected = false;
      state.error = action.payload;
    },
    wsUserData: (state, action: PayloadAction<WsDataPayload>) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    wsUserConnectionClosed: (state) => {
      state.wsConnected = false;
    },
    clearWsUserData: (state) => {
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
      state.error = null;
    },
    startUserConnection: (state, action: PayloadAction<string | undefined>) => {
      // Это действие не изменяет состояние, но передает токен в action.payload
    },
  },
});

export const {
  wsUserConnectionSuccess,
  wsUserConnectionError,
  wsUserData,
  wsUserConnectionClosed,
  clearWsUserData,
  startUserConnection,
} = wsUserSlice.actions;

export const {
  wsConnectionSuccess,
  wsConnectionError,
  wsGetData,
  wsConnectionClosed,
  clearWsData,
  startConnection
} = wsSlice.actions;

export const ws = wsSlice.reducer;
export const wsUser = wsUserSlice.reducer;


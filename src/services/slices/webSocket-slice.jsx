import { createSlice } from '@reduxjs/toolkit';


export const wsSlice = createSlice({
  name: 'ws',
  initialState: {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
    error: null,
  },
  reducers: {
    wsConnectionSuccess: (state) => {
      state.wsConnected = true;
      state.error = null;
    },
    wsConnectionError: (state, action) => {
      state.wsConnected = false;
      state.error = action.payload;
    },
    wsGetData: (state, action) => {
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
    startConnection: () => { }
  },
});


export const wsUserSlice = createSlice({
  name: 'wsUser',
  initialState: {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
    error: null,
  },
  reducers: {
    wsUserConnectionSuccess: (state) => {
      state.wsConnected = true;
      state.error = null;
    },
    wsUserConnectionError: (state, action) => {
      state.wsConnected = false;
      state.error = action.payload;
    },
    wsUserData: (state, action) => {
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
    startUserConnection: (state, action) => {
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


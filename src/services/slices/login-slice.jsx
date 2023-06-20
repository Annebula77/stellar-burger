import { createSlice } from "@reduxjs/toolkit";
import { loginApi } from "../thunks/login-thunk";


// Создаем слайс
const loginSlice = createSlice({
  name: 'user',
  initialState: {
    status: false,
    accessToken: null,
    refreshToken: null,
  },
  reducers: {
    logoutStatus: (state) => {
      state.status = false;
      state.accessToken = null;
      state.refreshToken = null;
    },
    initializeLoginFromCookies: (state, action) => {

      state.status = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginApi.pending, (state) => {
        state.status = false;
      })
      .addCase(loginApi.fulfilled, (state, action) => {

        state.status = true;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(loginApi.rejected, (state) => {
        state.status = false;
        state.accessToken = null;
        state.refreshToken = null;
      });
  },
});

export const { logoutStatus, initializeLoginFromCookies } = loginSlice.actions;

export default loginSlice.reducer;
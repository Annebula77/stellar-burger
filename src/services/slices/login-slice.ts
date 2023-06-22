import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginApi } from "../thunks/login-thunk";

interface LoginState {
  status: boolean;
  accessToken: string;
  refreshToken: string
}
const initialState: LoginState = {
  status: false,
  accessToken: '',
  refreshToken: '',
}

interface LoginPayload {
  accessToken: string;
  refreshToken: string;
}

// Создаем слайс
const loginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutStatus: (state) => {
      state.status = false;
      state.accessToken = '';
      state.refreshToken = '';
    },
    initializeLoginFromCookies: (state, action: PayloadAction<LoginPayload>) => {

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
      .addCase(loginApi.fulfilled, (state, action: PayloadAction<LoginPayload>) => {

        state.status = true;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(loginApi.rejected, (state) => {
        state.status = false;
        state.accessToken = '';
        state.refreshToken = '';
      });
  },
});

export const { logoutStatus, initializeLoginFromCookies } = loginSlice.actions;

export default loginSlice.reducer;
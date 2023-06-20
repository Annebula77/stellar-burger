import { createSlice } from '@reduxjs/toolkit';
import {
  getUserDetails,
  updateUserDetails,
  logoutApi,
  refreshTokenApi,
  checkUserAuth
} from '../thunks/user-thunks';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    success: false,
    user: null,
    isAuthChecked: false,
    accessToken: '',
    refreshToken: '',
    isLoading: false,
    authError: null,
  },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    endLoading: (state) => {
      state.isLoading = false;
    },
    isAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
      state.authError = null;
    },
    isAuthFailed: (state, action) => {
      state.isAuthChecked = false;
      state.authError = action.payload;
    },
    logoutSuccess: (state) => {
      state.isAuthChecked = false;
      state.user = null;
      state.accessToken = '';
      state.refreshToken = '';
      state.authError = null;
    },
    logoutFailed: (state, action) => {
      state.authError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.success = true;
        state.user = action.payload;
        state.authError = null;
        state.isLoading = false;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.success = false;
        state.user = null;
        state.authError = action.payload;
        state.isLoading = false;
      })
      .addCase(updateUserDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserDetails.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(logoutApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutApi.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(logoutApi.rejected, (state, action) => {
        state.isLoading = false;
        state.authError = action.payload;
      })
      .addCase(refreshTokenApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshTokenApi.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(refreshTokenApi.rejected, (state, action) => {
        state.user = null;
        state.accessToken = '';
        state.refreshToken = '';
        state.isAuthChecked = false;
        state.isLoading = false;
        state.authError = action.payload;
      })
      .addCase(checkUserAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkUserAuth.fulfilled, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  startLoading,
  endLoading,
  isAuthChecked,
  isAuthFailed,
  logoutSuccess,
  logoutFailed,
  getUserDetailsSuccess,
} = userSlice.actions;

export default userSlice.reducer;
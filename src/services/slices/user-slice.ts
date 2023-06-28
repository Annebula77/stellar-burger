import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThunkError, UserSliceType, IsAuthCheckedType, authErrorType, userPayloadType } from '../../utils/essentials';
import {
  getUserDetails,
  updateUserDetails,
  logoutApi,
  refreshTokenApi,
  checkUserAuth
} from '../thunks/user-thunks';


const initialState: UserSliceType = {
  success: false,
  user: null,
  isAuthChecked: false,
  accessToken: '',
  refreshToken: '',
  isLoading: false,
  authError: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    endLoading: (state) => {
      state.isLoading = false;
    },
    isAuthChecked: (state, action: PayloadAction<IsAuthCheckedType>) => {
      state.isAuthChecked = action.payload;
      state.authError = null;
    },
    isAuthFailed: (state, action: PayloadAction<authErrorType>) => {
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
    logoutFailed: (state, action: PayloadAction<authErrorType>) => {
      state.authError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action: PayloadAction<userPayloadType>) => {
        state.success = true;
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(getUserDetails.rejected, (state, action: PayloadAction<ThunkError | undefined>) => {
        state.success = false;
        state.user = null;
        state.authError = action.payload as ThunkError;
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
      .addCase(logoutApi.rejected, (state, action: PayloadAction<ThunkError | undefined>) => {
        state.isLoading = false;
        state.authError = action.payload as ThunkError;
      })
      .addCase(refreshTokenApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshTokenApi.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(refreshTokenApi.rejected, (state, action: PayloadAction<ThunkError | undefined>) => {
        state.user = null;
        state.accessToken = '';
        state.refreshToken = '';
        state.isAuthChecked = false;
        state.isLoading = false;
        state.authError = action.payload as ThunkError;
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
} = userSlice.actions;

export default userSlice.reducer;
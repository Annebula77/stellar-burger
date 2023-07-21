import { createSlice } from "@reduxjs/toolkit";
import { forgotPasswordApi } from "../thunks/forgot-password-thunk";
import { ForgotPasswordState } from '../../utils/essentials'


const initialState: ForgotPasswordState = { status: false };

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotPasswordApi.fulfilled, (state, action) => {
        state.status = true;
      })
      .addCase(forgotPasswordApi.rejected, (state, action) => {
        state.status = false;
      });
  },
});

export default forgotPasswordSlice.reducer;
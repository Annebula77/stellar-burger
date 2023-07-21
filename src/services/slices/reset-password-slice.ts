import { createSlice } from "@reduxjs/toolkit";
import { resetPasswordApi } from "../thunks/reset-password-thunk";
import { resetPasswordState } from '../../utils/essentials';


const initialState: resetPasswordState = { success: false };

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetPasswordApi.fulfilled, (state, action) => {
        state.success = true;
      })
      .addCase(resetPasswordApi.rejected, (state, action) => {
        state.success = false;
      });
  },
});


export default resetPasswordSlice.reducer;
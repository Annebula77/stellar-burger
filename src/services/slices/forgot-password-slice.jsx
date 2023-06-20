import { createSlice } from "@reduxjs/toolkit";
import { forgotPasswordApi } from "../thunks/forgot-password-thunk";

// Слайс
const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState: { status: false },
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

// Экспорт редьюсера
export default forgotPasswordSlice.reducer;
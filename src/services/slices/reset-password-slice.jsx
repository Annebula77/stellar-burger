import { createSlice } from "@reduxjs/toolkit";
import { resetPasswordApi } from "../thunks/reset-password-thunk.jsx";

// Слайс
const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState: { status: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetPasswordApi.fulfilled, (state, action) => {
        state.status = 'success';
      })
      .addCase(resetPasswordApi.rejected, (state, action) => {
        state.status = null;
      });
  },
});

// Экспорт редьюсера
export default resetPasswordSlice.reducer;
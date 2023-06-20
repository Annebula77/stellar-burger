import { createSlice } from "@reduxjs/toolkit";
import { sendOrder } from "../thunks/order-thunk";

// Создаём слайс
const orderSlice = createSlice({
  name: 'order',
  initialState: {
    loadingOrder: false,
    errorOrder: null,
    data: null,
  },
  reducers: {
    clearOrderState: (state) => {
      state.loadingOrder = false;
      state.errorOrder = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.loadingOrder = true;
        state.errorOrder = false;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.loadingOrder = false;
        state.errorOrder = false;
        state.data = action.payload;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.loadingOrder = false;
        state.errorOrder = action.error.message;
      });
  },
});

export const { clearOrderState } = orderSlice.actions;

export default orderSlice.reducer;
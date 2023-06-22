import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sendOrder } from "../thunks/order-thunk";

interface OrderState {
  loadingOrder: boolean;
  errorOrder: null | string;
  data: null | number; 
}

type OrderPayload = number; 

const initialState: OrderState = {
  loadingOrder: false,
  errorOrder: null,
  data: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
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
        state.errorOrder = null;
      })
      .addCase(sendOrder.fulfilled, (state, action: PayloadAction<OrderPayload>) => {
        state.loadingOrder = false;
        state.errorOrder = null;
        state.data = action.payload;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.loadingOrder = false;
        state.errorOrder = action.error.message || null;
      });
  },
});

export const { clearOrderState } = orderSlice.actions;

export default orderSlice.reducer;
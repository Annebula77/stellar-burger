import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { sendOrder } from "../thunks/order-thunk";
import { OrderState, OrderPayload } from '../../utils/essentials';

const initialState: OrderState = {
  loadingOrder: false,
  errorOrder: null,
  data: null,
};

const orderSlice: Slice<OrderState> = createSlice({
  name: 'order',
  initialState,
  reducers: {
    deleteOrderState: (state) => {
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

export const { deleteOrderState } = orderSlice.actions;

export default orderSlice.reducer;
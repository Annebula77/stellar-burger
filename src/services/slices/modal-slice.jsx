import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalType: null,
  modalContent: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalContent: (state, action) => {
      state.modalType = action.payload.modalType;
      state.modalContent = action.payload.modalContent;
    },
    clearModalContent: (state) => {
      state.modalType = null;
      state.modalContent = null;
    },
  },
});

export const { setModalContent, clearModalContent } = modalSlice.actions;

export default modalSlice.reducer;
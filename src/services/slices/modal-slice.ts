import { createSlice, PayloadAction  } from '@reduxjs/toolkit';
import { ModalContent, ModalState } from '../../utils/essentials';


const initialState: ModalState  = {
  modalType: null,
  modalContent: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalContent: (state, action:PayloadAction<{modalType: string, modalContent: ModalContent}>) => {
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

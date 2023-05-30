import {
  SET_MODAL_CONTENT,
  CLEAR_MODAL_CONTENT
} from '../actions/modal-action';


const initialState = {
  modalType: null,
  modalContent: null,
}

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MODAL_CONTENT: {
      return {
        ...state,
        modalType: action.modalType,
        modalContent: action.content,
      };
    }
    case CLEAR_MODAL_CONTENT: {
      return {
        ...state,
        modalType: null,
        modalContent: null,
      };
    }
    default: {
      return state;
    }
  }
};
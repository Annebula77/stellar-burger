export const SET_MODAL_CONTENT = 'SET_MODAL_CONTENT';
export const CLEAR_MODAL_CONTENT = 'CLEAR_MODAL_CONTENT';

export const setModalContent = (modalType, content) => {
  return {
    type: SET_MODAL_CONTENT,
    modalType,
    content,
  };
}

export const clearModalContent = () => {
  return {
    type: CLEAR_MODAL_CONTENT,
  };
}
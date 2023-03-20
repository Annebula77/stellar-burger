import { createPortal } from "react-dom";
import { useEffect } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from 'prop-types';
const modals = document.querySelector('#modals');

function Modal({ onClose, children }) {

  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  const closeModal = () => {
    onClose();
  };

  useEffect(() => {
    const closeByEsc = (evt) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', closeByEsc);
    return () => {
      document.removeEventListener('keydown', closeByEsc);
    }
  }, [onClose])

  return createPortal(
    <ModalOverlay onClick={closeModal}>
      <div className={styles.modal} onClick={handleModalClick}>
        <button className={styles.icon__x} onClick={closeModal}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </ModalOverlay>,
    modals
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Modal;
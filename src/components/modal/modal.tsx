import { createPortal } from 'react-dom';
import { useEffect, ReactNode, FC, MouseEvent } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
const modals = document.querySelector('#modals');

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ onClose, children }) => {

  const handleModalClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  const closeModal = () => {
    onClose();
  };

  useEffect(() => {
    const closeByEsc = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', closeByEsc);
    return () => {
      document.removeEventListener('keydown', closeByEsc);
    }
  }, [onClose])

  return modals ? createPortal(
    <ModalOverlay onClick={closeModal}>
      <div className={styles.modal} onClick={handleModalClick}>
        <button className={styles.icon__x} onClick={closeModal}>
          <CloseIcon type='primary' />
        </button>
        {children}
      </div>
    </ModalOverlay>,
    modals
  ) : null;
}


export default Modal;
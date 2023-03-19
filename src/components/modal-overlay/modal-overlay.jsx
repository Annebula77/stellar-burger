import styles from './modal-overlay.module.css'
import PropTypes from 'prop-types';

function ModalOverlay({ children, onClick }) {
  return <div className={styles.modalOverlay} onClick={onClick}>
    {children}
  </div>;
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default ModalOverlay;
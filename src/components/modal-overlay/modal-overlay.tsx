import styles from './modal-overlay.module.css';
import React, { ReactNode } from 'react';


interface ModalOverlayProps {
  children: ReactNode;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

function ModalOverlay({ children, onClick }: ModalOverlayProps) {
  return <div className={styles.overlay} onClick={onClick}>
    {children}
  </div>;
}

export default ModalOverlay;
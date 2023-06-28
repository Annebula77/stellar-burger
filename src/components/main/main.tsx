import React, { ReactNode } from 'react';
import styles from './main.module.css'

interface MainProps {
  children: ReactNode;
}

const Main: React.FC<MainProps> = (props) => {
  return (
    <main className={styles.main}>
      {props.children}
    </main>
  )
}

export default Main;
import styles from './tabs.module.css';
import { useState, forwardRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';


const Tabs = forwardRef((props, ref) => {
  const [current, setCurrent] = useState('bun');

  const onTabClick = (ref) => {
    ref?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  return (
    <div ref={ref} className={styles.tabs}>
      <Tab
        value="bun"
        active={current === 'bun'}
        onClick={() => {
          setCurrent('bun');
          onTabClick(props.bunRef);
        }}
      >
        Булки
      </Tab>
      <Tab
        value="sauce"
        active={current === 'sauce'}
        onClick={() => {
          setCurrent('sauce');
          onTabClick(props.sauceRef);
        }}
      >
        Соусы
      </Tab>
      <Tab
        value="main"
        active={current === 'main'}
        onClick={() => {
          setCurrent('main');
          onTabClick(props.mainRef);
        }}
      >
        Начинки
      </Tab>
    </div>
  );
});

export default Tabs;
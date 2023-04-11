import styles from './tabs.module.css';
import { forwardRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';


const Tabs = forwardRef((props, ref) => {

  const onTabClick = (state, element) => {
    element.current.scrollIntoView({
      behavior: 'smooth'
    });
  };


  return (
    <div ref={ref} className={styles.tabs} onScroll={props.handleScroll}>
      <Tab
        value="bun"
        active={props.current === 'bun'}
        onClick={(e) => { onTabClick(e, props.bunsRef) }}

      >
        Булки
      </Tab>
      <Tab
        value="sauce"
        active={props.current === 'sauce'}
        onClick={(e) => { onTabClick(e, props.sauceRef) }}


      >
        Соусы
      </Tab>
      <Tab
        value="main"
        active={props.current === 'main'}
        onClick={(e) => { onTabClick(e, props.mainRef) }}


      >
        Начинки
      </Tab>
    </div>
  );
});

export default Tabs;
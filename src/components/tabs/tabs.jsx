import styles from './tabs.module.css';
import { forwardRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';


const Tabs = forwardRef((props, ref) => {


  const onTabClick = (ref) => {
    const container = ref.current.parentNode;
    const categoryTop = ref.current.offsetTop;
    const containerTop = container.getBoundingClientRect().top;
    const offsetTop = categoryTop - containerTop - container.scrollTop;

    container.scroll({
      behavior: 'smooth',
      top: container.scrollTop + offsetTop
    });
  };

  return (
    <div ref={ref} className={styles.tabs} onScroll={props.handleScroll}>
      <Tab
        value="bun"
        active={props.current === 'bun'}
        onClick={() => {
          if (props.bunRef.current) {
            onTabClick(props.bunRef);
          }
        }}
      >
        Булки
      </Tab>
      <Tab
        value="sauce"
        active={props.current === 'sauce'}
        onClick={() => {
          if (props.sauceRef.current) {
            onTabClick(props.sauceRef);
          }
        }}
      >
        Соусы
      </Tab>
      <Tab
        value="main"
        active={props.current === 'main'}
        onClick={() => {
          if (props.mainRef.current) {
            onTabClick(props.mainRef);
          }
        }}
      >
        Начинки
      </Tab>
    </div>
  );
});

export default Tabs;
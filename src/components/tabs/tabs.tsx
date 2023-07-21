import styles from './tabs.module.css';
import { Ref, forwardRef, ForwardedRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { TabItems } from '../../utils/essentials';

interface TabsProps {
  current: string;
  bunRef: Ref<HTMLDivElement>;
  sauceRef: Ref<HTMLDivElement>;
  mainRef: Ref<HTMLDivElement>;
}


const Tabs = forwardRef<HTMLDivElement, TabsProps>((props, ref) => {


  const onTabClick = (ref: ForwardedRef<HTMLDivElement>) => {
    if (ref && typeof ref !== 'function' && ref.current) {
      const container = ref.current.parentNode as HTMLElement;
      if (container) {
        const categoryTop = ref.current.offsetTop;
        const containerTop = container.getBoundingClientRect().top;
        const offsetTop = categoryTop - containerTop - container.scrollTop;

        container.scroll({
          behavior: 'smooth',
          top: container.scrollTop + offsetTop
        });
      }
    }
  };
  return (
    <div ref={ref} className={styles.tabs}>
      <Tab
        value={TabItems.BUN}
        active={props.current === 'bun'}
        onClick={() => {
          if (typeof props.bunRef !== 'function' && props.bunRef?.current) {
            onTabClick(props.bunRef);
          }
        }}
      >
        Булки
      </Tab>
      <Tab
        value={TabItems.SAUCE}
        active={props.current === 'sauce'}
        onClick={() => {
          if (typeof props.sauceRef !== 'function' && props.sauceRef?.current) {
            onTabClick(props.sauceRef);
          }
        }}
      >
        Соусы
      </Tab>
      <Tab
        value={TabItems.MAIN}
        active={props.current === 'main'}
        onClick={() => {
          if (typeof props.mainRef !== 'function' && props.mainRef?.current) {
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
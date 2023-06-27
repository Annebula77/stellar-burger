import styles from './tabs.module.css';
import { forwardRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { TabItems } from '../../utils/essentials'
import PropTypes from 'prop-types';


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
    <div ref={ref} className={styles.tabs}>
      <Tab
        value={TabItems.BUN}
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
        value={TabItems.SAUCE}
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
        value={TabItems.MAIN}
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

Tabs.propTypes = {
  current: PropTypes.string.isRequired,
  bunRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  sauceRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  mainRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
};

Tabs.defaultProps = {
  bunRef: null,
  sauceRef: null,
  mainRef: null,
};

export default Tabs;
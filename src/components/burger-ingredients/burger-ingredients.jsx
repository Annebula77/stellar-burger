import styles from './burger-ingredients.module.css';
import Tabs from '../tabs/tabs';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { TabItems } from '../../utils/consts';




const BurgerIngredients = () => {
  const ingredientList = useSelector((state) => state.ingredients);
  const containerRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  const [current, setCurrent] = useState(TabItems.BUN);


  const buns = ingredientList.ingredients.filter((item) => item.type === 'bun');
  const sauce = ingredientList.ingredients.filter((item) => item.type === 'sauce');
  const main = ingredientList.ingredients.filter((item) => item.type === 'main');

  const handleScroll = () => {
    if (containerRef.current.getBoundingClientRect().top > bunRef.current.getBoundingClientRect().top) {
      setCurrent(TabItems.BUN);
    }
    if (containerRef.current.getBoundingClientRect().top > sauceRef.current.getBoundingClientRect().top) {
      setCurrent(TabItems.SAUCE);
    }
    if (containerRef.current.getBoundingClientRect().top > mainRef.current.getBoundingClientRect().top) {
      setCurrent(TabItems.MAIN);
    }
  };

  return (
    <section className={styles.section}>
      <h2 className={`text text_type_main-large ${styles.title}`}>Собери бургер</h2>
      <Tabs bunRef={bunRef} sauceRef={sauceRef} mainRef={mainRef} current={current} />
      <section className={styles.container} ref={containerRef} onScroll={handleScroll} >
        <IngredientsCategory title='Булки' data={buns} ref={bunRef} />
        <IngredientsCategory title='Соусы' data={sauce} ref={sauceRef} />
        <IngredientsCategory title='Начинки' data={main} ref={mainRef} />
      </section>

    </section>
  );
};

export default BurgerIngredients;
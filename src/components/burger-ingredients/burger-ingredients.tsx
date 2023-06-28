import styles from './burger-ingredients.module.css';
import Tabs from '../tabs/tabs';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import { useState, useRef } from 'react';
import { useAppSelector } from '../../utils/hooks';
import { TabItems, IngredientListType } from '../../utils/essentials';




const BurgerIngredients = () => {
  const ingredientList: IngredientListType = useAppSelector((state) => state.ingredients);
  const containerRef = useRef<HTMLDivElement>(null);
  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(TabItems.BUN);


  const buns = ingredientList.ingredients.filter((item) => item.type === 'bun');
  const sauce = ingredientList.ingredients.filter((item) => item.type === 'sauce');
  const main = ingredientList.ingredients.filter((item) => item.type === 'main');

  const handleScroll = () => {
    if (containerRef.current && bunRef.current && containerRef.current.getBoundingClientRect().top > bunRef.current.getBoundingClientRect().top) {
      setCurrent(TabItems.BUN);
    }
    if (containerRef.current && sauceRef.current && containerRef.current.getBoundingClientRect().top > sauceRef.current.getBoundingClientRect().top) {
      setCurrent(TabItems.SAUCE);
    }
    if (containerRef.current && mainRef.current && containerRef.current.getBoundingClientRect().top > mainRef.current.getBoundingClientRect().top) {
      setCurrent(TabItems.MAIN);
    }
  };

  return (
    <section className={styles.section}>
      <h2 className={`text text_type_main-large ${styles.title}`}>Собери бургер</h2>
      <Tabs bunRef={bunRef} sauceRef={sauceRef} mainRef={mainRef} current={current} />
      <section className={styles.container} ref={containerRef} onScroll={handleScroll} >
        <IngredientsCategory title ='Булки' data={buns} ref={bunRef} />
        <IngredientsCategory title='Соусы' data={sauce} ref={sauceRef} />
        <IngredientsCategory title='Начинки' data={main} ref={mainRef} />
      </section>

    </section>
  );
};

export default BurgerIngredients;
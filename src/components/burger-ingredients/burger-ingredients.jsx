import React, { useMemo } from 'react';
import styles from './burger-ingredients.module.css';
import Tabs from '../tabs/tabs';
import IngredientsCategory from '../ingredients-category/ingredients-category';



function BurgerIngredients({ ingredientsData }) {

  const buns = useMemo(() => ingredientsData.filter((ingredient) => ingredient.type === 'bun'), [ingredientsData]);
  const mains = useMemo(() => ingredientsData.filter((ingredient) => ingredient.type === 'main'), [ingredientsData]);
  const sauces = useMemo(() => ingredientsData.filter((ingredient) => ingredient.type === 'sauce'), [ingredientsData]);


  return (
    <section className={styles.section}>
      <h1 className={`text text_type_main-large ${styles.title}`}>Собери бургер</h1>
      <Tabs />
      <section className={styles.container}>
        <IngredientsCategory title='Булки' ingredients={buns} />
        <IngredientsCategory title='Соусы' ingredients={sauces} />
        <IngredientsCategory title='Начинки' ingredients={mains} />
      </section>
    </section>
  );
}




export default BurgerIngredients;
import React, { useMemo } from 'react';
import styles from './burger-ingredients.module.css';
import Tabs from '../tabs/tabs';
import Ingredient from '../ingredient/ingredient';
import { ingredientsData } from '../../utils/ingredients-data';
import { ingredientType } from '../../utils/prop-types';
import PropTypes from 'prop-types';



function IngredientsCategory({ title, ingredients }) {
  return (
    <>
      <h2 className='text_type_main-medium mt-10'>{title}</h2>
      <ul className={styles.ingredient_box}>
        {ingredients.map(ingredient => (
          <Ingredient key={ingredient._id} {...ingredient} />
        ))}
      </ul>
    </>
  );
}

function BurgerIngredients() {
  const buns = useMemo(() => ingredientsData.filter((ingredient) => ingredient.type === 'bun'), [ingredientsData]); // eslint-disable-line 
  const mains = useMemo(() => ingredientsData.filter((ingredient) => ingredient.type === 'main'), [ingredientsData]); // eslint-disable-line 
  const sauces = useMemo(() => ingredientsData.filter((ingredient) => ingredient.type === 'sauce'), [ingredientsData]); // eslint-disable-line 

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

IngredientsCategory.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientType).isRequired
};


export default BurgerIngredients;
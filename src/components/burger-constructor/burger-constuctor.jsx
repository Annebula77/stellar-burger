import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useMemo } from 'react';
import styles from './burger-constructor.module.css';
import { ingredientsData } from '../../utils/ingredients-data';

function BurgerConstructor() {

  const { bun, ingredients } = useMemo(() => {
    return {
      bun: ingredientsData.find(ingredient => ingredient.type === 'bun'),
      ingredients: ingredientsData.filter(ingredient => ingredient.type !== 'bun'),
    };
  }, [ingredientsData]); // eslint-disable-line

  const ingredientsList = useMemo(() => {
    return ingredients.map((ingredient) => {
      return (
        <li key={ingredient._id} className={styles.ingredient}>
          <DragIcon type="primary" />
          <ConstructorElement text={ingredient.name} price={ingredient.price} thumbnail={ingredient.image} />
        </li>
      );
    });
  }, [ingredients]);

  return (
    <section className={styles.section}>
      <ul className={styles.container}>
        <li className={styles.ingredient}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </li>
        <ul className={styles.ingredients}>
          {ingredientsList}
        </ul>
        <li className='styles.ingredient'>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </li>
      </ul>

      <div className={styles.order}>
        <div className={styles.price}>
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor
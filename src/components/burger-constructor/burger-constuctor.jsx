import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './burger-constructor.module.css';
import { ingredientsData } from '../../utils/data';

function BurgerConstructor() {
  return (
    <section className={styles.section}>
      <ul className={styles.container}>
        <li className={styles.ingredient}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${ingredientsData[0].name} (верх)`}
            price={ingredientsData[0].price}
            thumbnail={ingredientsData[0].image}
          />
        </li>
        <ul className={styles.ingredients}>
          {ingredientsData.map((item) => {
            if (item.type !== 'bun') {
              return (
                <li key={item._id} className={styles.ingredient}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                  />
                </li>
              )
            }
          })}
        </ul>
        <li className='styles.ingredient'>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${ingredientsData[0].name} (низ)`}
            price={ingredientsData[0].price}
            thumbnail={ingredientsData[0].image}
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

  )
}

export default BurgerConstructor
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { ingredientType } from '../../utils/prop-types';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';



function BurgerConstructor({ ingredientsData }) {

  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);


  if (!ingredientsData) return <>Загрузка...</>;

  const bun = ingredientsData.find(ingredient => ingredient.type === 'bun');
  const ingredients = ingredientsData.filter(ingredient => ingredient.type !== 'bun');

  return (
    <section className={styles.section}>
      <ul className={styles.container}>
        <li className={styles.ingredient}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`top-${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </li>
        <ul className={styles.ingredients}>
          {ingredients.map((ingredient) => {
            return (
              <li key={ingredient._id} className={styles.ingredient}>
                <DragIcon type="primary" />
                <ConstructorElement text={ingredient.name} price={ingredient.price} thumbnail={ingredient.image} />
              </li>
            )
          })
          }
        </ul>
        <li className='styles.ingredient'>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`bottom-${bun.name} (низ)`}
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
        <Button htmlType="button" type="primary" size="large" onClick={openModal}>
          Оформить заказ
        </Button>
      </div>
      {showModal && (
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}

BurgerConstructor.propTypes = {
  ingredientsData: PropTypes.arrayOf(ingredientType).isRequired,
};
export default BurgerConstructor
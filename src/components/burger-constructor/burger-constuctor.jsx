import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect, useMemo } from 'react';
import { postData } from '../../utils/api';
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useSelector, useDispatch } from 'react-redux';
import { sendOrder } from '../../services/actions/order-actions';


function BurgerConstructor() {
  const burgerIngredientsData = useSelector((state) => state.ingredients.ingredients);
  const orderNumber = useSelector((state) => state.order.data);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);


  const bun = burgerIngredientsData.find(ingredient => ingredient.type === 'bun');
  const bunId = bun._id;

  const ingredients = burgerIngredientsData.filter(ingredient => ingredient.type !== 'bun');

  const ingredientsDataId = useMemo(() => {
    const idArray = [bunId];
    ingredients.forEach((ingredient) => {
      idArray.push(ingredient._id);
    });
    idArray.push(bunId);
    return idArray;
  }, [bunId, ingredients]);

  const [totalPrice, setTotalPrice] = useState(bun.price * 2);

  useEffect(() => {
    let ingredientPrice = 0;
    burgerIngredientsData.forEach((ingredient) => {
      ingredientPrice += ingredient.price;
    });
    setTotalPrice(ingredientPrice);
  }, [burgerIngredientsData]);

  useEffect(() => {
    dispatch(sendOrder(ingredientsDataId));
  }, [dispatch]);


  if (!burgerIngredientsData) return <>Загрузка...</>;

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
        <li className={styles.ingredient}>
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
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={openModal}>
          Оформить заказ
        </Button>
      </div>
      {showModal && (
        <Modal onClose={closeModal}>
          <OrderDetails orderNumber={orderNumber.order.number} />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;
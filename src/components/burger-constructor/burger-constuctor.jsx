import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useContext, useEffect, useMemo } from 'react';
import { postData } from '../../utils/api';
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import ingredientStorage from '../../utils/ingredient-storage';


function BurgerConstructor() {
  const burgerIngredientsData = useContext(ingredientStorage);

  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const [orderNumber, setOrderNumber] = useState(null);
  const [hasError, setHasError] = useState(false);

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
    const postIngredientsData = async () => {
      try {
        const data = await postData(ingredientsDataId);
        setOrderNumber(data.order.number);
        console.log(data)
        setHasError(false);
      } catch (e) {
        setHasError(true);
      }
    }

    postIngredientsData();
  }, []);


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
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;
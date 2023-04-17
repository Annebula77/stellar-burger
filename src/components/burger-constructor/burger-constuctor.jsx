import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect, useMemo } from 'react';
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useSelector, useDispatch } from 'react-redux';
import { postOrderClear, sendOrder } from '../../services/actions/order-actions';
import { addIngridientItem, addBunItem, clearContainer } from '../../services/actions/burger-constructor-action';
import { useDrop } from "react-dnd";
import ConstructorEl from '../сonstructor-element/constructor-element';


function BurgerConstructor() {
  const { bun, ingredients } = useSelector((state) => state.burgerOrderList);
  const orderNumber = useSelector((state) => state.order.data);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const [totalPrice, setTotalPrice] = useState(null);


  const fillings = useMemo(
    () => ingredients.filter((item) => item.type !== "bun"),
    [ingredients]
  );



  const [, dropTarget] = useDrop({
    accept: 'ingredients',
    drop(item) {
      if (item.ingredient.type === "bun") {
        dispatch(addBunItem(item.ingredient));
      } else {
        dispatch(addIngridientItem(item.ingredient));
      }
    },
  });





  useEffect(() => {
    const sum = fillings.reduce(
      (current, total) => current + total.price,
      bun === null || bun.price === undefined ? 0 : bun.price * 2
    );
    setTotalPrice(sum);
  }, [bun, fillings]);


  const openModal = () => {
    const ingredientIds = fillings.map((item) => item._id); // получаем ID всех ингредиентов
    const bunId = bun ? [bun._id] : []; // если есть булка, добавляем её ID в массив
    const orderItems = [...bunId, ...ingredientIds]; // объединяем массивы

    dispatch(sendOrder(orderItems)); // передаем массив в функцию sendOrder
    setShowModal(true)
  };

  const closeModal = () => {
    dispatch(postOrderClear());
    dispatch(clearContainer());
    setShowModal(false)
  };
  return (
    <section className={styles.section} ref={dropTarget}>
      {bun || ingredients.length > 0 ? (
        <ul className={styles.container}>
          {bun && (
            <li className={styles.ingredient}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`top-${bun.name} (верх)`}
                price={`${bun.price}`}
                thumbnail={`${bun.image}`}
              />
            </li>
          )}
          <ul className={styles.ingredients}>
            {ingredients.length > 0 ? (
              ingredients.map((item, index) => (
                <li className={styles.ingredient} key={item.key}>
                  <ConstructorEl item={item} index={index} />
                </li>
              ))
            ) : (
              <div
                className={`${styles.empty_ingredients} text text_type_main-medium text_color_inactive`}
              >
                Молодец! А теперь добавь сюда начинки, и будет тебе вкуснее 😋
              </div>)}
          </ul>
          {bun && (
            <li className={styles.ingredient}>
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`bottom-${bun.name} (низ)`}
                price={`${bun.price}`}
                thumbnail={`${bun.image}`}
              />
            </li>
          )}
        </ul>
      ) : (
        <div
          className={`${styles.empty_container} text text_type_main-large `}
        >
          Не дадим умереть тебе с голоду!😎 &nbsp;
          Скорей тащи сюда ⬇⬇⬇ булочки и начинки! 🍔
        </div>
      )}
      <div className={styles.order}>
        <div className={styles.price}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={() => { openModal() }}>
          Оформить заказ
        </Button>
      </div>
      {
        showModal && (
          <Modal onClose={closeModal}>
            <OrderDetails orderNumber={orderNumber && orderNumber.order && orderNumber.order.number} />
          </Modal>
        )
      }
    </section>
  )
}

export default BurgerConstructor;
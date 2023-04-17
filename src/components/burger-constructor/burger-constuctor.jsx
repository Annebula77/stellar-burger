import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect, useMemo } from 'react';
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useSelector, useDispatch } from 'react-redux';
import { sendOrder } from '../../services/actions/order-actions';
import { addIngridientItem, addBunItem } from '../../services/actions/burger-constructor-action';
import { useDrop } from "react-dnd";
import ConstructorEl from '../сonstructor-element/constructor-element';


function BurgerConstructor() {
  const { bun, ingredients } = useSelector((state) => state.burgerOrderList);
  const orderNumber = useSelector((state) => state.order.data);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const [totalPrice, setTotalPrice] = useState(null);
  const [idArray, setIdArray] = useState([]);


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
        setIdArray(prevArray => [...prevArray, item.ingredient._id]);
      }

    },
  });

  console.log('idList >>', idArray);



  useEffect(() => {
    const sum = fillings.reduce(
      (current, total) => current + total.price,
      bun === null || bun.price === undefined ? 0 : bun.price * 2
    );
    setTotalPrice(sum);
  }, [bun, fillings]);

  useEffect(() => {
    if (!bun) {
      return
    };
    dispatch(sendOrder(idArray));
  }, [dispatch]);


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
            ) : null}
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
      ) : null}
      <div className={styles.order}>
        <div className={styles.price}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={openModal}>
          Оформить заказ
        </Button>
      </div>
      {
        showModal && (
          <Modal onClose={closeModal}>
            <OrderDetails orderNumber={orderNumber.order.number} />
          </Modal>
        )
      }
    </section>
  )
}

export default BurgerConstructor;
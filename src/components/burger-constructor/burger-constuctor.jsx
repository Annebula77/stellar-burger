import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect, useCallback } from 'react';
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useSelector, useDispatch } from 'react-redux';
import { postOrderClear, sendOrder } from '../../services/actions/order-actions';
import { addIngridientItem, addBunItem, clearContainer } from '../../services/actions/burger-constructor-action';
import { useDrop } from 'react-dnd';
import { setModalContent, clearModalContent } from '../../services/actions/modal-action';
import ConstructorEl from '../сonstructor-element/constructor-element';
import { useLocation, useNavigate } from 'react-router-dom';



function BurgerConstructor() {
  const { bun, ingredients } = useSelector((state) => state.burgerOrderList);
  const orderNumber = useSelector((state) => state.order.data);
  const dispatch = useDispatch();
  const modalContent = useSelector((state) => state.modal.modalContent);
  const [totalPrice, setTotalPrice] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthChecked);



  const [, dropTarget] = useDrop({
    accept: 'ingredients',
    drop(item) {
      if (item.ingredient.type === 'bun') {
        dispatch(addBunItem(item.ingredient));
      } else {
        dispatch(addIngridientItem(item.ingredient));
      }
    },
  });


  useEffect(() => {
    const sum = ingredients.reduce(
      (current, total) => current + total.price,
      bun === null || bun.price === undefined ? 0 : bun.price * 2
    );
    setTotalPrice(sum);
  }, [bun, ingredients]);



  const openModal = useCallback(() => {
    if (isAuthenticated) {
      const ingredientIds = ingredients.map((item) => item._id);
      const bunId = bun._id;
      const orderItems = [bunId, ...ingredientIds, bunId];
      dispatch(sendOrder(orderItems));
      dispatch(setModalContent('orderDetails', <OrderDetails orderNumber={orderNumber} />))
    } else {
      navigate('/login', {
        replace: true,
        state: { from: location.pathname }
      });
    }
  });

  const closeModal = useCallback(() => {
    dispatch(postOrderClear());
    dispatch(clearContainer());
    dispatch(clearModalContent());
  });

  useEffect(() => {
    if (orderNumber) {
      dispatch(setModalContent('orderDetails', <OrderDetails orderNumber={orderNumber.order.number} />));
    }
  }, [orderNumber]);

  return (
    <section className={styles.section} ref={dropTarget}>
      {bun || ingredients.length > 0 ? (
        <ul className={styles.container}>
          {bun && (
            <li className={styles.ingredient}>
              <ConstructorElement
                type='top'
                isLocked={true}
                text={`${bun.name} (верх)`}
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
                type='bottom'
                isLocked={true}
                text={`${bun.name} (низ)`}
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
          Cоберем похожий?
        </div>
      )}
      <div className={styles.order}>
        <div className={styles.price}>
          <p className='text text_type_digits-medium'>{totalPrice}</p>
          <CurrencyIcon type='primary' />
        </div>
        <Button htmlType='button' type='primary' size='large' onClick={() => { openModal() }}>
          Оформить заказ
        </Button>
      </div>
      {
        modalContent && (
          <Modal onClose={closeModal}>
            {modalContent}
          </Modal>
        )
      }
    </section>
  )
}

export default BurgerConstructor;
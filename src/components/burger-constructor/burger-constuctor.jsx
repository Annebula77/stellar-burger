import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect, useCallback } from 'react';
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useSelector, useDispatch } from 'react-redux';
import { sendOrder } from '../../services/thunks/order-thunk';
import { clearOrderState } from '../../services/slices/order-slice';
import { addIngredientItem, addBunItem, clearContainer } from '../../services/slices/burger-constructor-slice';
import { useDrop } from 'react-dnd';
import { clearModalContent } from '../../services/slices/modal-slice';
import ConstructorEl from '../сonstructor-element/constructor-element';
import { useLocation, useNavigate } from 'react-router-dom';



function BurgerConstructor() {
  const { bun, ingredients } = useSelector((state) => state.burgerOrderList);
  const { modalType, modalContent } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
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
        dispatch(addIngredientItem(item.ingredient));
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
    } else {
      navigate('/login', {
        replace: true,
        state: { from: location.pathname }
      });
    }
  });

  const closeModal = useCallback(() => {
    dispatch(clearOrderState());
    dispatch(clearContainer());
    dispatch(clearModalContent());
  });


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
            {modalType === 'orderDetails' && <OrderDetails orderNumber={modalContent} />}
          </Modal>
        )
      }
    </section>
  )
}

export default BurgerConstructor;
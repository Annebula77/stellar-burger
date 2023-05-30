import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { formatDate } from '../../utils/consts';
import OrderImage from '../order-image/order-image';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './user-order-shield.module.css';
import { useNavigate, useMatch, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserOrderShield = ({ order }) => {
  const ingredientList = useSelector((state) => state.ingredients.ingredients);
  const navigate = useNavigate();
  const location = useLocation();
  const match = useMatch('/feed/:id');
  const { id } = match?.params || {};

  let totalPrice = 0;

  const ingredients = order.ingredients;
  const ingredientCounts = {};

  ingredients.forEach((ingredientId) => {
    if (ingredientCounts[ingredientId]) {
      ingredientCounts[ingredientId]++;
    } else {
      ingredientCounts[ingredientId] = 1;
    }
  });

  const ingredientsMarkup = useMemo(() => {
    return Object.entries(ingredientCounts).map(([ingredientId, count]) => {
      const ingredient = ingredientList.find((item) => item._id === ingredientId);
      if (!ingredient) return null;

      totalPrice += ingredient.price * count;

      return (
        <OrderImage
          key={ingredientId}
          alt={ingredient.name}
          image={ingredient.image}
          count={count > 1 ? `+${count}` : ''}
        />
      );
    })
  })
  let statusText = '';
  let statusStyle = '';

  if (order.status === 'done') {
    statusText = 'Выполнен';
    statusStyle = styles.done;
  } else if (order.status === 'pending') {
    statusText = 'Готовится';
    statusStyle = styles.pending;
  } else if (order.status === 'created') {
    statusText = 'Создан';
    statusStyle = styles.created;
  }
  const handleClick = () => {
    if (id !== order._id) {
      navigate(`/orders/${order._id}`, { state: { modal: true, background: location } });
    }
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.upper__box}>
        <p className="text text_type_digits-default">{`#${order.number}`}</p>
        <p className="text text_type_main-small text_color_inactive">{formatDate(order.updatedAt)}</p>
      </div>
      <p className={`text text_type_main-small mb-2 mt-2 ${statusStyle}`}>{statusText}</p>
      <h2 className="text text_type_main-medium mb-6 mt-2">{order.name}</h2>
      <div className={styles.ingredients__container}>
        <div className={styles.image__container}>
          {ingredientsMarkup}
        </div>
        <div className={styles.price__container}>
          <p className={`${styles.price} text text_type_digits-default`}>{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

UserOrderShield.propTypes = {
  order: PropTypes.object.isRequired,
};

export default UserOrderShield;
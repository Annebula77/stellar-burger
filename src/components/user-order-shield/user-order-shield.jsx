import React from 'react';
import { useAppSelector } from '../../utils/hooks';
import { useMemo } from 'react';
import { formatDate } from '../../utils/consts';
import OrderImage from '../order-image/order-image';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './user-order-shield.module.css';
import { useNavigate, useMatch, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserOrderShield = React.memo(({ order }) => {
  const ingredientList = useAppSelector((state) => state.ingredients.ingredients);
  const navigate = useNavigate();
  const location = useLocation();
  const match = useMatch('/feed/:id');
  const { id } = match?.params || {};

  const ingredients = order.ingredients;

  const MAX_DISPLAYED_INGREDIENTS = 6;

  const totalPrice = useMemo(() => {
    return ingredients.reduce((sum, ingredientId) => {
      const ingredient = ingredientList.find((item) => item._id === ingredientId);
      return ingredient ? sum + ingredient.price : sum;
    }, 0);
  }, [ingredients, ingredientList]);

  const ingredientsMarkup = useMemo(() => {
    let remainingIngredientsCount = 0;

    const ingredientsToDisplay = ingredients.slice(-MAX_DISPLAYED_INGREDIENTS);

    if (ingredients.length > MAX_DISPLAYED_INGREDIENTS) {
      remainingIngredientsCount = ingredients.length - MAX_DISPLAYED_INGREDIENTS;
    }

    return ingredientsToDisplay.map((ingredientId, index) => {
      const ingredient = ingredientList.find((item) => item._id === ingredientId);
      if (!ingredient) return null;

      let extraCount = "";
      let extraCountClass = "";
      let applyExtraStyles = false;

      if (remainingIngredientsCount > 0 && index === MAX_DISPLAYED_INGREDIENTS - 6) {
        extraCount = `+${remainingIngredientsCount}`;
        extraCountClass = styles.extraCount;
        applyExtraStyles = true;
      }


      return (
        <OrderImage
          key={index}
          alt={ingredient.name}
          image={ingredient.image}
          count={extraCount}
          extraCountClass={extraCountClass}
          applyExtraStyles={applyExtraStyles}
        />
      );
    });
  }, [ingredients, ingredientList]);

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
});

UserOrderShield.propTypes = {
  order: PropTypes.object.isRequired,
};

export default UserOrderShield;
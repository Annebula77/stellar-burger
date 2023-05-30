import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { formatDate } from '../../utils/consts';
import OrderImage from '../order-image/order-image';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-explication.module.css';

const OrderExplication = ({ order }) => {
  const ingredientList = useSelector((state) => state.ingredients.ingredients);

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
        <li key={ingredientId} className={styles.ingredient__container}>
          <OrderImage
            alt={ingredient.name}
            image={ingredient.image}
            count={count > 1 ? `+${count}` : ''}
            extraCountClass={styles.explicit}
          />
          <span className={`${styles.name} text text_type_main-small`}>{ingredient.name}</span>
          <span className={`${styles.price} text text_type_digits-default`}>{`${count} x ${ingredient.price}`} <CurrencyIcon type="primary" /> </span>
        </li>
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

  return (
    <div className={styles.container}>
      <div className={styles.upper__box}>
        <p className="text text_type_digits-default mb-15">{`#${order.number}`}</p>
      </div>
      <h2 className="text text_type_main-medium mb-6 mt-2">{order.name}</h2>
      <p className={`text text_type_main-small mb-15 ${statusStyle}`}>{statusText}</p>
      <h3 className="text text_type_main-medium mb-6">Состав: </h3>
      <div className={styles.ingredients__container}>
        <div className={styles.image__container}>
          {ingredientsMarkup}
        </div>
      </div>
      <div className={styles.price__container}>
        <p className="text text_type_main-small text_color_inactive">{formatDate(order.updatedAt)}</p>
        <p className={`${styles.price} text text_type_digits-default`}>{totalPrice}
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </div>
  );
};

export default OrderExplication;
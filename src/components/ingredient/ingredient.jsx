import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientType } from '../../utils/prop-types';
import styles from './ingredient.module.css';
import { useDrag } from 'react-dnd';
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useMatch } from 'react-router-dom';
import PropTypes from 'prop-types';


function Ingredient({ ingredient, onClick }) {
  const navigation = useNavigate();
  const match = useMatch('/ingredients/:id');
  const { id } = match?.params || {};
  const { _id, image, price, name } = ingredient;
  const { bun, ingredients } = useSelector((state) => state.burgerOrderList);

  const [{ opacity }, dragRef] = useDrag({
    type: 'ingredients',
    item: { ingredient },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.2 : 1,
    }),
  });

  const counter = useMemo(() => {
    let count = 0;
    for (let { _id } of ingredients) if (_id === ingredient._id) count++;
    if (bun && bun._id === ingredient._id) count += 2;
    return count;
  }, [bun, ingredient._id, ingredients]);

  return (
    <li className={styles.element} onClick={() => {
      if (id !== ingredient._id) {
        navigation(`/ingredients/${ingredient._id}`);
        onClick();
      }
    }} style={{ opacity }} ref={dragRef}>
      {counter > 0 && <Counter count={counter} size="default" extraClass="m-1" />}
      <img className={styles.image} src={image} alt={name} />
      <div className={styles.price}>
        <p className='text text_type_digits-default mt-1 mb-1'>{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default pb-8 ${styles.title}`}>{name}</p>
    </li>
  )
}

Ingredient.propTypes = {
  ingredient: ingredientType,
  onClick: PropTypes.func,
};

export default Ingredient;
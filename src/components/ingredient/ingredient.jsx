import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientType } from '../../utils/prop-types';
import styles from './ingredient.module.css';




function Ingredient({ ingredient, onClick }) {
  const { _id, image, price, name } = ingredient;

  return (
    <li className={styles.element} key={_id} onClick={onClick}>
      <Counter count={1} size="default" extraClass="m-1" />
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
  ingredient: ingredientType
};
export default Ingredient;
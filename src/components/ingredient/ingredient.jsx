import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.css';
import { cardProp } from '../../utils/prop-types';

function Ingredient(props) {
  return (
    <li className={styles.element} key={props._id}>
      <Counter count={1} size="default" extraClass="m-1" />
      <img className={styles.image} src={props.image} alt={props.name} />
      <div className={styles.price}>
        <p className='text text_type_digits-default mt-1 mb-1'>{props.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default pb-8 ${styles.title}`}>{props.name}</p>
    </li>
  )
}

Ingredient.propTypes = {
  image: cardProp,
  name: cardProp,
  price: cardProp
};

export default Ingredient;
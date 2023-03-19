import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { ingredientType } from '../../utils/prop-types';
import styles from './ingredient.module.css';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';




function Ingredient({ ingredient }) {

  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const { _id, image, price, name } = ingredient;

  return (
    <li className={styles.element} key={_id} onClick={showModal ? undefined : openModal}>
      <Counter count={1} size="default" extraClass="m-1" />
      <img className={styles.image} src={image} alt={name} />
      <div className={styles.price}>
        <p className='text text_type_digits-default mt-1 mb-1'>{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default pb-8 ${styles.title}`}>{name}</p>
      {showModal && (
        <Modal onClose={closeModal}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </li>
  )
}

Ingredient.propTypes = {
  ingredient: ingredientType
};
export default Ingredient;
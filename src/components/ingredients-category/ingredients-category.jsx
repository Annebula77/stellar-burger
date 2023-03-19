import styles from './ingredients-category.module.css';
import Ingredient from '../ingredient/ingredient';
import { ingredientType } from '../../utils/prop-types';
import PropTypes from 'prop-types';


function IngredientsCategory({ title, ingredients }) {
  return (
    <>
      <h2 className='text_type_main-medium mt-10'>{title}</h2>
      <ul className={styles.ingredient__box}>
        {ingredients.map(ingredient => (
          <Ingredient key={ingredient._id} ingredient={ingredient} />
        ))}
      </ul>
    </>
  );
}

IngredientsCategory.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientType).isRequired
};

export default IngredientsCategory;
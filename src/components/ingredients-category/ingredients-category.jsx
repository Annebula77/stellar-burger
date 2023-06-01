import styles from './ingredients-category.module.css';
import Ingredient from '../ingredient/ingredient';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';


const IngredientsCategory = forwardRef((props, ref) => {
  const { title, data } = props;
  return (
    <div ref={ref}>
      <h2 className='text_type_main-medium mt-10'>{title}</h2>
      <ul className={styles.ingredient__box}>
        {data.map((ingredient) => {
          return (
            <Ingredient
              key={ingredient._id}
              ingredient={ingredient}
            />
          );
        })}
      </ul>
    </div>
  );
});


IngredientsCategory.propTypes = {
  title: PropTypes.string.isRequired,
};

export default IngredientsCategory;
import styles from './ingredients-category.module.css';
import Ingredient from '../ingredient/ingredient';
//import { ingredientType } from '../../utils/prop-types';
//import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import { useSelector } from 'react-redux';


const IngredientsCategory = forwardRef((props, ref) => {
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const { title, openModal, type } = props;
  //console.log("123", useSelector((state) => state.ingredients.ingredients));

  return (
    <div ref={ref}>
      <h2 className="text_type_main-medium mt-10">{title}</h2>
      <ul className={styles.ingredient__box}>
        {ingredients.map((ingredient) => {
          if (ingredient.type === type) {
            return (
              <Ingredient
                key={ingredient._id}
                ingredient={ingredient}
                onClick={() => openModal(ingredient)}
              />
            );
          } else {
            return null;
          }
        })}
        {/* {ingredients && ingredients.map((ingredient) => (
          <Ingredient
            key={ingredient._id}
            ingredient={ingredient}
            onClick={() => openModal(ingredient)}
          />
        ))} */}
      </ul>
    </div>
  );
});


//IngredientsCategory.propTypes = {
//  title: PropTypes.string.isRequired,
//  ingredients: PropTypes.arrayOf(ingredientType).isRequired
//};

export default IngredientsCategory;
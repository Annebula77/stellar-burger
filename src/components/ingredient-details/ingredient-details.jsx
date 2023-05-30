import styles from './ingredient-details.module.css'
import { useSelector } from 'react-redux';

function IngredientDetails({ ingredientId, extraClass }) {
  const ingredient = useSelector((state) => state.ingredients.ingredients.find(item => item._id === ingredientId));


  return (
    <div className={styles.container}>
      <h2 className={`'text text_type_main-large ml-10 mr-25' ${extraClass}`}>Детали ингредиента</h2>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <div className={styles.details__box}>
        <p className='text text_type_main-medium mt-4 mb-8'>{ingredient.name}</p>
        <div className={styles.components}>
          <div className={styles.nutrition}>
            <p className='text text_type_main-small text_color_inactive'>Калории, ккал</p>
            <p className='text text_type_digits-default text_color_inactive'>{ingredient.calories}</p>
          </div>
          <div className={styles.nutrition}>
            <p className='text text_type_main-small text_color_inactive'>Белки, г</p>
            <p className='text text_type_digits-default text_color_inactive'>{ingredient.proteins}</p>
          </div>
          <div className={styles.nutrition}>
            <p className='text text_type_main-small text_color_inactive'>Жиры, г</p>
            <p className='text text_type_digits-default text_color_inactive'>{ingredient.fat}</p>
          </div>
          <div className={styles.nutrition}>
            <p className='text text_type_main-small text_color_inactive'>Углеводы, г</p>
            <p className='text text_type_digits-default text_color_inactive'>{ingredient.carbohydrates}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IngredientDetails;
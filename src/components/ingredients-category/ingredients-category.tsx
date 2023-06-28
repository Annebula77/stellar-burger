import styles from './ingredients-category.module.css';
import Ingredient from '../ingredient/ingredient';
import { forwardRef } from 'react';
import { IIngredient } from '../../utils/essentials';

type IngredientsCategoryProps = {
  title: string,
  data: IIngredient[],
}

const IngredientsCategory = forwardRef<HTMLDivElement, IngredientsCategoryProps>((props, ref) => {
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



export default IngredientsCategory;
import styles from './burger-ingredients.module.css';
import Tabs from '../tabs/tabs';
import IngredientsCategory from '../ingredients-category/ingredients-category';
import { useContext } from "react";
import ingredientStorage from '../../utils/ingredient-storage';

function filterIngredientsByType(ingredients, type) {
  return ingredients.filter((ingredient) => ingredient.type === type);
}
function BurgerIngredients() {
  const ingredientStorageData = useContext(ingredientStorage);

  const buns = filterIngredientsByType(ingredientStorageData, 'bun');
  const mains = filterIngredientsByType(ingredientStorageData, 'main');
  const sauces = filterIngredientsByType(ingredientStorageData, 'sauce');


  return (
    <section className={styles.section}>
      <h1 className={`text text_type_main-large ${styles.title}`}>Собери бургер</h1>
      <Tabs />
      <section className={styles.container}>
        <IngredientsCategory title='Булки' ingredients={buns} />
        <IngredientsCategory title='Соусы' ingredients={sauces} />
        <IngredientsCategory title='Начинки' ingredients={mains} />
      </section>

    </section>
  );
}


export default BurgerIngredients;
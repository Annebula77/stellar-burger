import styles from './burger-ingredients.module.css';
import Tabs from '../tabs/tabs';
import IngredientsCategory from '../ingredients-category/ingredients-category';

function filterIngredientsByType(ingredients, type) {
  return ingredients.filter((ingredient) => ingredient.type === type);
}
function BurgerIngredients({ ingredientsData }) {
  const buns = filterIngredientsByType(ingredientsData, 'bun');
  const mains = filterIngredientsByType(ingredientsData, 'main');
  const sauces = filterIngredientsByType(ingredientsData, 'sauce');


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
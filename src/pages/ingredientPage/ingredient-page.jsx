
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import styles from './ingredient-page.module.css';

const IngredientPage = () => {

  return (
    <section className={styles.container}>
      <div className={styles.ingredient}>
        <IngredientDetails />
      </div>
    </section>
  )
}


export { IngredientPage };
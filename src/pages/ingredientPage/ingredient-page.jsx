
import { useParams } from 'react-router-dom';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import styles from './ingredient-page.module.css';

const IngredientPage = () => {
  const { id } = useParams();

  return (
    <section className={styles.container}>
      <div className={styles.ingredient}>
        <IngredientDetails ingredientId={id} />
      </div>
    </section>
  )
}

export { IngredientPage };
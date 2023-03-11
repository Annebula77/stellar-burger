import styles from './main.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constuctor';


function Main() {
  return (
    <section className={styles.section}>
      <BurgerIngredients />
      <BurgerConstructor />
    </section>
  )
}

export default Main;
import AppHeader from "../app-header/app-header";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constuctor';
import styles from './app.module.css'

function App() {
  return (
    <section className={styles.app}>
      <AppHeader />
      <section className={styles.main}>
        <BurgerIngredients />
        <BurgerConstructor />
      </section>
    </section>
  );
}

export default App;
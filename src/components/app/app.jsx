import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constuctor';
import styles from './app.module.css';

function App() {
  return (
    <section className={styles.app}>
      <AppHeader />
      <Main>
        <BurgerIngredients />
        <BurgerConstructor />
      </Main>
    </section>
  );
}

export default App;
import AppHeader from "../app-header/app-header";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constuctor';
import styles from './app.module.css';
import Main from "../main/main";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchIngredients } from "../../services/actions/ingredients-actions";

function App() {
  const dispatch = useDispatch();
  const { ingredients, loadingIngredients, errorIngredients } = useSelector(state => state.ingredients);

  useEffect(() => {
    dispatch(fetchIngredients());

  }, [dispatch]);



  if (loadingIngredients) {
    return <p>Загрузка...</p>;
  }

  if (errorIngredients) {
    return <p>Произошла ошибка</p>;
  }

  return (
    <>
      <section className={styles.app}>
        <AppHeader />
        <Main>
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor />
        </Main>
      </section>
    </>
  )
}

export default App;
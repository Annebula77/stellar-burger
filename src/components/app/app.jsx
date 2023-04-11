import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constuctor";
import styles from "./app.module.css";
import Main from "../main/main";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchIngredients } from "../../services/actions/ingredients-actions";

function App() {
  const dispatch = useDispatch();
  const { ingredients, loadingIngredients, errorIngredients, dataRequest } =
    useSelector((state) => state.ingredients);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);


  return (
    <>
      <section className={styles.app}>
        <AppHeader />
        <Main>
          {loadingIngredients && <p>Загрузка...</p>}
          {errorIngredients && <p>Произошла ошибка</p>}
          {dataRequest && (
            <>
              <BurgerIngredients />
              <BurgerConstructor />
            </>
          )}
        </Main>
      </section>
    </>
  );
}

export default App;

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constuctor";
import styles from "./app.module.css";
import Main from "../main/main";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchIngredients } from "../../services/actions/ingredients-actions";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

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
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          )}
        </Main>
      </section>
    </>
  );
}

export default App;

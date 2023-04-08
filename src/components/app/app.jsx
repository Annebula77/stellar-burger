import AppHeader from "../app-header/app-header";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constuctor';
import styles from './app.module.css';
import Main from "../main/main";
import { useEffect, useState } from 'react';
import { getIngredientsData } from '../../utils/api';
import IngredientStorage from "../../utils/ingredient-storage";


function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [ingredientsData, setIngredientsData] = useState([]);

  useEffect(() => {
    const fetchIngredientsData = async () => {
      setIsLoading(true);
      try {
        const data = await getIngredientsData();
        setIngredientsData(data);
        setHasError(false);
      } catch (e) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIngredientsData();
  }, []);


  return (
    <>
      {isLoading && 'Загрузка...'}
      {hasError && 'Произошла ошибка'}
      {!isLoading && !hasError && ingredientsData.length && (
        <IngredientStorage.Provider value={ingredientsData}>
          <section className={styles.app} т>
            <AppHeader />
            <Main>
              <BurgerIngredients />
              <BurgerConstructor />
            </Main>
          </section>
        </IngredientStorage.Provider>
      )}
    </>

  );


}


export default App;
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constuctor';
import styles from './app.module.css';
import React, { useEffect, useState } from 'react';

const serverUrl = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [ingredientsData, setIngredientsData] = useState([]);

  useEffect(() => {
    const getIngredientsData = async () => {
      setHasError(false);
      setIsLoading(true);
      try {
        const res = await fetch(serverUrl);
        const data = await res.json();
        setIngredientsData(data);
      } catch (e) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getIngredientsData();
  }, []);


  return (
    <>
      {isLoading && 'Загрузка...'}
      {hasError && 'Произошла ошибка'}
      {!isLoading && !hasError && ingredientsData.length && (
        <section className={styles.app}>
          <AppHeader />
          <Main>
            <BurgerIngredients ingredientsData={ingredientsData} />
            <BurgerConstructor ingredientsData={ingredientsData} />
          </Main>
        </section>
      )}
    </>
  );
}


export default App;